# Guia de Mídias - Branquelas Site

## Vídeo Hero (Obrigatório)

### Arquivo: `public/assets/videos/branquelas.mp4`

**Especificações:**
- Formato: MP4 (H.264)
- Resolução: 1920x1080 (Full HD)
- Duração: 15-30 segundos
- Taxa de bits: 5000-8000 kbps
- Taxa de frames: 30 fps

**Compressão com FFmpeg:**
```bash
ffmpeg -i branquelas.mp4 -vcodec h264 -crf 28 -preset slow -acodec aac -b:a 128k branquelas-compressed.mp4
```

**WebM alternativo (melhor compressão):**
```bash
ffmpeg -i branquelas.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 branquelas.webm
```

## Imagens

### About Section: `public/assets/images/about-placeholder.jpg`
- Resolução: 800x600 ou maior
- Proporção: 4:3 ou 16:9
- Peso: < 150KB
- Formato: WebP com JPG fallback

### Sugestões:
- Foto dos dois animadores em traje
- Foto da dupla dançando
- Foto de uma apresentação anterior

## Otimização de Imagens

### Ferramentas recomendadas:
1. **TinyPNG**: tinypng.com (online)
2. **ImageOptim**: Mac (desktop)
3. **FileOptimizer**: Windows (desktop)
4. **FFmpeg**: Vídeos

### Comandos úteis:

**Redimensionar imagem:**
```bash
ffmpeg -i imagem.jpg -vf scale=1200:-1 imagem-resized.jpg
```

**Converter para WebP:**
```bash
cwebp imagem.jpg -o imagem.webp -q 80
```

**Extrair frame do vídeo:**
```bash
ffmpeg -i branquelas.mp4 -ss 00:00:05 -vframes 1 preview.jpg
```

## Estrutura de Arquivos

```
public/assets/
├── images/
│   ├── about-placeholder.jpg
│   ├── service-1.jpg (opcional)
│   └── og-image.jpg (social media preview)
└── videos/
    ├── branquelas.mp4 (obrigatório)
    └── branquelas.webm (opcional - melhor compressão)
```

## Performance Target

- Vídeo hero: < 2MB
- Imagens totais: < 500KB
- Load time: < 3 segundos

## Licenças e Direitos

Certifique-se de que:
- ✅ Tem direitos sobre as imagens/vídeos
- ✅ Pode usar comercialmente
- ✅ Credita artistas se necessário

## Recursos Gratuitos

- Imagens: Unsplash, Pexels, Pixabay
- Vídeos: Coverr, Pexels Video
- Ícones: Font Awesome, Material Icons
