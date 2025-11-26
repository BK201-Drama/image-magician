/**
 * Pages 统一导出
 * 
 * 目录结构说明：
 * - magician/     可变图像生成器功能模块
 * - more/         实验性功能模块
 * 
 * 未来可扩展的模块示例：
 * - image-tools/  图片工具集（裁剪、滤镜、压缩等）
 * - templates/    模板功能
 * - gallery/      图库功能
 */

// 主要功能模块
export { default as MagicianPage } from './magician';

// 实验性功能模块
export { default as MorePage } from './more';
export { default as Feature1 } from './more/feature1';
export { default as Feature2 } from './more/feature2';

