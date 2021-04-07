import {lazy} from 'react';

export const publicRoutes = [
  {Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')), path: '/'},
  {
    Component: lazy(() => import('../components/SignUp/sign-up-client.component')),
    path: '/sign-up/client/',
  },
  {
    Component: lazy(() => import('../components/SignUp/sign-up-employee.component')),
    path: '/sign-up/employee/',
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/employee/docket/:id',
    Component: lazy(() => import('components/Docket/Docket')),
  },
  {
    path: '/employee/return-docket/:id',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
  },
];