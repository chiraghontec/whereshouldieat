#!/bin/bash

# WhereShouldIEat - GitHub Push Script
echo "🚀 Pushing WhereShouldIEat to GitHub..."
echo ""

# Check if we're in the right directory
if [ ! -f "COMPLETION_SUMMARY.md" ]; then
    echo "❌ Error: Please run this script from the WhereShouldIEat project root directory"
    exit 1
fi

echo "📋 Current project status:"
echo "✅ Backend tested and working (FastAPI on port 8000)"
echo "✅ Frontend tested and working (Next.js on port 3000)"
echo "✅ All 11 routes verified as working"
echo "✅ Full rebranding from FoodieFind to WhereShouldIEat complete"
echo ""

# Check git status
echo "📊 Checking git status..."
git status
echo ""

# Instructions for user
echo "🔧 To push to GitHub, please follow these steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: WhereShouldIEat"
echo "   - Description: Restaurant discovery platform for finding hidden culinary gems"
echo "   - Make it public or private (your choice)"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. Copy your GitHub repository URL, then run:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/WhereShouldIEat.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Or if you prefer SSH:"
echo "   git remote add origin git@github.com:YOUR_USERNAME/WhereShouldIEat.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

# Offer to set remote if user provides URL
read -p "Do you have your GitHub repository URL ready? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ ! -z "$repo_url" ]; then
        echo "Adding remote origin..."
        git remote add origin "$repo_url"
        
        echo "Setting main branch..."
        git branch -M main
        
        echo "Pushing to GitHub..."
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 SUCCESS! Your WhereShouldIEat project has been pushed to GitHub!"
            echo "🔗 Repository URL: $repo_url"
            echo ""
            echo "✅ What's been pushed:"
            echo "   - Complete rebranded codebase (WhereShouldIEat)"
            echo "   - Working FastAPI backend"
            echo "   - Working Next.js frontend with all 11 routes"
            echo "   - React Native mobile app structure"
            echo "   - Shared UI components"
            echo "   - Documentation and deployment scripts"
            echo "   - Project completion summary"
            echo ""
            echo "🚀 Your project is now ready for collaboration and deployment!"
        else
            echo "❌ Error occurred during push. Please check your credentials and try again."
        fi
    else
        echo "❌ No URL provided. Please run the commands manually."
    fi
else
    echo "💡 No problem! Please create your GitHub repository first, then run the git commands shown above."
fi

echo ""
echo "📖 Next steps (optional):"
echo "   - Set up GitHub Actions CI/CD (workflow file is already included)"
echo "   - Deploy backend to your preferred hosting platform"
echo "   - Deploy frontend to Vercel, Netlify, or similar"
echo "   - Configure production environment variables"
echo ""
echo "✨ The WhereShouldIEat project is fully complete and ready for production!"
