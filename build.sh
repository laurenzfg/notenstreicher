#!/usr/bin/env sh

# The GitHub Action in .github/workflows/main.yml does this in the cloud + deploys to gh_pages branch --> sent to GH pages

# If you run this scirpt after changes to the GoKernel, you may simply use 'npm start' / 'npm build'

# abort on errors
set -e
# install dependencies
npm install

# Compile Go + copy appropriate WASM loader over
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" public/
cd GoKernel
GOOS=js GOARCH=wasm go build -o ../public/main.wasm
cd -

# build static files
npm run build