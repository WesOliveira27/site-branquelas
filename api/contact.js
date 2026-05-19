import nodemailer from 'nodemailer';
import validator from 'validator';

function validateContactForm(data) {
  const errors = {};

  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Nome é obrigatório';
  } else if (data.name.length < 3 || data.name.length > 100) {
    errors.name = 'Nome deve ter entre 3 e 100 caracteres';
  } else if (!validator.isAlpha(data.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/g, ''))) {
    errors.name = 'Nome contém caracteres inválidos';
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  const validEventTypes = ['aniversario', 'casamento', 'confraternizacao', 'corporativo', 'outro'];
  if (!data.eventType || !validEventTypes.includes(data.eventType)) {
    errors.eventType = 'Tipo de evento inválido';
  }

  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Mensagem é obrigatória';
  } else if (data.message.length < 10 || data.message.length > 1000) {
    errors.message = 'Mensagem deve ter entre 10 e 1000 caracteres';
  }

  if (data.phone) {
    const phoneRegex = /^[0-9\s\-\(\)\+]*$/;
    if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Telefone inválido';
    } else if (data.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone deve ter no mínimo 10 dígitos';
    }
  }

  if (data.eventDate) {
    const date = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(date.getTime())) {
      errors.eventDate = 'Data inválida';
    } else if (date < today) {
      errors.eventDate = 'Data deve ser no futuro';
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
}

function generateEmailTemplate(data) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #DC143C;">Novo Contato - As Branquelas</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px; font-weight: bold;">Nome:</td><td style="padding: 10px;">${data.name}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;">${data.email}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Telefone:</td><td style="padding: 10px;">${data.phone || 'Não informado'}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Tipo de Evento:</td><td style="padding: 10px;">${data.eventType}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Data do Evento:</td><td style="padding: 10px;">${data.eventDate || 'Não informada'}</td></tr>
        </table>
        <h3 style="margin-top: 20px;">Mensagem:</h3>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
      </body>
    </html>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const { name, email, phone, eventType, eventDate, message } = req.body || {};

    const validationErrors = validateContactForm({ name, email, phone, eventType, eventDate, message });
    if (validationErrors) {
      return res.status(400).json({ success: false, message: 'Dados de formulário inválidos', errors: validationErrors });
    }

    const sanitizedData = {
      name: validator.escape(name),
      email: validator.normalizeEmail(email),
      phone: phone ? validator.escape(phone) : '',
      eventType: validator.escape(eventType),
      eventDate: eventDate ? validator.escape(eventDate) : '',
      message: validator.escape(message),
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@branquelas.com',
      to: process.env.CONTACT_EMAIL || 'contato@branquelas.com',
      subject: `Novo contato - ${sanitizedData.eventType}`,
      html: generateEmailTemplate(sanitizedData),
      replyTo: sanitizedData.email,
    });

    return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message,
    });
  }
}