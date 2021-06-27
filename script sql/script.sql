DROP DATABASE "apiux-prueba";
CREATE DATABASE "apiux-prueba" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';

CREATE TABLE public.tareas (
    id integer NOT NULL,
    identificador bigint,
    descripcion text,
    vigente boolean,
    created_at timestamp without time zone
);

ALTER TABLE public.tareas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tareas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);