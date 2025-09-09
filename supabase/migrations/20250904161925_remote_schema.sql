

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."auto_cancel_after_grace"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.grace_end_date IS NOT NULL
       AND NEW.grace_end_date < CURRENT_DATE
       AND NEW.status = 'past_due' THEN
        NEW.status := 'cancelled';
        NEW.cancelled_at := NOW();
    END IF;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."auto_cancel_after_grace"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."mark_sub_past_due_if_limit"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    plan_limit INT;
    used_tokens INT;
BEGIN
    SELECT p.token_limit INTO plan_limit
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    WHERE s.user_id = NEW.user_id
      AND s.status = 'active'
    LIMIT 1;

    SELECT COALESCE(SUM(tokens_used),0) INTO used_tokens
    FROM token_usage
    WHERE user_id = NEW.user_id
      AND date_trunc('month', used_at) = date_trunc('month', NOW());

    IF plan_limit IS NOT NULL AND (used_tokens + NEW.tokens_used) > plan_limit THEN
        UPDATE subscriptions
        SET status = 'past_due'
        WHERE user_id = NEW.user_id
          AND status = 'active';
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."mark_sub_past_due_if_limit"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."prevent_negative_stock"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.stock_quantity < 0 THEN
        RAISE EXCEPTION 'Stock cannot go below zero for product %', NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."prevent_negative_stock"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."prevent_token_overuse"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    plan_limit INT;
    used_tokens INT;
BEGIN
    -- Get user’s current plan limit
    SELECT p.token_limit INTO plan_limit
    FROM subscriptions s
    JOIN plans p ON s.plan_id = p.id
    WHERE s.user_id = NEW.user_id
      AND s.status = 'active'
    LIMIT 1;

    -- Calculate total tokens used this month
    SELECT COALESCE(SUM(tokens_used),0) INTO used_tokens
    FROM token_usage
    WHERE user_id = NEW.user_id
      AND date_trunc('month', used_at) = date_trunc('month', NOW());

    -- If usage exceeds plan → block insert
    IF plan_limit IS NOT NULL AND (used_tokens + NEW.tokens_used) > plan_limit THEN
        RAISE EXCEPTION 'Token limit exceeded for user %', NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."prevent_token_overuse"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."reduce_stock_on_order"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."reduce_stock_on_order"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."restore_stock_on_cancel"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.status = 'cancelled' AND OLD.status <> 'cancelled' THEN
        UPDATE products
        SET stock_quantity = stock_quantity + oi.quantity
        FROM order_items oi
        WHERE oi.order_id = NEW.id
          AND oi.product_id = products.id;
    END IF;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."restore_stock_on_cancel"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."set_status_after_trial"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF NEW.trial_end_date IS NOT NULL 
       AND NEW.trial_end_date < CURRENT_DATE 
       AND NEW.status = 'trial' THEN
        NEW.status := 'past_due';
    END IF;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."set_status_after_trial"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_order_total"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * price),0)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE id = NEW.order_id;
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_order_total"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_timestamp"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_timestamp"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."cart_items" (
    "id" bigint NOT NULL,
    "cart_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    "quantity" integer DEFAULT 1 NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "added_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."cart_items" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."cart_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."cart_items_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."cart_items_id_seq" OWNED BY "public"."cart_items"."id";

CREATE TABLE IF NOT EXISTS "public"."carts" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "status" character varying(20) DEFAULT 'active'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "carts_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['active'::character varying, 'checked_out'::character varying, 'abandoned'::character varying])::"text"[])))
);

ALTER TABLE "public"."carts" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."carts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."carts_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."carts_id_seq" OWNED BY "public"."carts"."id";

CREATE TABLE IF NOT EXISTS "public"."integrations" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "platform" character varying(100),
    "access_token" "text",
    "status" character varying(20) DEFAULT 'active'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "integrations_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::"text"[])))
);

ALTER TABLE "public"."integrations" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."integrations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."integrations_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."integrations_id_seq" OWNED BY "public"."integrations"."id";

