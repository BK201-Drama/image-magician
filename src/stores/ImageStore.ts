import { makeAutoObservable } from 'mobx';

/**
 * 图片 Store
 * 管理可变图像生成器的图片状态
 */
export class ImageStore {
  // 点开前的图片
  beforeImage: { file: File; preview: string; base64: string } | null = null;
  
  // 点开后的图片
  afterImage: { file: File; preview: string; base64: string } | null = null;
  
  // 生成的混合图片
  blendedImage: string | null = null;
  
  // 是否正在生成
  isGenerating = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 设置点开前的图片
   */
  setBeforeImage(image: { file: File; preview: string; base64: string } | null) {
    this.beforeImage = image;
  }

  /**
   * 设置点开后的图片
   */
  setAfterImage(image: { file: File; preview: string; base64: string } | null) {
    this.afterImage = image;
  }

  /**
   * 设置混合图片
   */
  setBlendedImage(image: string | null) {
    this.blendedImage = image;
  }

  /**
   * 设置生成状态
   */
  setIsGenerating(isGenerating: boolean) {
    this.isGenerating = isGenerating;
  }

  /**
   * 清空所有图片
   */
  clearAll() {
    this.beforeImage = null;
    this.afterImage = null;
    this.blendedImage = null;
    this.isGenerating = false;
  }

  /**
   * 检查是否有两张图片
   */
  get hasImages() {
    return this.beforeImage !== null && this.afterImage !== null;
  }
}

