# Requirements - Branquelas Event Promotion Site

## Functional Requirements

### 1. Hero Section
- Vídeo em background (branquelas.mp4) com autoplay silenciado
- Fallback para imagem estática
- CTA principal (botão "Contrate Agora" ou "Agende uma Performance")
- Overlay semitransparente com texto

### 2. Seção "Sobre"
- Título atrativo
- Texto descritivo fornecido pelo cliente
- Imagens/vídeos dos animadores
- Destaque para o conceito único

### 3. Serviços/Tipos de Eventos
- Cards com tipos de eventos (Aniversários, Casamentos, Confraternizações, Corporativos)
- Descrições breves
- Ícones representativos

### 4. Portfólio/Galeria
- Fotos e vídeos de apresentações
- Layout responsivo (grid)
- Modal ou lightbox para visualização

### 5. Contato Multi-Canal
- **WhatsApp Widget**: Botão flutuante com link direto
  - Telefone: será fornecido
  - Mensagem pré-preenchida: "Olá! Gostaria de conhecer os serviços dos Branquelas"
- **Formulário de Email**:
  - Nome
  - Email
  - Telefone
  - Tipo de evento
  - Data do evento
  - Mensagem
  - Validação client-side
  - Envio server-side (nodemailer ou serviço externo)
- **Informações de Contato**: Telefone, email, redes sociais

### 6. Call-to-Action
- Múltiplos botões estrategicamente posicionados
- Cores destacadas
- Texto persuasivo

## Technical Requirements

### Frontend
- HTML5 semântico
- CSS3 moderno (Flexbox, Grid, responsivo)
- JavaScript vanilla (sem frameworks pesados) OU React/Vue leve
- Responsive design (mobile-first)
- Performance: <3s load time, <100KB CSS+JS comprimidos

### Security
- Validação de formulários (server + client)
- Rate limiting para envio de emails
- HTTPS ready
- Proteção contra XSS (sanitização de inputs)
- CSRF tokens para formulários
- Content Security Policy headers

### Backend (se necessário)
- Node.js com Express (leve e rápido)
- Envio de emails com validação
- Rate limiting
- Logging de erros

### Database
- Não necessário inicialmente (apenas logs se necessário)
- Pode adicionar later: contatos recebidos via email/admin

### Hospedagem
- Desenvolvimento: localhost
- Produção: sugestão Vercel, Netlify ou HostGator

## Non-Functional Requirements

### Performance
- Imagens otimizadas (WebP com fallback)
- Vídeos comprimidos
- CSS/JS minificados
- Lazy loading para imagens
- <3 segundo load time inicial

### SEO
- Metatags apropriadas
- Título e descrição otimizados
- Open Graph tags para compartilhamento social
- Sitemap.xml
- robots.txt

### Accessibility
- WCAG 2.1 Level A
- Contraste suficiente
- Links com alt text
- Navegação por teclado

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Compatibilidade mobile

## Content Deliverables Needed

### From Client
1. ✅ branquelas.mp4 (vídeo principal)
2. Fotos dos animadores (mín. 5)
3. Vídeos de performances (mín. 3)
4. Logo/marca (se houver)
5. Cores preferidas (ou usar paleta inspirada)
6. Números de contato (WhatsApp, telefone, email)
7. Links de redes sociais (Instagram, TikTok, etc.)
8. Nome/nomes dos animadores (ou "Os Branquelas")

### Já Fornecido
- Texto sobre a dupla (longo, pode ser editado)
- Inspiração de design (Ferrari.com)
- Direcionamento de serviços

## Phased Approach

### Phase 1: MVP (Fase 1 - hoje/amanhã)
- Estrutura HTML/CSS completa
- Hero com placeholder para vídeo
- Seções: Sobre, Serviços, Contato
- Formulário de contato com validação
- WhatsApp widget
- Design responsivo
- Segurança básica

### Phase 2: Enhancements (Opcional)
- Galeria de fotos/vídeos
- Animações avançadas
- Backend para armazenar contatos
- Sistema de agendamento

### Phase 3: Produção
- Deploy em produção
- SSL/HTTPS
- Email de boas-vindas
- Analytics
