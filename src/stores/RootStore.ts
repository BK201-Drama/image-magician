import { ImageStore } from './ImageStore';

/**
 * 根 Store
 * 聚合所有子 Store
 */
export class RootStore {
  imageStore: ImageStore;

  constructor() {
    this.imageStore = new ImageStore();
  }
}

// 创建单例
export const rootStore = new RootStore();

