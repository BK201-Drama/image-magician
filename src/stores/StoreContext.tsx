import { createContext, useContext } from 'react';
import { RootStore, rootStore } from './RootStore';

/**
 * Store Context
 */
const StoreContext = createContext<RootStore>(rootStore);

/**
 * Store Provider
 */
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

/**
 * 使用 Store 的 Hook
 */
export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
};

/**
 * 使用 ImageStore 的 Hook
 */
export const useImageStore = () => {
  const { imageStore } = useStore();
  return imageStore;
};

