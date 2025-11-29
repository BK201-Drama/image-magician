#!/bin/bash
set -e

# Cloudflare Pages 部署脚本
# 部署构建产物到 Cloudflare Pages

echo "开始部署到 Cloudflare Pages..."

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
    echo "错误: dist 目录不存在，请先运行构建命令"
    exit 1
fi

# 使用 wrangler pages deploy 部署到 Cloudflare Pages
# 注意：需要先设置 CLOUDFLARE_API_TOKEN 环境变量
npx wrangler pages deploy dist --project-name=image-magician --compatibility-date=2025-11-26

echo "部署完成！"

