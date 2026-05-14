# As Branquelas - Site de Promoção de Eventos

Site moderno e responsivo para a dupla de animadores de eventos especializados em personagens de "As Branquelas".

## Características

✨ **Design Elegante** - Inspirado em ferrari.com, layout minimalista e profissional  
🎥 **Vídeo Hero** - Vídeo de destaque em background  
📱 **Responsivo** - Otimizado para desktop, tablet e mobile  
🔒 **Seguro** - Validação, rate limiting, sanitização de inputs  
⚡ **Rápido** - <3s load time, otimizado para performance  
💬 **Multi-canal** - WhatsApp, email e formulário de contato  
🌍 **SEO Ready** - Metatags, sitemap, robots.txt  

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd site-branquelas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env com suas configurações
```

4. Configure o email (opcional):
   - Crie uma App Password no Gmail
   - Atualize `SMTP_USER` e `SMTP_PASS` no `.env`
   - Configure `CONTACT_EMAIL` para receber os contatos

## Uso

### Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000

### Produção

```bash
npm start
```

## Estrutura do Projeto

```
site-branquelas/
├── public/
│   ├── index.html           # Página principal
│   ├── css/
│   │   └── styles.css       # Estilos
│   ├── js/
│   │   └── script.js        # JavaScript cliente
│   ├── assets/
│   │   ├── images/
│   │   └── videos/
│   ├── robots.txt
│   └── sitemap.xml
├── server.js                # Express server
├── package.json
├── .env.example
└── .planning/               # Documentação GSD
```

## Configuração de Email

Para ativar o envio de emails, configure o SMTP:

### Gmail
1. Ativa 2FA na conta do Gmail
2. Crie uma App Password
3. Configure no `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=sua-app-password
   SMTP_FROM=seu-email@gmail.com
   CONTACT_EMAIL=seu-email@gmail.com
   ```

### Outros provedores
Ajuste `SMTP_HOST` e `SMTP_PORT` conforme seu provedor.

## Segurança

### Implementado
✅ Validação de formulários (server-side)  
✅ Sanitização de inputs  
✅ Rate limiting (5 requisições por 15 minutos)  
✅ CSRF protection  
✅ CSP headers  
✅ HTTPS ready  
✅ Helmet.js para segurança  
✅ CORS configurado  

### Recomendações
- Use HTTPS em produção
- Mantenha `.env` seguro
- Configure um firewall
- Monitore logs de erro
- Atualize dependências regularmente

## Performance

- CSS/JS minificado
- Imagens otimizadas (use WebP)
- Lazy loading
- Compression middleware
- Cache headers

### Lighthouse
Alvo: Score > 90 em todas as categorias

## Personalização

### WhatsApp Link
Edite o número em `public/index.html`:
```html
href="https://wa.me/5511999999999?text=..."
```

### Email de Contato
Configure em `.env`:
```
CONTACT_EMAIL=seu-email@branquelas.com
```

### Cores
Edite variáveis CSS em `public/css/styles.css`:
```css
:root {
    --primary-color: #FFD700;
    --secondary-color: #1a1a1a;
}
```

### Texto
Edite conteúdo em `public/index.html`

## Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### HostGator / Shared Hosting
1. Build: `npm run build` (se necessário)
2. Upload via SFTP
3. Configure Node.js no painel

## Troubleshooting

### Erro de email
- Verifique credenciais SMTP
- Ative acesso a aplicativos menos seguros
- Verifique firewall

### Port já em uso
```bash
PORT=3001 npm start
```

### Problema com vídeo
- Verifique tamanho do arquivo
- Converta para MP4/WebM
- Comprima com ffmpeg

## Monitoramento

### Logs
```bash
# Visualizar logs
tail -f logs/error.log
```

### Analytics
Configure Google Analytics em `public/index.html` (opcional)

## Support

Para problemas ou sugestões, entre em contato.

---

**Desenvolvido com ❤️ para os Branquelas**
