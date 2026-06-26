#!/bin/bash
set -e

echo "📦 Installing all dependencies (including devDependencies)..."
npm install

echo "🔨 Building TypeScript..."
npm run build

echo "✅ Build complete!"
