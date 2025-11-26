// 上传的图片类型定义
export interface UploadedImage {
  file: File;
  preview: string; // base64预览URL
  base64: string; // 完整的base64编码
}

// 生成组件的配置类型
export interface GeneratedComponentConfig {
  beforeImage: string; // base64
  afterImage: string; // base64
}

