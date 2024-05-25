#!/usr/bin/env sh
set -e

# use master as default
git checkout master
# git reset --hard
git pull origin master

if [ -z "$1" ];
then
VERSION=`npx select-version-cli` # get version from prompt
else
VERSION=`npm run get:version:mac --silent` # get current version from package.json
echo "Override version with 'v$VERSION'."
fi

read -p "Please enter release description: " DESCRIPTION

echo "Releasing $VERSION ..."

# build
npm run build

# upload
version=$VERSION desc=$DESCRIPTION npm run upload

# bump version
echo "Releasing $VERSION ..."

npm version $VERSION --message "refactor: 版本 v$VERSION 发布" --allow-same-version

# push
git push origin master && git push origin -f --tags
