#!/bin/bash

echo "🚀 Deploying Chade Inaag to production..."

# Install PM2 globally if not already installed
npm install -g pm2

# Create logs directory
mkdir -p logs

# Build frontend for production
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Stop existing processes
echo "🛑 Stopping existing processes..."
pm2 stop chade-inaag-backend chade-inaag-frontend || true
pm2 delete chade-inaag-backend chade-inaag-frontend || true

# Start production processes
echo "🚀 Starting production processes..."
pm2 start ecosystem.config.cjs

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system reboot
pm2 startup

echo "✅ Deployment complete!"
echo "📊 Status: pm2 status"
echo "📋 Logs: pm2 logs"
echo "🔄 Restart: pm2 restart all"
echo "🛑 Stop: pm2 stop all"
