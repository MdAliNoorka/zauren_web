alter table "public"."carts" drop constraint "carts_status_check";

alter table "public"."integrations" drop constraint "integrations_status_check";

alter table "public"."inventory_sources" drop constraint "inventory_sources_source_type_check";

alter table "public"."inventory_sources" drop constraint "inventory_sources_status_check";

alter table "public"."orders" drop constraint "orders_status_check";

alter table "public"."payment_transactions" drop constraint "payment_transactions_status_check";

alter table "public"."subscriptions" drop constraint "subscriptions_status_check";

alter table "public"."users" drop constraint "users_role_check";

alter table "public"."carts" add constraint "carts_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'checked_out'::character varying, 'abandoned'::character varying])::text[]))) not valid;

alter table "public"."carts" validate constraint "carts_status_check";

alter table "public"."integrations" add constraint "integrations_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[]))) not valid;

alter table "public"."integrations" validate constraint "integrations_status_check";

alter table "public"."inventory_sources" add constraint "inventory_sources_source_type_check" CHECK (((source_type)::text = ANY ((ARRAY['local'::character varying, 'external'::character varying])::text[]))) not valid;

alter table "public"."inventory_sources" validate constraint "inventory_sources_source_type_check";

alter table "public"."inventory_sources" add constraint "inventory_sources_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying])::text[]))) not valid;

alter table "public"."inventory_sources" validate constraint "inventory_sources_status_check";

alter table "public"."orders" add constraint "orders_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'paid'::character varying, 'shipped'::character varying, 'delivered'::character varying, 'cancelled'::character varying])::text[]))) not valid;

alter table "public"."orders" validate constraint "orders_status_check";

alter table "public"."payment_transactions" add constraint "payment_transactions_status_check" CHECK (((status)::text = ANY ((ARRAY['success'::character varying, 'failed'::character varying, 'pending'::character varying])::text[]))) not valid;

alter table "public"."payment_transactions" validate constraint "payment_transactions_status_check";

alter table "public"."subscriptions" add constraint "subscriptions_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'trial'::character varying, 'past_due'::character varying, 'cancelled'::character varying])::text[]))) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_status_check";

alter table "public"."users" add constraint "users_role_check" CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::text[]))) not valid;

alter table "public"."users" validate constraint "users_role_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.auto_cancel_after_grace()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.grace_end_date IS NOT NULL
       AND NEW.grace_end_date < CURRENT_DATE
       AND NEW.status = 'past_due' THEN
        NEW.status := 'cancelled';
        NEW.cancelled_at := NOW();
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.mark_sub_past_due_if_limit()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_negative_stock()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.stock_quantity < 0 THEN
        RAISE EXCEPTION 'Stock cannot go below zero for product %', NEW.id;
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_token_overuse()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.reduce_stock_on_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.restore_stock_on_cancel()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.set_status_after_trial()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.trial_end_date IS NOT NULL 
       AND NEW.trial_end_date < CURRENT_DATE 
       AND NEW.status = 'trial' THEN
        NEW.status := 'past_due';
    END IF;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_order_total()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.update_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;


