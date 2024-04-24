CREATE DATABASE harrypotter1;

CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    casa_hogwarts VARCHAR(50),
    habilidade_especial VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(50) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento DECIMAL NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);