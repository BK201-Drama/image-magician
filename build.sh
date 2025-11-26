#!/bin/bash
set -e

# Cloudflare Pages 构建脚本
# 确保使用 Yarn Classic (1.x)

echo "开始构建..."

# 如果检测到 Yarn 4.x，降级到 Yarn Classic
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version 2>/dev/null || echo "0.0.0")
    echo "当前 Yarn 版本: $YARN_VERSION"
    
    if [[ "$YARN_VERSION" == 4.* ]] || [[ "$YARN_VERSION" == 3.* ]]; then
        echo "检测到 Yarn $YARN_VERSION，切换到 Yarn Classic..."
        npm install -g yarn@1.22.22
        # 清除 Yarn 4.x 的缓存
        rm -rf .yarn .pnp.* yarn.lock 2>/dev/null || true
    fi
fi

# 安装依赖
echo "安装依赖..."
yarn install --frozen-lockfile --network-timeout 100000

# 构建项目
echo "构建项目..."
yarn build

echo "构建完成！"

