import { Outlet, useLocation } from 'react-router-dom';
import { t } from '../../i18n';

/**
 * 更多功能页面
 * 支持二级路由，使用 Outlet 渲染子路由
 */
const MorePage = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/more';

  return (
    <div className="space-y-6">
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t('morePage.title' as any)}
        </h2>
        <p className="text-gray-600">{t('morePage.subtitle' as any)}</p>
      </div>

      {/* 示例：二级路由导航（可选） */}
      {/* 
      <div className="flex justify-center gap-4 mb-6">
        <Link 
          to="/more/feature1"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          功能 1
        </Link>
        <Link 
          to="/more/feature2"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          功能 2
        </Link>
      </div>
      */}

      {/* 子路由渲染位置 */}
      {!isRootPath && (
        <div className="mt-6">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MorePage;

