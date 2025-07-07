# GitHub Deployment Guide

## 📋 Pre-Deployment Checklist

Your WhereShouldIEat codebase is now clean, organized, and ready for GitHub deployment. Here's what has been prepared:

### ✅ Code Organization
- **Backend**: `/backend/` - FastAPI application with all APIs, models, and configurations
- **Frontend Web**: `/frontend/web/` - Next.js web application
- **Frontend Mobile**: `/frontend/mobile/` - React Native mobile application
- **Shared Frontend**: `/frontend/shared/` - Shared components, hooks, and utilities
- **Documentation**: `/docs/` - API documentation and deployment guides
- **Scripts**: `/scripts/` - Development and deployment automation scripts

### ✅ Branch Structure
- `main` - Production-ready code
- `develop` - Integration branch for development
- `backend/api-development` - Backend development branch
- `frontend/web-development` - Web frontend development branch
- `frontend/mobile-development` - Mobile app development branch
- `feature/hidden-gem-algorithm` - ML algorithm feature branch
- `feature/review-system` - Review system feature branch

### ✅ CI/CD Setup
- GitHub Actions workflow configured in `.github/workflows/ci-cd.yml`
- Automated testing for backend, web, and mobile
- Deployment stubs ready for production setup

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository settings:
   - **Repository name**: `whereshouldieat` (or your preferred name)
   - **Description**: "WhereShouldIEat - AI-Powered Restaurant Discovery SaaS Platform"
   - **Visibility**: Choose Public or Private based on your needs
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 2: Deploy to GitHub

After creating the repository, GitHub will show you the repository URL. Use our deployment script:

```bash
# Replace with your actual repository URL
./scripts/deploy-to-github.sh https://github.com/yourusername/whereshouldieat.git
```

The script will:
- Set up the remote repository
- Push all branches with proper tracking
- Display deployment status and next steps

### Step 3: Configure Repository Settings

#### Branch Protection Rules
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Branches**
3. Click **Add rule** for each important branch:

**For `main` branch:**
- Branch name pattern: `main`
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Include administrators

**For `develop` branch:**
- Branch name pattern: `develop`
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

#### Repository Secrets (for CI/CD)
Go to **Settings** → **Secrets and variables** → **Actions** and add:

- `VERCEL_TOKEN` - For web app deployment
- `EXPO_TOKEN` - For mobile app deployment
- `DOCKER_HUB_USERNAME` - For backend container deployment
- `DOCKER_HUB_PASSWORD` - For backend container deployment
- Any other environment-specific secrets

### Step 4: Set Up Issue and PR Templates

The repository includes basic templates, but you may want to customize:

1. Create `.github/ISSUE_TEMPLATE/` directory
2. Create `.github/PULL_REQUEST_TEMPLATE.md`
3. Customize based on your team's workflow

## 🔄 Development Workflow

### Creating Feature Branches
```bash
# Create new feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on your feature
# ... make changes ...

# Push feature branch
git push -u origin feature/your-feature-name
```

### Pull Request Process
1. Create PR from feature branch to `develop`
2. Ensure all CI checks pass
3. Request code review
4. Merge after approval
5. Delete feature branch after merge

### Release Process
1. Create PR from `develop` to `main`
2. Ensure all tests pass
3. Tag the release: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push tags: `git push origin --tags`

## 📊 Monitoring and Maintenance

### CI/CD Monitoring
- Check GitHub Actions tab for build status
- Monitor deployment logs
- Set up notifications for failed builds

### Code Quality
- Regular dependency updates
- Security scanning with GitHub Security tab
- Code review enforcement through branch protection

## 🛠 Additional Setup (Optional)

### Project Board
1. Go to **Projects** tab in your repository
2. Create a new project board
3. Set up columns: Backlog, In Progress, Review, Done
4. Link issues and PRs to project board

### Wiki Documentation
1. Enable Wiki in repository settings
2. Create comprehensive documentation
3. Include setup guides, API documentation, etc.

### Security Setup
1. Enable Dependabot alerts
2. Set up CodeQL analysis
3. Configure security policies

## 📞 Support

If you encounter any issues during deployment:

1. Check the deployment script output for specific errors
2. Verify GitHub repository permissions
3. Ensure git credentials are properly configured
4. Review GitHub Actions logs for CI/CD issues

Your WhereShouldIEat codebase is production-ready and follows industry best practices for organization, version control, and deployment automation!
