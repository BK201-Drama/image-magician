import { lazy } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PictureOutlined, ToolOutlined } from '@ant-design/icons';

// 路由配置类型
export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  children?: RouteConfig[];
  // 路由元信息
  meta?: {
    title?: string; // 页面标题
    icon?: ReactNode; // 菜单图标
    hideInMenu?: boolean; // 是否在菜单中隐藏
    disabled?: boolean; // 是否禁用
    requireAuth?: boolean; // 是否需要认证
    [key: string]: any;
  };
}

// 懒加载页面组件
const MagicianPage = lazy(() => import('../pages/magician'));
const MorePage = lazy(() => import('../pages/more'));
const Feature1 = lazy(() => import('../pages/more/feature1'));
const Feature2 = lazy(() => import('../pages/more/feature2'));

// 路由配置数组
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: MagicianPage,
    meta: {
      title: 'nav.magician',
      icon: <PictureOutlined />,
    },
  },
  {
    path: 'magician',
    component: () => <Navigate to="/" replace />,
    meta: {
      hideInMenu: true, // 重定向路由不在菜单中显示
    },
  },
  {
    path: 'more',
    component: MorePage,
    meta: {
      title: 'nav.more',
      icon: <ToolOutlined />,
      disabled: true, // 禁用菜单
    },
    // 二级路由配置
    children: [
      {
        path: 'feature1',
        component: Feature1,
        meta: {
          title: 'nav.feature1',
          hideInMenu: false, // 显示在菜单中
        },
      },
      {
        path: 'feature2',
        component: Feature2,
        meta: {
          title: 'nav.feature2',
          hideInMenu: false, // 显示在菜单中
        },
      },
    ],
  },
  {
    path: '*',
    component: () => <Navigate to="/" replace />,
    meta: {
      hideInMenu: true, // 404 路由不在菜单中显示
    },
  },
];

/**
 * 从路由配置生成菜单项
 */
export const generateMenuFromRoutes = (routes: RouteConfig[]): any[] => {
  return routes
    .filter((route) => !route.meta?.hideInMenu)
    .map((route) => {
      const menuItem: any = {
        key: route.path === '/' ? '/' : `/${route.path}`,
        icon: route.meta?.icon,
        label: route.meta?.title,
        disabled: route.meta?.disabled,
      };

      // 递归处理子菜单
      if (route.children?.length) {
        const children = generateMenuFromRoutes(route.children);
        if (children.length) {
          menuItem.children = children.map(child => ({
            ...child,
            key: `${menuItem.key}/${child.key.replace(/^\//, '')}`,
          }));
        }
      }

      return menuItem;
    });
};