CREATE TABLE IF NOT EXISTS "public"."inventory_sources" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "source_type" character varying(20) NOT NULL,
    "source_name" character varying(150),
    "connection_url" "text",
    "api_key" "text",
    "status" character varying(20) DEFAULT 'active'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "inventory_sources_source_type_check" CHECK ((("source_type")::"text" = ANY ((ARRAY['local'::character varying, 'external'::character varying])::"text"[]))),
    CONSTRAINT "inventory_sources_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::"text"[])))
);

ALTER TABLE "public"."inventory_sources" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."inventory_sources_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."inventory_sources_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."inventory_sources_id_seq" OWNED BY "public"."inventory_sources"."id";

CREATE TABLE IF NOT EXISTS "public"."metrics" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "integration_id" bigint NOT NULL,
    "metric_name" character varying(100),
    "metric_value" bigint,
    "period_start" "date",
    "period_end" "date",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."metrics" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."metrics_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."metrics_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."metrics_id_seq" OWNED BY "public"."metrics"."id";

CREATE TABLE IF NOT EXISTS "public"."order_items" (
    "id" bigint NOT NULL,
    "order_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    "quantity" integer NOT NULL,
    "price" numeric(10,2) NOT NULL
);

ALTER TABLE "public"."order_items" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."order_items_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."order_items_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."order_items_id_seq" OWNED BY "public"."order_items"."id";

CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" bigint NOT NULL,
    "cart_id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "total_amount" numeric(10,2),
    "status" character varying(20) DEFAULT 'pending'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "orders_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['pending'::character varying, 'paid'::character varying, 'shipped'::character varying, 'delivered'::character varying, 'cancelled'::character varying])::"text"[])))
);

ALTER TABLE "public"."orders" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."orders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."orders_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."orders_id_seq" OWNED BY "public"."orders"."id";

CREATE TABLE IF NOT EXISTS "public"."payment_transactions" (
    "id" bigint NOT NULL,
    "subscription_id" bigint NOT NULL,
    "amount" numeric(10,2),
    "status" character varying(20) NOT NULL,
    "transaction_date" timestamp with time zone DEFAULT "now"(),
    "failure_reason" "text",
    CONSTRAINT "payment_transactions_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['success'::character varying, 'failed'::character varying, 'pending'::character varying])::"text"[])))
);

ALTER TABLE "public"."payment_transactions" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."payment_transactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."payment_transactions_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."payment_transactions_id_seq" OWNED BY "public"."payment_transactions"."id";

