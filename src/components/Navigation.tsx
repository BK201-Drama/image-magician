import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Select } from 'antd';
import type { MenuProps } from 'antd';
import { PictureOutlined, GlobalOutlined } from '@ant-design/icons';
import { t, changeLanguage, getCurrentLanguage } from '../i18n';
import { generateMenuFromRoutes, routes } from '../router';

// 语言选项配置
const languageOptions = [
  { value: 'zh', label: '🇨🇳 中文' },
  { value: 'en', label: '🇺🇸 English' },
  { value: 'ru', label: '🇷🇺 Русский' },
];

/**
 * 导航栏组件
 */
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 生成并翻译菜单项
  const menuItems: MenuProps['items'] = useMemo(() => {
    const translateItem = (item: any): any => ({
      ...item,
      label: item.label ? t(item.label) : item.label,
      children: item.children?.map(translateItem),
    });
    
    return generateMenuFromRoutes(routes).map(translateItem);
  }, []);

  // 当前选中的菜单项
  const selectedKeys = useMemo(() => 
    [location.pathname.startsWith('/more') ? '/more' : location.pathname || '/'],
    [location.pathname]
  );

  const handleMenuClick: MenuProps['onClick'] = (e) => navigate(e.key);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* 左侧：Logo + 标题 + 菜单 */}
          <div className="flex items-center flex-1 min-w-0 gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <PictureOutlined className="text-xl md:text-2xl text-blue-600" />
              <h1 className="text-base md:text-xl font-bold text-gray-800 whitespace-nowrap">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex-1 min-w-0">
              <Menu
                onClick={handleMenuClick}
                selectedKeys={selectedKeys}
                mode="horizontal"
                items={menuItems}
                className="border-0"
                style={{ 
                  lineHeight: '64px',
                  flex: 1,
                  minWidth: 0
                }}
                overflowedIndicator={null}
              />
            </div>
          </div>
          
          {/* 右侧：语言切换 */}
          <div className="flex items-center flex-shrink-0">
            <Select
              value={getCurrentLanguage()}
              onChange={handleLanguageChange}
              style={{ 
                minWidth: 140,
                width: 'auto'
              }}
              suffixIcon={<GlobalOutlined />}
              options={languageOptions}
              className="language-selector"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

