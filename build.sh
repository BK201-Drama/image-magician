#!/bin/bash
# Cloudflare Pages 构建脚本
# 确保使用 Yarn Classic (1.x)

# 如果检测到 Yarn 4.x，降级到 Yarn Classic
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    if [[ "$YARN_VERSION" == 4.* ]] || [[ "$YARN_VERSION" == 3.* ]]; then
        echo "检测到 Yarn $YARN_VERSION，切换到 Yarn Classic..."
        npm install -g yarn@1.22.22
    fi
fi

# 安装依赖
yarn install --frozen-lockfile

# 构建项目
yarn build

