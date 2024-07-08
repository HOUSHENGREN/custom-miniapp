#!/usr/bin/env sh
set -e

# use master as default
git checkout master
# git reset --hard
git pull origin master

# 更通用的写法

if [ -z "$1" ];
then
VERSION=`npx select-version-cli` # get version from prompt
else

# 参考 https://cloud.tencent.com/developer/ask/sof/303445

# VERSION=`echo %npm_package_version% --silent` # 1. 经过验证，这个写法是不可以的
# VERSION=`0.1.4` # 2. 直接写死，不需要 --silent
# VERSION=$(node -e "(function () { console.log(require('../package.json').version) })()") # 3. 使用 node 脚本，这个通用
VERSION=$(node -p -e "require('./package.json').version") # 4. 使用 node 脚本，这个通用且相对简单
echo "Override version with 'v$VERSION'."
fi

# echo "Releasing zdz00 $VERSION ..."

read -p "Please enter release description: " DESCRIPTION

# build
npm run build

# upload
version=$VERSION desc=$DESCRIPTION npm run upload

# bump version
echo "Releasing $VERSION ..."

npm version $VERSION --message "refactor: 版本 v$VERSION 发布" --allow-same-version

# push
git push origin master && git push origin -f --tags
