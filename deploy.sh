#!/bin/bash

echo "🚀 Deploying Chade Inaag to production..."

# Install PM2 globally if not already installed
npm install -g pm2

# Create logs directory
mkdir -p logs

# Create uploads directory for backend
mkdir -p backend/uploads

# Build frontend for production
echo "📦 Building frontend..."
cd frontend
npm install
# Clear TypeScript cache to fix permission issues
rm -rf node_modules/.tmp
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Stop existing processes
echo "🛑 Stopping existing processes..."
pm2 stop chade-inaag-backend || true
pm2 delete chade-inaag-backend || true

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
echo ""
echo "⚠️  IMPORTANT SETUP STEPS:"
echo "1. Copy nginx config: sudo cp nginx.conf /etc/nginx/sites-available/chadeinaag"
echo "2. Enable site: sudo ln -s /etc/nginx/sites-available/chadeinaag /etc/nginx/sites-enabled/"
echo "3. Remove default site: sudo rm /etc/nginx/sites-enabled/default"
echo "4. Get SSL certificate: sudo certbot --nginx -d chadeinaag.website -d www.chadeinaag.website"
echo "5. Test nginx: sudo nginx -t"
echo "6. Reload nginx: sudo systemctl reload nginx"
