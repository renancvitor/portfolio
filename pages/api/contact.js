// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Adiciona cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*');  // Permite todos os domínios, mas você pode restringir para seu domínio
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Configuração do Nodemailer para envio de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'renan.vitor.cm@gmail.com',
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
      console.error('Erro ao enviar o e-mail:', error);
      return res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
