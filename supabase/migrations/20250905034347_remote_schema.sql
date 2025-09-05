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


