#!/usr/bin/env sh
set -e

cd ../
sleep 1
pwd

current_branch=$(git branch | grep "*" | cut -d ' ' -f2)

echo "current branch:" $current_branch
echo "pulling branch:" $current_branch

git pull origin $current_branch

npx mpx-cli-service build

echo "($current_branch) build success"
