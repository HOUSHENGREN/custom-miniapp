#!/usr/bin/env sh
set -e

cd ../

# use master as default
git checkout master

# stash local changes
STASH_RESULT=`git stash`

if [ "No local changes to save" != "$STASH_RESULT" ]; then
  echo "Notice: please run 'git stash pop' to restore your changes after archive."
fi

git pull origin master

VERSION=`npx select-version-cli` # get version from prompt

RECOMMEND_DATE=`date +'%Y%m%d'`

read -p "Use $RECOMMEND_DATE as archive date? [Y/N]" SHOULD_USE_RECOMMEND_DATE

if [ "N" == "$SHOULD_USE_RECOMMEND_DATE" ]; then
  read -p "Please enter an archive date likes '$RECOMMEND_DATE' format: " ARCHIVE_DATE
elif [ "Y" == "$SHOULD_USE_RECOMMEND_DATE" ]; then
  ARCHIVE_DATE=$RECOMMEND_DATE
else
  echo "Invalid input, exit."
  exit 1
fi

# update package.json if exists
if [ -f ./package.json ]; then
  echo "Update package.json"
  sed -i "s|\"version\": \".*\"|\"version\": \"$VERSION\"|" ./package.json
  git add ./package.json
fi

git commit -m "refactor: 版本 v$VERSION 发布"

TAG_NAME="tag-$ARCHIVE_DATE-v$VERSION"

echo "Archive $TAG_NAME"

# create tag
git tag -a $TAG_NAME -m "归档"

# push
git push origin master && git push origin -f --tags
