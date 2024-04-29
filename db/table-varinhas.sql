CREATE DATABASE harrypotter1;


CREATE TABLE varinhas (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento_varinha DECIMAL NOT NULL,
    nucleo_varinha VARCHAR(100) NOT NULL,
    data_fabricacao DATE NOT NULL
);