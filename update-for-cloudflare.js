#!/usr/bin/env node

/**
 * Script para preparar o projeto para deploy no Cloudflare Pages
 * 
 * Este script:
 * 1. Atualiza o lockfile do bun
 * 2. Cria um arquivo wrangler.toml com configurações otimizadas
 * 3. Adiciona scripts de build para Cloudflare
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando projeto para deploy no Cloudflare Pages...\n');

try {
  // 1. Atualizar lockfile
  console.log('📦 Atualizando lockfile...');
  execSync('bun install', { stdio: 'inherit' });
  console.log('✅ Lockfile atualizado!\n');

  // 2. Criar wrangler.toml para Cloudflare
  console.log('⚙️ Criando configuração do Cloudflare...');
  const wranglerConfig = `name = "nooma-glow-website"
pages_build_output_dir = "dist"

[build]
command = "bun install && bun run build"

[env.production]
compatibility_date = "2024-01-01"

[env.preview]
compatibility_date = "2024-01-01"
`;

  fs.writeFileSync('wrangler.toml', wranglerConfig);
  console.log('✅ wrangler.toml criado!\n');

  // 3. Verificar package.json e sugerir melhorias
  console.log('📋 Verificando configurações de build...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (!packageJson.scripts.build) {
    console.log('⚠️ Script de build não encontrado no package.json');
  } else {
    console.log('✅ Script de build encontrado:', packageJson.scripts.build);
  }

  console.log('\n🎉 Projeto preparado para Cloudflare Pages!');
  console.log('\n📝 Próximos passos:');
  console.log('1. Fazer commit das mudanças: git add . && git commit -m "Prepare for Cloudflare deployment"');
  console.log('2. Fazer push: git push origin main');
  console.log('3. No Cloudflare Pages, usar as configurações:');
  console.log('   - Build command: bun install && bun run build');
  console.log('   - Build output directory: dist');
  console.log('   - Root directory: / (deixar vazio)');

} catch (error) {
  console.error('❌ Erro durante a preparação:', error.message);
  process.exit(1);
}