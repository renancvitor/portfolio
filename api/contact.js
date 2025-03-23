// api/contact.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validação básica
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Configuração do transporte de e-mail com Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Pode ser outro serviço, como 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail
        pass: process.env.EMAIL_PASS, // Senha do e-mail ou uma App Password
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER, // E-mail do remetente
      to: process.env.EMAIL_USER, // E-mail para o qual a mensagem será enviada
      subject: 'Novo formulário de contato',
      text: `
        Nome: ${name}
        E-mail: ${email}
        Mensagem: ${message}
      `,
    };

    try {
      // Enviar o e-mail
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
