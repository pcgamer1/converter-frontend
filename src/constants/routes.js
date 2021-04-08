import {lazy} from 'react';
import {
  SyncOutlined,
  HistoryOutlined,
  SmileOutlined
} from '@ant-design/icons';
 

// export const publicRoutes = [
//   {Component: lazy(() => import('../components/LandingPage')), path: '/'},
// ];

export const innerRoutes = [
  {
    Component: lazy(() => import('../components/Convert')),
    path: '/convert',
    name: 'Convert',
    icon: <SyncOutlined/>
  },
  {
    Component: lazy(() => import('../components/404.js/404.screen')),
    path: '/past',
    name: 'Past Conversions',
    icon: <HistoryOutlined />
  },
  {
    Component: lazy(() => import('../components/404.js/404.screen')),
    path: '/about',
    name: 'About',
    icon: <SmileOutlined />
  },
]