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
        const { nome, idade_bruxos, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
        await pool.query(
            "UPDATE bruxos SET nome = $1, idade_bruxos = $2, casa_hogwarts = $3, habilidade_especial = $4, status_sangue = $5, patrono = $6 WHERE id = $7",
            [nome, idade_bruxos, casa_hogwarts, habilidade_especial, status_sangue, patrono, id]
        );
        res.status(200).send({ mensagem: "Bruxo atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar bruxo:", error);
        res.status(500).send("Erro ao atualizar bruxo");
    }
});

app.delete("/bruxos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM bruxos WHERE id = $1", [id]);
        res.status(200).send({ mensagem: "Bruxo excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir bruxo:", error);
        res.status(500).send("Erro ao excluir bruxo");
    }
});

app.get("/varinhas/nucleo_varinha/:nucleo", async (req, res) => {
    const { nucleo_varinha } = req.params;
    try {
        const result = await pool.query("SELECT * FROM varinhas WHERE nucleo_varinha = $1", [nucleo_varinha]);
        res.json({
            total: result.rowCount,
            varinhas: result.rows,
        });
    } catch (error) {
        console.error("Erro ao obter varinhas por tipo de núcleo:", error);
        res.status(500).json("Erro ao obter varinhas por tipo de núcleo");
    }
});


app.get("/bruxos/nome/:nome", async (req, res) => {
    try {
        const { nome } = req.params;
        const result = await pool.query("SELECT * FROM bruxos WHERE nome = $1", [
            nome,
        ]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: "Bruxo não encontrado" });
        } else {
            res.json(result.rows);
        }
    } catch (error) {
        console.error("Erro ao obter bruxo por nome:", error);
        res.status(500).send("Erro ao obter bruxo por nome");
    }
});

app.post("/bruxos", async (req, res) => {
    const { nome, idade_bruxos, casa_hogwarts, habilidade_especial, status_sangue, patrono } = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO bruxos (nome, idade_bruxos, casa_hogwarts, habilidade_especial, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nome, idade_bruxos, casa_hogwarts, habilidade_especial, status_sangue, patrono]
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


app.post("/varinhas", async (req, res) => {
    const { material, comprimento_varinha, nucleo_varinha, data_fabricacao } = req.body;
    try {
        const { rows } = await pool.query(
            "INSERT INTO varinhas (material, comprimento_varinha, nucleo_varinha, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *",
            [material, comprimento_varinha, nucleo_varinha, data_fabricacao]
        );
        res.json({
            message: "Sua foi Varinha cadastrada com sucesso",
            varinha: rows[0],
        });
    } catch (error) {
        console.error("Erro ao cadastrar varinha:", error);
        res.status(500).json({ error: "Erro ao cadastrar varinha" });
    }
});

app.get("/varinhas", async (req, res) => {
    const result = await pool.query("SELECT * FROM varinhas")
        .catch(error => {
            console.error("Erro ao obter suas varinhas:", error);
            res.status(500).json("Erro ao obter  varinhas");
        });
    res.json({
        total: result.rowCount,
        varinhas: result.rows,
    });
});

app.get("/bruxos/sangue/:status_sangue", async (req, res) => {
    const { status_sangue } = req.params;
    try {
        const result = await pool.query("SELECT * FROM bruxos WHERE status_sangue = $1", [status_sangue]);
        res.json({
            total: result.rowCount,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error("Erro ao obter bruxos por status sanguíneo:", error);
        res.status(500).json("Erro ao obter bruxos por status sanguíneo");
    }
});

app.put("/varinhas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento_varinha, nucleo_varinha, data_fabricacao } = req.body;
        await pool.query(
            "UPDATE varinhas SET material = $1, comprimento_varinha = $2, nucleo_varinha = $3, data_fabricacao = $4 WHERE id = $5",
            [material, comprimento_varinha, nucleo_varinha, data_fabricacao, id]
        );
        res.status(200).send({ mensagem: "Sua foi Varinha atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar sua varinha:", error);
        res.status(500).send("Erro ao atualizar sua varinha");
    }
});

app.delete("/varinhas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM varinhas WHERE id = $1", [id]);
        res.status(200).send({ mensagem: "Varinha excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir varinha:", error);
        res.status(500).send("Erro ao excluir varinha");
    }
});

const frasesHarryPotter = [
    "As coisas que perdemos têm um jeito de voltar para nós no final, se não forem perdidas para sempre.",
    "É as nossas escolhas que revelam o que realmente somos, muito mais do que as nossas habilidades.",
    "Palavras estão, na minha não tão humilde opinião, nossa mais inexaurível fonte de magia. Elas são capazes tanto de infligir feridas quanto de curá-las.",
    "A felicidade pode ser encontrada mesmo nas horas mais sombrias, se a pessoa se lembrar de acender a luz.",
    "Não vale a pena viver sonhando e se esquecer de viver.",
    "Para uma mente bem estruturada, a morte é apenas a próxima grande aventura.",
    "O que temos de decidir é o que fazer com o tempo que nos é dado.",
    "Não tenha pena dos mortos, tenha pena dos vivos e acima de tudo daqueles que vivem sem amor.",
    "A felicidade pode ser encontrada mesmo nas horas mais negras, se a pessoa se lembrar de acender a luz.",
    "Encontrar o que nos faz felizes, significa que podemos mudar nossas vidas."
];

app.get("/", async (req, res) => {
    const fraseAleatoria = frasesHarryPotter[Math.floor(Math.random() * frasesHarryPotter.length)];
    res.status(200).send({ mensagem: fraseAleatoria });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🧙🏿‍♂️🎇`);
});
