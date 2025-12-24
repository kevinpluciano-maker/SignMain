#!/bin/bash

# Git Push Fix Script
# This prepares your repo for pushing to GitHub

echo "🔧 Preparing Git for Push..."
echo ""

cd /app

# Add all changes
echo "✅ Adding all changes..."
git add .

# Commit changes
echo "✅ Committing changes..."
git commit -m "Fix: Video display on Netlify - Multiple CDN sources" || echo "Nothing to commit"

# Show current status
echo ""
echo "📊 Current Git Status:"
git status

echo ""
echo "📋 Recent commits:"
git log --oneline -3

echo ""
echo "🎯 NEXT STEPS FOR YOU:"
echo ""
echo "1. On your computer, navigate to your project folder"
echo ""
echo "2. If remote is not set, add it:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo ""
echo "3. Pull latest changes:"
echo "   git pull origin main --rebase"
echo ""
echo "4. Push your changes:"
echo "   git push origin main"
echo ""
echo "5. If push is rejected, force push (CAREFUL!):"
echo "   git push origin main --force"
echo ""
echo "✅ After pushing, your video will work on Netlify!"
echo ""
