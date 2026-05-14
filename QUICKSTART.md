# 🚀 Início Rápido - As Branquelas Site

## Em 3 passos você começa!

### 1️⃣ Instale as dependências
```bash
npm install
```

### 2️⃣ Rodeo servidor
```bash
npm start
```

### 3️⃣ Acesse no navegador
```
http://localhost:3000
```

---

## 📋 Checklist de Configuração

- [ ] Substituir número WhatsApp (linha no HTML)
- [ ] Adicionar email de contato
- [ ] Configurar SMTP para envio de emails (.env)
- [ ] Adicionar vídeo branquelas.mp4
- [ ] Adicionar fotos dos animadores
- [ ] Testar formulário de contato
- [ ] Testar WhatsApp widget

---

## 🎥 Adicionar Vídeo Hero

1. Coloque seu vídeo em: `public/assets/videos/branquelas.mp4`
2. Comprima com FFmpeg (opcional):
```bash
ffmpeg -i seu-video.mp4 -crf 28 branquelas.mp4
```

---

## 📸 Adicionar Imagens

1. Coloque fotos em: `public/assets/images/`
2. Nomeie como: `about-placeholder.jpg`
3. Otimize com tinypng.com (gratuito)

---

## 📧 Configurar Email (Gmail)

1. Ative 2FA: myaccount.google.com
2. Crie App Password: https://myaccount.google.com/apppasswords
3. Copie a senha gerada
4. No `.env`:
```
SMTP_USER=seu-email@gmail.com
SMTP_PASS=xxxxx xxxx xxxx xxxx
```

---

## 🔗 Personalizar WhatsApp

Edite em `public/index.html`, procure por:
```html
href="https://wa.me/5511999999999?text=..."
```

Substitua `5511999999999` pelo número (com país + área, sem espaços)

---

## 🌐 Publicar Online

### Vercel (Recomendado - 30 segundos)
```bash
npm install -g vercel
vercel
```

### Netlify (Alternativa)
```bash
npm install -g netlify-cli
netlify deploy
```

---

## 🆘 Problemas?

**Porta 3000 já em uso?**
```bash
PORT=3001 npm start
```

**Erro de email?**
- Verifique usuário/senha no `.env`
- Ative acesso a apps menos seguros (Gmail)

**Vídeo não carrega?**
- Coloque em: `public/assets/videos/branquelas.mp4`
- Teste o navegador com F12 (console)

---

## 📚 Mais Informações

- Veja `README.md` para documentação completa
- Veja `MEDIA-GUIDE.md` para otimizar imagens/vídeos
- Veja `.planning/ROADMAP.md` para fases futuras

---

**Status:** ✅ MVP Pronto | ⏳ Aguardando mídias reais

Bora animar uns eventos! 🎉💃
