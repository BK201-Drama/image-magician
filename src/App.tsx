import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import frFR from 'antd/locale/fr_FR';
import { getCurrentLanguage } from './i18n';
import { t } from './i18n';
import Navigation from './components/Navigation';
import { routes, type RouteConfig } from './router';
import { StoreProvider } from './stores';

/**
 * 从路由配置递归生成 Route 元素
 */
function renderRoutes(routeConfigs: RouteConfig[]): JSX.Element[] {
  return routeConfigs.map((route, index) => {
    const Component = route.component;
    
    // 如果路径是 '/'，使用 index route
    if (route.path === '/') {
      return (
        <Route
          key="index"
          index
          element={<Component />}
        />
      );
    }
    
    // 有子路由的情况
    if (route.children && route.children.length > 0) {
      return (
        <Route
          key={route.path || index}
          path={route.path}
          element={<Component />}
        >
          {renderRoutes(route.children)}
        </Route>
      );
    }
    
    // 普通路由
    return (
      <Route
        key={route.path || index}
        path={route.path}
        element={<Component />}
      />
    );
  });
}

/**
 * 图片魔术师主应用
 * 负责全局配置和路由管理
 */
function App() {
  const currentLang = getCurrentLanguage();
  const antdLocale = 
    currentLang === 'zh' ? zhCN :
    currentLang === 'ru' ? ruRU :
    currentLang === 'fr' ? frFR :
    enUS;

  return (
    <StoreProvider>
      <ConfigProvider locale={antdLocale}>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-gray-50">
            {/* 导航栏 - 固定在路由外层，永不卸载 */}
            <Navigation />
            
            {/* 主内容区 - flex-1 填充剩余空间 */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
              <Suspense>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
              </Suspense>
            </main>

            {/* 页脚 */}
            <footer className="py-6 bg-white border-t">
              <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                <p>{t('footer.text' as any)}</p>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </StoreProvider>
  );
}

export default App;
