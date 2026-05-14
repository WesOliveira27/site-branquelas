# Roadmap - Branquelas Event Promotion Site

## Overview
Roadmap estruturado em 3 fases, com MVP completo na Fase 1.

---

## Phase 1: MVP - Foundation & Launch (PRIORITY: TODAY)
**Duration**: 4-6 horas  
**Output**: Site funcional com contato, pronto para localhost

### Tasks
1. **Setup Projeto**
   - Estrutura de diretórios (HTML, CSS, JS, assets)
   - Git commits estruturados
   - Arquivo config para mídias

2. **Frontend - HTML/CSS**
   - Header com navegação
   - Hero section com vídeo/placeholder
   - Seção Sobre (com texto do cliente)
   - Seção Serviços (tipos de eventos)
   - Seção Contato
   - Footer
   - Design responsivo
   - Paleta de cores (elegante, moderno)

3. **Interatividade - JavaScript**
   - Menu mobile/hamburger
   - Scroll suave
   - Validação de formulário
   - WhatsApp widget (link direto)
   - Animações básicas

4. **Contato & Formulários**
   - Formulário HTML com validação
   - WhatsApp link (tel: e wa.me/)
   - Email display
   - Prototipo backend (mesmo que mockado)

5. **Segurança Básica**
   - Validação client-side
   - Sanitização de inputs
   - Rate limiting mockado (ou via header)
   - HTTPS ready

6. **Testes & Otimização**
   - Teste responsivo (mobile, tablet, desktop)
   - Performance check
   - Lighthouse audit

---

## Phase 2: Media & Enhancement (OPTIONAL - Next)
**Duration**: 2-3 horas  
**Output**: Site com galeria completa e animações avançadas

### Tasks
1. **Galeria de Fotos**
   - Upload de múltiplas imagens
   - Modal/lightbox
   - Lazy loading

2. **Vídeos**
   - Seção de vídeos (YouTube embed ou hospedado)
   - Thumbnails com play button

3. **Animações**
   - Parallax scrolling
   - Transições suaves
   - Efeitos hover

4. **Backend - Email**
   - Node.js + Express setup
   - Nodemailer ou SendGrid
   - Armazenamento de contatos (arquivo JSON ou BD leve)

---

## Phase 3: Production & Deployment
**Duration**: 1-2 horas  
**Output**: Site live e monitorado

### Tasks
1. **Deployment**
   - Escolher plataforma (Vercel, Netlify, HostGator)
   - Build pipeline
   - Domain setup

2. **SSL/HTTPS**
   - Certificate (Let's Encrypt)
   - Redirecionamento HTTP → HTTPS

3. **Analytics & Monitoring**
   - Google Analytics
   - Error tracking (Sentry ou similar)
   - Performance monitoring

4. **SEO**
   - Metatags
   - Sitemap.xml
   - robots.txt

5. **Email Setup**
   - Verificação de domínio
   - Email templates
   - Respostas automáticas

---

## Dependencies & Blockers
- ⏳ Aguardando: branquelas.mp4 (pode usar placeholder)
- ⏳ Aguardando: Fotos dos animadores (pode usar placeholders)
- ⏳ Aguardando: Números de contato (WhatsApp, email, telefone)
- ⏳ Aguardando: Cores preferidas (pode usar design inspirado em Ferrari)

## Success Metrics
✅ MVP pronto em < 6h  
✅ Site carrega em < 3 segundos  
✅ Formulário envia emails  
✅ WhatsApp funciona  
✅ Responsive até 320px  
✅ Lighthouse score > 80  
✅ Zero vulnerabilidades críticas  

## Notes
- Design inspirado em ferrari.com (elegante, vídeo destaque, minimalist)
- Foco em performance e segurança desde o início
- Estrutura modular para fácil manutenção e atualizações futuras
