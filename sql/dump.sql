drop database dindin;
create database dindin;

create table
    usuarios (
        id serial primary key,
        nome text not null,
        email text unique not null,
        senha text not null
    );

create table
    categorias (
        id serial primary key,
        descricao text not null
    );

create table
    transacoes (
        id serial primary key,
        descricao text,
        valor integer,
        data timestamp with time zone,
        categoria_id integer references categorias(id),
        usuario_id integer references usuarios(id),
        tipo text
    );
