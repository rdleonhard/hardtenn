#!/bin/bash
# Script to push HardTenn Industries website to GitHub

echo "Creating GitHub repository..."
REPO_NAME="hardtenn-industries"

# Create the repository on GitHub (requires authentication)
gh repo create $REPO_NAME --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo "✅ Successfully created and pushed to GitHub!"
    echo "Repository URL: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
else
    echo "❌ Failed to create repository. Please authenticate first with: gh auth login"
    echo ""
    echo "Alternatively, you can:"
    echo "1. Create a repository manually on GitHub.com"
    echo "2. Then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
    echo "   git push -u origin main"
fi
