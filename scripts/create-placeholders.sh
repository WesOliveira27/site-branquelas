#!/bin/bash

# Script para criar imagens placeholder
# Requer ImageMagick instalado: brew install imagemagick (Mac) ou apt-get install imagemagick (Linux)

echo "📸 Criando imagens placeholder..."

# Create placeholder images using ImageMagick
# Se não tiver ImageMagick, pode usar:
# 1. Online tools como placeholder.com
# 2. Fazer download de imagens livre de direitos

# Hero placeholder
convert -size 1920x1080 xc:linear-gradient -gravity center -pointsize 100 \
    -fill white -annotate +0+0 "As Branquelas\nSubstituir com branquelas.mp4" \
    public/assets/images/hero-placeholder.jpg

# About placeholder
convert -size 800x600 xc:linear-gradient -gravity center -pointsize 60 \
    -fill white -annotate +0+0 "Foto dos\nAnimadores" \
    public/assets/images/about-placeholder.jpg

echo "✅ Imagens criadas em public/assets/images/"
echo ""
echo "⚠️  Substitua as imagens placeholder pelas reais:"
echo "  - about-placeholder.jpg → Foto dos animadores"
echo "  - service-*.jpg → Fotos dos eventos"
echo ""
echo "💡 Dicas:"
echo "  1. Use Unsplash, Pexels ou Pixabay para imagens livres"
echo "  2. Comprima imagens com tinypng.com"
echo "  3. Converta para WebP para melhor performance"
echo ""
