import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON e configurar CORS
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://renancvitor.github.io', // Permitir apenas o seu site
    methods: ['POST'], // Permitir apenas POST
    allowedHeaders: ['Content-Type']
}));

// Rota para envio de e-mail
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Configurar transporte Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Configurar o e-mail
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'renan.vitor.cm@gmail.com',
        subject: 'Novo formulário de contato',
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
    }
});

// Iniciar o servidor (para desenvolvimento local)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

// Exportar app para uso na Vercel
export default app;
