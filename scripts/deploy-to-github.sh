#!/bin/bash

# WhereShouldIEat GitHub Deployment Script
# This script helps deploy the WhereShouldIEat codebase to GitHub with proper branch setup

set -e

echo "🚀 WhereShouldIEat GitHub Deployment Script"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Please run this script from the WhereShouldIEat project root directory"
    exit 1
fi

print_status "Checking current git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit or stash them first."
    git status
    exit 1
fi

# Check if user has provided repository URL
if [ -z "$1" ]; then
    print_error "Please provide the GitHub repository URL as an argument"
    echo "Usage: ./scripts/deploy-to-github.sh <github-repo-url>"
    echo "Example: ./scripts/deploy-to-github.sh https://github.com/chiraghontec/whereshouldieat.git"
    exit 1
fi

REPO_URL="$1"

print_status "Setting up remote repository..."
if git remote get-url origin &>/dev/null; then
    print_warning "Origin remote already exists. Removing and re-adding..."
    git remote remove origin
fi

git remote add origin "$REPO_URL"
print_success "Added remote origin: $REPO_URL"

print_status "Pushing main branch..."
git push -u origin main

print_status "Pushing develop branch..."
git push -u origin develop

print_status "Pushing all feature branches..."
git push -u origin backend/api-development
git push -u origin frontend/web-development
git push -u origin frontend/mobile-development
git push -u origin feature/hidden-gem-algorithm
git push -u origin feature/review-system

print_success "All branches pushed successfully!"

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
print_status "Branches created:"
echo "  • main (production-ready code)"
echo "  • develop (integration branch)"
echo "  • backend/api-development (backend development)"
echo "  • frontend/web-development (Next.js web app)"
echo "  • frontend/mobile-development (React Native app)"
echo "  • feature/hidden-gem-algorithm (ML algorithm feature)"
echo "  • feature/review-system (review system feature)"
echo ""
print_status "Next steps:"
echo "  1. Set up branch protection rules on GitHub"
echo "  2. Configure PR templates and code review requirements"
echo "  3. Set up environment secrets for CI/CD"
echo "  4. Start development on feature branches"
echo ""
print_status "Repository URL: $REPO_URL"
