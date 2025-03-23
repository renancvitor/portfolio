const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Para variáveis de ambiente (iremos configurar depois)

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para permitir requisições de outras origens (CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Rota para receber os dados do formulário
app.post("/send", async (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        // Configuração do transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Definiremos depois no .env
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configuração da mensagem de e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "renan.vitor.cm@gmail.com", // Substitua pelo seu e-mail
            subject: "Novo contato do portfólio",
            text: `Nome: ${firstName} ${lastName}\nE-mail: ${email}\n\nMensagem:\n${message}`,
        };

        // Enviar o e-mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Erro ao enviar a mensagem." });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
