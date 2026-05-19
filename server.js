import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import validator from 'validator';

// Load environment variables
dotenv.config();

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
    const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_EMAIL'];
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
        console.warn(`[WARNING] Missing environment variables: ${missingEnvVars.join(', ')}`);
        console.warn('[WARNING] Email functionality may not work properly');
    }
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            mediaSrc: ["'self'", 'blob:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'https://cdnjs.cloudflare.com'],
        },
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// CORS configuration
app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    maxAge: 86400,
}));

// Compression
app.use(compression());

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const contactLimiter = rateLimit({
    windowMs: (process.env.RATE_LIMIT_MINUTES || 15) * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 5,
    message: 'Muitas requisições. Tente novamente mais tarde.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => NODE_ENV === 'development',
});

// Logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// Email configuration
let transporter;
try {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
} catch (error) {
    console.error('Email configuration error:', error.message);
    console.log('Email sending will be disabled');
}

// Validation functions
function validateContactForm(data) {
    const errors = {};

    // Name validation
    if (!data.name || typeof data.name !== 'string') {
        errors.name = 'Nome é obrigatório';
    } else if (data.name.length < 3 || data.name.length > 100) {
        errors.name = 'Nome deve ter entre 3 e 100 caracteres';
    } else if (!validator.isAlpha(data.name.replace(/\s/g, '').replace(/-/g, '').replace(/'/g, ''))) {
        errors.name = 'Nome contém caracteres inválidos';
    }

    // Email validation
    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = 'Email inválido';
    }

    // Event type validation
    const validEventTypes = ['aniversario', 'casamento', 'confraternizacao', 'corporativo', 'outro'];
    if (!data.eventType || !validEventTypes.includes(data.eventType)) {
        errors.eventType = 'Tipo de evento inválido';
    }

    // Message validation
    if (!data.message || typeof data.message !== 'string') {
        errors.message = 'Mensagem é obrigatória';
    } else if (data.message.length < 10 || data.message.length > 1000) {
        errors.message = 'Mensagem deve ter entre 10 e 1000 caracteres';
    }

    // Phone validation (optional, but validate if provided)
    if (data.phone) {
        // Accept both Brazilian format and generic phone format
        const phoneRegex = /^[0-9\s\-\(\)\+]*$/;
        if (!phoneRegex.test(data.phone)) {
            errors.phone = 'Telefone inválido';
        } else if (data.phone.replace(/\D/g, '').length < 10) {
            errors.phone = 'Telefone deve ter no mínimo 10 dígitos';
        }
    }

    // Date validation (optional)
    if (data.eventDate) {
        const date = new Date(data.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(date.getTime())) {
            errors.eventDate = 'Data inválida';
        } else if (date < today) {
            errors.eventDate = 'Data deve ser no futuro';
        }
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

// Routes

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint (remove in production)
app.get('/debug/assets', (req, res) => {
    const publicPath = join(__dirname, 'public');
    const assetsPath = join(publicPath, 'assets');
    
    try {
        const imagesPath = join(assetsPath, 'images');
        const videosPath = join(assetsPath, 'videos');
        
        const images = readdirSync(imagesPath).filter(f => !f.startsWith('.'));
        const videos = readdirSync(videosPath).filter(f => !f.startsWith('.'));
        
        res.json({
            __dirname,
            publicPath,
            assetsPath,
            images,
            videos,
            status: 'ok'
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message,
            __dirname,
            publicPath: join(__dirname, 'public')
        });
    }
});

// Serve static files with explicit cache headers
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600');
    next();
});

app.use(express.static(join(__dirname, 'public'), {
    maxAge: '1h',
    etag: false,
    dotfiles: 'deny'
}));

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, phone, eventType, eventDate, message } = req.body;

        // Validate input
        const validationErrors = validateContactForm({
            name,
            email,
            phone,
            eventType,
            message,
            eventDate,
        });

        if (validationErrors) {
            return res.status(400).json({
                success: false,
                message: 'Dados de formulário inválidos',
                errors: validationErrors,
            });
        }

        // Sanitize inputs
        const sanitizedData = {
            name: validator.escape(name),
            email: validator.normalizeEmail(email),
            phone: phone ? validator.escape(phone) : '',
            eventType: validator.escape(eventType),
            eventDate: eventDate ? validator.escape(eventDate) : '',
            message: validator.escape(message),
        };

        // Log contact attempt
        console.log(`[CONTACT] ${sanitizedData.email} - ${sanitizedData.eventType}`);

        // Prepare email
        if (transporter) {
            const mailOptions = {
                from: process.env.SMTP_FROM || 'noreply@branquelas.com',
                to: process.env.CONTACT_EMAIL || 'contato@branquelas.com',
                subject: `Novo contato - ${sanitizedData.eventType}`,
                html: generateEmailTemplate(sanitizedData),
                replyTo: sanitizedData.email,
            };

            // Send email
            await transporter.sendMail(mailOptions);
            console.log(`[EMAIL_SENT] ${sanitizedData.email}`);
        } else {
            console.warn('[WARNING] Email transporter not configured');
        }

        // Success response
        res.json({
            success: true,
            message: 'Mensagem recebida com sucesso!',
        });

    } catch (error) {
        console.error('[ERROR] Contact form error:', error.message);

        // Don't expose internal errors to client
        res.status(500).json({
            success: false,
            message: 'Erro ao processar sua mensagem. Tente novamente mais tarde.',
        });
    }
});

// Email template
function generateEmailTemplate(data) {
    return `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #FFD700;">Novo Contato - As Branquelas</h2>

                <h3>Informações do Contato:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: bold; width: 150px;">Nome:</td>
                        <td style="padding: 10px;">${data.name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: bold;">Email:</td>
                        <td style="padding: 10px;"><a href="mailto:${data.email}">${data.email}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: bold;">Telefone:</td>
                        <td style="padding: 10px;">${data.phone || 'Não informado'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: bold;">Tipo de Evento:</td>
                        <td style="padding: 10px;">${data.eventType}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px; font-weight: bold;">Data do Evento:</td>
                        <td style="padding: 10px;">${data.eventDate || 'Não informada'}</td>
                    </tr>
                </table>

                <h3 style="margin-top: 20px;">Mensagem:</h3>
                <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                    ${data.message}
                </p>

                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">
                    Este email foi enviado automaticamente pelo formulário de contato do site As Branquelas.
                </p>
            </body>
        </html>
    `;
}

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        error: 'Não encontrado',
        path: req.path,
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);

    res.status(err.status || 500).json({
        error: NODE_ENV === 'development' ? err.message : 'Erro interno do servidor',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📧 Email notifications: ${transporter ? 'ENABLED' : 'DISABLED'}`);
    console.log(`🔒 Ambiente: ${NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n📌 Servidor encerrado');
    process.exit(0);
});
