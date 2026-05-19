# 🚀 Guia Completo: Deploy na Vercel (Passo-a-Passo)

## 📋 Pré-requisitos
- ✅ Conta no GitHub (você já tem)
- ✅ Repositório pushado no GitHub (você já fez)
- ✅ Criar conta Vercel (gratuita)

---

## 🔑 Passo 1: Criar Conta Vercel

1. Abra: **https://vercel.com/signup**
2. Clique em **"Continue with GitHub"**
3. Autorize a Vercel a acessar sua conta GitHub
4. Pronto! Sua conta está criada

---

## 📂 Passo 2: Importar Repositório

1. Acesse: **https://vercel.com/new**
2. Você verá: "Select a Git Repository"
3. Procure por: **site-branquelas**
4. Clique em **"Import"** (botão à direita)

---

## ⚙️ Passo 3: Application Preset

Na tela que abrir:

```
PROJECT NAME: site-branquelas (padrão está ok)
APPLICATION PRESET: Node.js (ou deixe em branco, Vercel detecta automaticamente)
```

Clique em **"Continue"** ou **"Deploy"** se não houver mais opções

---

## 🔐 Passo 4: Environment Variables (CRÍTICO!)

**ESTA É A PARTE MAIS IMPORTANTE!**

Na tela "Configure Project", você verá "Environment Variables"

### Preencha cada uma:

| Variável | Valor | Notas |
|----------|-------|-------|
| `NODE_ENV` | `production` | Não mude |
| `SMTP_HOST` | `smtp.gmail.com` | Para Gmail |
| `SMTP_PORT` | `587` | Padrão SMTP |
| `SMTP_USER` | seu-email@gmail.com | Seu email |
| `SMTP_PASS` | **APP PASSWORD** | ⚠️ Ver instruções abaixo |
| `SMTP_FROM` | `contato@branquelas.com` | Email de envio |
| `CONTACT_EMAIL` | seu-email@gmail.com | Onde receber mensagens |
| `CORS_ORIGIN` | `https://site-branquelas.vercel.app` | Substitua "site-branquelas" se mudar o nome |
| `RATE_LIMIT_MINUTES` | `15` | Sem aspas |
| `RATE_LIMIT_MAX_REQUESTS` | `5` | Sem aspas |

---

## ⚠️ IMPORTANTE: APP PASSWORD do Gmail

**VOCÊ PRECISA USAR APP PASSWORD, NÃO SUA SENHA NORMAL!**

### Como gerar:

1. Acesse: **https://myaccount.google.com/apppasswords**
2. Se pedir, faça login
3. Selecione:
   - **App**: "Mail"
   - **Device**: "Windows Computer" (ou seu SO)
4. Clique **"Generate"**
5. Copie a senha de 16 caracteres que aparecer
6. Cole em `SMTP_PASS` na Vercel

**Exemplo:**
```
SMTP_PASS = abcd efgh ijkl mnop
```

---

## 📝 Preenchendo as Variáveis na Vercel

### Interface da Vercel:

```
Para cada variável, clique em "Add":

[Environment Variable Name]
[Environment Variable Value]
[Production / Preview / Development]

Deixe em branco o último (aplica em todos)
```

**Ou copie e cole tudo de uma vez:**

```
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-app-password-aqui
SMTP_FROM=contato@branquelas.com
CONTACT_EMAIL=seu-email@gmail.com
CORS_ORIGIN=https://site-branquelas.vercel.app
RATE_LIMIT_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=5
```

---

## 🚀 Passo 5: Deploy

Após preencher todas as variáveis:

1. Clique em **"Deploy"** (botão grande no final)
2. Espere ~2-3 minutos
3. Você verá a tela "Deployment Complete"
4. Clique em **"Visit"** para abrir seu site

---

## ✅ Verificar se Deu Certo

Acesse: **https://site-branquelas.vercel.app** (ou seu domínio customizado)

Você deve ver:
- ✅ Logo com ícone de dança
- ✅ Hero section com fundo Ferrari
- ✅ Cards de serviço com imagens
- ✅ Carousel funcionando
- ✅ Formulário de contato

---

## 🧪 Testar o Formulário

1. Preencha e clique em "Enviar"
2. Deve aparecer: "✅ Mensagem enviada com sucesso!"
3. Verifique seu email (pode ir para spam)

---

## 🔗 Domínio Customizado (Opcional)

Se você quer usar um domínio seu (ex: branquelas.com.br):

1. Na Vercel, vá para: **Project Settings → Domains**
2. Clique **"Add Domain"**
3. Digite seu domínio
4. Siga as instruções para apontar o DNS

---

## 🆘 Troubleshooting

### "Build failed"
→ Verifique se package.json está correto
→ Rode localmente: `npm install && npm start`

### "Formulário não envia email"
→ Verifique `SMTP_PASS` (tem que ser APP PASSWORD, não senha)
→ Verifique `CONTACT_EMAIL` (email onde receber)

### "CORS error"
→ Atualize `CORS_ORIGIN` com seu domínio final na Vercel

### "Imagens não aparecem"
→ Verifique se `/public/assets/images/` tem as 4 imagens
→ Rode localmente primeiro

---

## 📊 Monitorar Logs

Depois do deploy:

1. Vá para seu projeto na Vercel
2. Clique em **"Deployments"**
3. Selecione o deployment mais recente
4. Clique em **"Logs"**
5. Você verá em tempo real como o servidor está rodando

---

## 🎉 Sucesso!

Seu site está online! 🚀

**URLs importantes:**
```
Site: https://site-branquelas.vercel.app
GitHub: https://github.com/WesOliveira27/site-branquelas
Vercel Dashboard: https://vercel.com/dashboard
```

---

## 📞 Próximos Passos (Opcionais)

- [ ] Adicionar domínio customizado
- [ ] Configurar analytics
- [ ] Configurar auto-deployments
- [ ] Adicionar admin panel para gerenciar eventos
- [ ] Integrar com banco de dados (Supabase)

---

**Dúvidas? Me chama!** 💬
