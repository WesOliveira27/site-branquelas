# 🚀 Deploy na Vercel

Este projeto está pronto para ser hospedado na Vercel. Siga os passos abaixo:

## Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Git instalado
- Node.js 18+ instalado

## Opção 1: Deploy direto do GitHub (Recomendado)

1. **Push do código para GitHub:**
   ```bash
   git add -A
   git commit -m "Preparado para deploy na Vercel"
   git push origin main
   ```

2. **Na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - As configurações estão prontas no `vercel.json`
   - Clique em "Deploy"

## Opção 2: Deploy via CLI

1. **Instale o Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Faça o deploy:**
   ```bash
   vercel
   ```

3. **Siga as instruções na tela**

## Configurar Variáveis de Ambiente

Após o deploy inicial:

1. Vá para o projeto na Vercel
2. **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:
   - `NODE_ENV` = `production`
   - `SMTP_HOST` = seu servidor SMTP
   - `SMTP_PORT` = 587
   - `SMTP_USER` = seu email
   - `SMTP_PASS` = sua senha de app
   - `SMTP_FROM` = seu email
   - `CONTACT_EMAIL` = email para receber contatos
   - `CORS_ORIGIN` = URL do seu domínio Vercel (ex: https://seu-projeto.vercel.app)
   - `RATE_LIMIT_MINUTES` = 15
   - `RATE_LIMIT_MAX_REQUESTS` = 5
   - `SESSION_SECRET` = uma string aleatória segura

4. Clique em "Save"

## Domínio Customizado

Para usar um domínio customizado:

1. Na Vercel, vá para **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de DNS
4. Atualize `CORS_ORIGIN` com seu novo domínio

## Verificar o Deploy

- Acesse `https://seu-projeto.vercel.app`
- O site deve carregar com:
  - ✅ Carousel de galeria funcionando
  - ✅ Cards com imagens de background
  - ✅ Formulário de contato respondendo
  - ✅ Vídeo hero carregando
  - ✅ Font Awesome icons exibindo

## Troubleshooting

### Imagens não aparecem
- Verifique se os arquivos estão em `/public/assets/`
- Limpe o cache do navegador

### Formulário não funciona
- Verifique as variáveis SMTP no console
- Confirm email credentials

### CORS error
- Atualize `CORS_ORIGIN` com o URL correto da Vercel

## Monitorar Logs

Na Vercel:
- Vá para **Deployments** → seu deployment
- Clique em **Logs** para ver logs em tempo real

---

**Pronto para ir ao ar! 🚀**
