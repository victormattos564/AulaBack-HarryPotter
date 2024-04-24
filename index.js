const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "harrypotter1",
    password: "ds564",
    port: 7007,
});

app.post("/bruxos", async (req, res) => {
    const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO bruxos (nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono]
        );
        res.json({
            message: "Bruxo cadastrado com sucesso",
            bruxo: rows[0],
        });
    } catch (error) {
        console.error("Erro ao cadastrar bruxo:", error);
        res.status(500).json({ error: "Erro ao cadastrar bruxo" });
    }
});

app.get("/bruxos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM bruxos");
        res.json({
            total: result.rowCount,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error("Erro ao obter bruxos:", error);
        res.status(500).send("Erro ao obter bruxos");
    }
});

app.put("/bruxos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
        await pool.query(
            "UPDATE bruxos SET nome = $1, idade = $2, casa_hogwarts = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7",
            [nome, idade, casa_hogwarts, habilidade_especial, status_sangue, patrono, id]
        );
        res.status(200).send({ mensagem: "Bruxo atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar bruxo:", error);
        res.status(500).send("Erro ao atualizar bruxo");
    }
});

