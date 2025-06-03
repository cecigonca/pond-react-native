const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { generateOTP } = require('./utils/otpUtils');

const app = express();
const port = process.env.PORT || 3001;
const isDevelopment = false;

app.use(cors());
app.use(express.json());

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: 'MS_4ZRMLM@test-q3enl6k8qr042vwr.mlsender.net',
    pass: 'mssp.FazNAwr.pr9084zxjqjlw63d.bd9y6TS'
  },
  tls: {
    rejectUnauthorized: true
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

app.post('/api/reset-password/request', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = generateOTP();
    otpStore.set(email, { code: otp, timestamp: Date.now(), attempts: 0 });

    if (isDevelopment) {
      return res.json({ message: 'Código gerado (dev)', otp });
    }

    await transporter.sendMail({
      from: {
        name: 'My Dev App',
        address: 'MS_4ZRMLM@test-q3enl6k8qr042vwr.mlsender.net'
      },
      to: email,
      subject: 'Password Reset Code',
      html: `<p>Seu código de verificação é: <b>${otp}</b></p>`
    });

    res.json({ message: 'Código enviado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar código' });
  }
});

app.post('/api/reset-password/verify', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const stored = otpStore.get(email);

    if (!email || !code || !newPassword)
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

    if (!stored) return res.status(400).json({ error: 'Código inválido' });

    if (Date.now() - stored.timestamp > 10 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'Código expirado' });
    }

    if (stored.attempts >= 3) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'Muitas tentativas inválidas' });
    }

    if (stored.code !== code) {
      stored.attempts++;
      return res.status(400).json({ error: 'Código incorreto' });
    }

    otpStore.delete(email);
    res.json({ message: 'Senha redefinida com sucesso (simulado)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao redefinir senha' });
  }
});

app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${port}`);
});