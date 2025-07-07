#!/bin/bash

# WhereShouldIEat Pre-Deployment Verification Script
# Verifies that the codebase is ready for GitHub deployment

set -e

echo "🔍 WhereShouldIEat Pre-Deployment Verification"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_check() {
    echo -e "${BLUE}[CHECK]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

errors=0

# Check if we're in the right directory
print_check "Verifying project structure..."
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_fail "Not in WhereShouldIEat project root directory"
    exit 1
fi
print_pass "Project structure verified"

# Check git repository
print_check "Verifying git repository..."
if [ ! -d ".git" ]; then
    print_fail "Not a git repository"
    exit 1
fi
print_pass "Git repository found"

# Check for uncommitted changes
print_check "Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
    print_warn "Uncommitted changes found:"
    git status --porcelain
    ((errors++))
else
    print_pass "Working directory clean"
fi

# Check branches
print_check "Verifying branch structure..."
required_branches=("main" "develop" "backend/api-development" "frontend/web-development" "frontend/mobile-development" "feature/hidden-gem-algorithm" "feature/review-system")

for branch in "${required_branches[@]}"; do
    if git show-ref --verify --quiet refs/heads/$branch; then
        print_pass "Branch '$branch' exists"
    else
        print_fail "Missing required branch: $branch"
        ((errors++))
    fi
done

# Check important files
print_check "Verifying important files..."
important_files=(
    "README.md"
    ".gitignore"
    "frontend/web/package.json"
    "frontend/mobile/package.json"
    "backend/requirements.txt"
    "docs/API.md"
    "docs/DEPLOYMENT.md"
    "docs/GITHUB_DEPLOYMENT.md"
    ".github/workflows/ci-cd.yml"
    "scripts/setup-dev.sh"
    "scripts/deploy-to-github.sh"
)

for file in "${important_files[@]}"; do
    if [ -f "$file" ]; then
        print_pass "File '$file' exists"
    else
        print_fail "Missing important file: $file"
        ((errors++))
    fi
done

# Check for sensitive files that shouldn't be committed
print_check "Checking for sensitive files..."
sensitive_patterns=(".env" "*.key" "*.pem" "*.p12" "*secret*" "*password*")
found_sensitive=false

for pattern in "${sensitive_patterns[@]}"; do
    if find . -name "$pattern" -not -path "./.git/*" | grep -q .; then
        print_warn "Found potential sensitive files matching '$pattern':"
        find . -name "$pattern" -not -path "./.git/*"
        found_sensitive=true
    fi
done

if [ "$found_sensitive" = false ]; then
    print_pass "No obvious sensitive files found"
fi

# Check package.json files for proper configuration
print_check "Verifying package.json configurations..."

if [ -f "frontend/web/package.json" ]; then
    if grep -q '"name": "whereshouldieat-web"' frontend/web/package.json; then
        print_pass "Web package.json properly configured"
    else
        print_warn "Web package.json may need name verification"
    fi
fi

if [ -f "frontend/mobile/package.json" ]; then
    if grep -q '"name": "whereshouldieat-mobile"' frontend/mobile/package.json; then
        print_pass "Mobile package.json properly configured"
    else
        print_warn "Mobile package.json may need name verification"
    fi
fi

# Check for TODO or FIXME comments
print_check "Checking for TODO/FIXME comments..."
todo_count=$(find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.py" \) -not -path "./.git/*" -not -path "./node_modules/*" -not -path "./.venv/*" | xargs grep -l "TODO\|FIXME" | wc -l)

if [ "$todo_count" -gt 0 ]; then
    print_warn "Found $todo_count file(s) with TODO/FIXME comments"
    print_warn "Consider reviewing these before deployment"
else
    print_pass "No TODO/FIXME comments found"
fi

# Summary
echo ""
echo "📊 Verification Summary"
echo "======================"

if [ $errors -eq 0 ]; then
    print_pass "All checks passed! Repository is ready for GitHub deployment."
    echo ""
    echo "🚀 Next steps:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: ./scripts/deploy-to-github.sh <your-repo-url>"
    echo "3. Set up branch protection rules"
    echo "4. Configure CI/CD secrets"
    echo ""
    echo "📖 See docs/GITHUB_DEPLOYMENT.md for detailed instructions"
    exit 0
else
    print_fail "$errors issue(s) found. Please resolve before deployment."
    exit 1
fi
