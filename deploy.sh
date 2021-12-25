#!/usr/bin/env sh

# abort on errors
set -e
# install dependencies
npm install
# build static files
npm run build
# navigate into the build output directory
cd build
# create a fresh new git repo in the output directory
git init
git add -A
git commit -m 'deploy'
git branch -m main
# Force push to the "publishing source" of your GitHub pages site
# in this case, the gh-pages branch
git push -f git@github.com:laurenzfg/notenstreicher.git main:gh_pages
rm -rf ./.git

# Back to previous directory (the root of your repo)
cd -