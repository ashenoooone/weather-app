#!/bin/sh
set -e
cd /app

npm ci

# mock API — в фоне, Vite — основной процесс (слушает 0.0.0.0 из vite.config / флагов)
npm run mock &
sleep 2

exec npm run dev:front
