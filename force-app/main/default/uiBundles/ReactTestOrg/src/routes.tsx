import type { RouteObject } from 'react-router';
import AppLayout from '@/appLayout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Case from './pages/Case';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { showInNavigation: true, label: 'Home' },
      },
      {
        path: 'contact',
        element: <Contact />,
        handle: { showInNavigation: true, label: 'Contacts' },
      },
      {
        path: 'case',
        element: <Case />,
        handle: { showInNavigation: true, label: 'Case' },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
