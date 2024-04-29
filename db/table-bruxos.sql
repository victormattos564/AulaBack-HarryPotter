CREATE TABLE bruxos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade_bruxos INTEGER NOT NULL,
    casa_hogwarts VARCHAR(50),
    habilidade_especial VARCHAR(100) NOT NULL,
    status_sangue VARCHAR(50) NOT NULL,
    patrono VARCHAR(100)
);