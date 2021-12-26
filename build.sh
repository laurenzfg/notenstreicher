#!/usr/bin/env sh

# The GitHub Action in .github/workflows/main.yml does this in the cloud + deploys to gh_pages branch --> sent to GH pages

# abort on errors
set -e
# install dependencies
npm install
# build static files
npm run build
