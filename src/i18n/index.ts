import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh.json';
import en from './locales/en.json';
import ru from './locales/ru.json';
import fr from './locales/fr.json';

// 语言持久化的 key
const LANGUAGE_KEY = 'image-magician-language';

// 从 localStorage 获取保存的语言，如果没有则使用默认语言（英文优先）
const getSavedLanguage = (): string => {
  try {
    return localStorage.getItem(LANGUAGE_KEY) || 'en';
  } catch {
    return 'en';
  }
};

// 保存语言到 localStorage
const saveLanguage = (lang: string): void => {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    console.warn('Failed to save language preference');
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ru: { translation: ru },
      fr: { translation: fr },
    },
    lng: getSavedLanguage(), // 使用保存的语言
    fallbackLng: 'en', // 英文优先作为后备语言
    keySeparator: false, // 禁用嵌套，key就是字面值
    interpolation: {
      escapeValue: false,
    },
  });

// 导出翻译函数，可直接使用
export const t = (key: string) => i18n.t(key);

// 导出语言切换函数
export const changeLanguage = (lang: string) => {
  saveLanguage(lang); // 保存语言偏好
  i18n.changeLanguage(lang);
};

// 导出获取当前语言函数
export const getCurrentLanguage = () => i18n.language;

export default i18n;

