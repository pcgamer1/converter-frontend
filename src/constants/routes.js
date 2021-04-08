import {lazy} from 'react';

// export const publicRoutes = [
//   {Component: lazy(() => import('../components/LandingPage')), path: '/'},
// ];

export const innerRoutes = [
  {
    Component: lazy(() => import('../components/404.js/404.screen')),
    path: '/convert',
    name: 'Convert'
  },
  {
    Component: lazy(() => import('../components/404.js/404.screen')),
    path: '/past',
    name: 'Past Conversions'
  },
  {
    Component: lazy(() => import('../components/About')),
    path: '/about',
    name: 'About'
  },
]