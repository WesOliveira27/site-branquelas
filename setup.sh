#!/bin/bash

echo "🚀 Iniciando setup do projeto As Branquelas..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo ""

# Install dependencies
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "✅ Setup concluído com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure o .env com suas variáveis de ambiente"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo ""
