import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir qualquer origem
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Validação básica
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Configuração do transporte de e-mail com Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Seu e-mail
                pass: process.env.EMAIL_PASS, // Senha de aplicativo
            },
        });

        // Configuração do e-mail
        const mailOptions = {
            from: process.env.EMAIL_USER, // E-mail do remetente
            to: 'renan.vitor.cm@gmail.com', // E-mail para o qual a mensagem será enviada
            subject: 'Novo formulário de contato',
            text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
        };

        try {
            // Enviar o e-mail
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
        }
    } else {
        return res.status(405).json({ error: 'Método não permitido' });
    }
}