CREATE TABLE IF NOT EXISTS "public"."plans" (
    "id" bigint NOT NULL,
    "name" character varying(100) NOT NULL,
    "description" "text",
    "price_monthly" numeric(10,2),
    "token_limit" integer,
    "integration_limit" integer,
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."plans" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."plans_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."plans_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."plans_id_seq" OWNED BY "public"."plans"."id";

CREATE TABLE IF NOT EXISTS "public"."products" (
    "id" bigint NOT NULL,
    "inventory_source_id" bigint NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" "text",
    "price" numeric(10,2),
    "sku" character varying(100),
    "stock_quantity" integer DEFAULT 0,
    "category" character varying(100),
    "image_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."products" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."products_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."products_id_seq" OWNED BY "public"."products"."id";

CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "plan_id" bigint NOT NULL,
    "start_date" "date" NOT NULL,
    "trial_end_date" "date",
    "next_billing_date" "date" NOT NULL,
    "status" character varying(20) DEFAULT 'trial'::character varying,
    "grace_end_date" "date",
    "cancelled_at" "date",
    CONSTRAINT "subscriptions_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['active'::character varying, 'trial'::character varying, 'past_due'::character varying, 'cancelled'::character varying])::"text"[])))
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."subscriptions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."subscriptions_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."subscriptions_id_seq" OWNED BY "public"."subscriptions"."id";

CREATE TABLE IF NOT EXISTS "public"."token_usage" (
    "id" bigint NOT NULL,
    "user_id" bigint NOT NULL,
    "integration_id" bigint,
    "tokens_used" integer NOT NULL,
    "used_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."token_usage" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."token_usage_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."token_usage_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."token_usage_id_seq" OWNED BY "public"."token_usage"."id";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" bigint NOT NULL,
    "name" character varying(150),
    "email" character varying(150) NOT NULL,
    "password_hash" character varying(255) NOT NULL,
    "company_name" character varying(150),
    "role" character varying(20) DEFAULT 'user'::character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "users_role_check" CHECK ((("role")::"text" = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::"text"[])))
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "public"."users_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";

ALTER TABLE ONLY "public"."cart_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."cart_items_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."carts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."carts_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."integrations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."integrations_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."inventory_sources" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."inventory_sources_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."metrics" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."metrics_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."order_items" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."order_items_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."orders" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."orders_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."payment_transactions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."payment_transactions_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."plans" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."plans_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."products" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."products_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."subscriptions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."subscriptions_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."token_usage" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."token_usage_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."integrations"
    ADD CONSTRAINT "integrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."inventory_sources"
    ADD CONSTRAINT "inventory_sources_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."metrics"
    ADD CONSTRAINT "metrics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."payment_transactions"
    ADD CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."plans"
    ADD CONSTRAINT "plans_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_sku_key" UNIQUE ("sku");

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."token_usage"
    ADD CONSTRAINT "token_usage_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "trg_auto_cancel_after_grace" BEFORE UPDATE ON "public"."subscriptions" FOR EACH ROW EXECUTE FUNCTION "public"."auto_cancel_after_grace"();

CREATE OR REPLACE TRIGGER "trg_mark_sub_past_due_if_limit" AFTER INSERT ON "public"."token_usage" FOR EACH ROW EXECUTE FUNCTION "public"."mark_sub_past_due_if_limit"();

CREATE OR REPLACE TRIGGER "trg_prevent_negative_stock" BEFORE UPDATE ON "public"."products" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_negative_stock"();

CREATE OR REPLACE TRIGGER "trg_prevent_token_overuse" BEFORE INSERT ON "public"."token_usage" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_token_overuse"();

CREATE OR REPLACE TRIGGER "trg_reduce_stock_on_order" AFTER INSERT ON "public"."order_items" FOR EACH ROW EXECUTE FUNCTION "public"."reduce_stock_on_order"();

CREATE OR REPLACE TRIGGER "trg_restore_stock_on_cancel" AFTER UPDATE ON "public"."orders" FOR EACH ROW EXECUTE FUNCTION "public"."restore_stock_on_cancel"();

CREATE OR REPLACE TRIGGER "trg_set_status_after_trial" BEFORE UPDATE ON "public"."subscriptions" FOR EACH ROW EXECUTE FUNCTION "public"."set_status_after_trial"();

CREATE OR REPLACE TRIGGER "trg_update_order_total_delete" AFTER DELETE ON "public"."order_items" FOR EACH ROW EXECUTE FUNCTION "public"."update_order_total"();

CREATE OR REPLACE TRIGGER "trg_update_order_total_insert" AFTER INSERT ON "public"."order_items" FOR EACH ROW EXECUTE FUNCTION "public"."update_order_total"();

CREATE OR REPLACE TRIGGER "trg_update_order_total_update" AFTER UPDATE ON "public"."order_items" FOR EACH ROW EXECUTE FUNCTION "public"."update_order_total"();

CREATE OR REPLACE TRIGGER "trg_update_products_timestamp" BEFORE UPDATE ON "public"."products" FOR EACH ROW EXECUTE FUNCTION "public"."update_timestamp"();

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."cart_items"
    ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."carts"
    ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."integrations"
    ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."inventory_sources"
    ADD CONSTRAINT "inventory_sources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."metrics"
    ADD CONSTRAINT "metrics_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."metrics"
    ADD CONSTRAINT "metrics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."order_items"
    ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payment_transactions"
    ADD CONSTRAINT "payment_transactions_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."products"
    ADD CONSTRAINT "products_inventory_source_id_fkey" FOREIGN KEY ("inventory_source_id") REFERENCES "public"."inventory_sources"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."token_usage"
    ADD CONSTRAINT "token_usage_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "public"."integrations"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."token_usage"
    ADD CONSTRAINT "token_usage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."auto_cancel_after_grace"() TO "anon";
GRANT ALL ON FUNCTION "public"."auto_cancel_after_grace"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."auto_cancel_after_grace"() TO "service_role";

GRANT ALL ON FUNCTION "public"."mark_sub_past_due_if_limit"() TO "anon";
GRANT ALL ON FUNCTION "public"."mark_sub_past_due_if_limit"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."mark_sub_past_due_if_limit"() TO "service_role";

GRANT ALL ON FUNCTION "public"."prevent_negative_stock"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_negative_stock"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_negative_stock"() TO "service_role";

GRANT ALL ON FUNCTION "public"."prevent_token_overuse"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_token_overuse"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_token_overuse"() TO "service_role";

GRANT ALL ON FUNCTION "public"."reduce_stock_on_order"() TO "anon";
GRANT ALL ON FUNCTION "public"."reduce_stock_on_order"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."reduce_stock_on_order"() TO "service_role";

GRANT ALL ON FUNCTION "public"."restore_stock_on_cancel"() TO "anon";
GRANT ALL ON FUNCTION "public"."restore_stock_on_cancel"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restore_stock_on_cancel"() TO "service_role";

GRANT ALL ON FUNCTION "public"."set_status_after_trial"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_status_after_trial"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_status_after_trial"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_order_total"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_order_total"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_order_total"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_timestamp"() TO "service_role";

GRANT ALL ON TABLE "public"."cart_items" TO "anon";
GRANT ALL ON TABLE "public"."cart_items" TO "authenticated";
GRANT ALL ON TABLE "public"."cart_items" TO "service_role";

GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."cart_items_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."carts" TO "anon";
GRANT ALL ON TABLE "public"."carts" TO "authenticated";
GRANT ALL ON TABLE "public"."carts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."carts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."integrations" TO "anon";
GRANT ALL ON TABLE "public"."integrations" TO "authenticated";
GRANT ALL ON TABLE "public"."integrations" TO "service_role";

GRANT ALL ON SEQUENCE "public"."integrations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."integrations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."integrations_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."inventory_sources" TO "anon";
GRANT ALL ON TABLE "public"."inventory_sources" TO "authenticated";
GRANT ALL ON TABLE "public"."inventory_sources" TO "service_role";

GRANT ALL ON SEQUENCE "public"."inventory_sources_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."inventory_sources_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."inventory_sources_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."metrics" TO "anon";
GRANT ALL ON TABLE "public"."metrics" TO "authenticated";
GRANT ALL ON TABLE "public"."metrics" TO "service_role";

GRANT ALL ON SEQUENCE "public"."metrics_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."metrics_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."metrics_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."order_items" TO "anon";
GRANT ALL ON TABLE "public"."order_items" TO "authenticated";
GRANT ALL ON TABLE "public"."order_items" TO "service_role";

GRANT ALL ON SEQUENCE "public"."order_items_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."order_items_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."order_items_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."payment_transactions" TO "anon";
GRANT ALL ON TABLE "public"."payment_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."payment_transactions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."payment_transactions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payment_transactions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payment_transactions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."plans" TO "anon";
GRANT ALL ON TABLE "public"."plans" TO "authenticated";
GRANT ALL ON TABLE "public"."plans" TO "service_role";

GRANT ALL ON SEQUENCE "public"."plans_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."plans_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."plans_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."products" TO "anon";
GRANT ALL ON TABLE "public"."products" TO "authenticated";
GRANT ALL ON TABLE "public"."products" TO "service_role";

GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."products_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";

GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."token_usage" TO "anon";
GRANT ALL ON TABLE "public"."token_usage" TO "authenticated";
GRANT ALL ON TABLE "public"."token_usage" TO "service_role";

GRANT ALL ON SEQUENCE "public"."token_usage_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."token_usage_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."token_usage_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";

RESET ALL;
