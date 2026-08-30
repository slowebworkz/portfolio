import { StrictMode } from 'react';
import { RouterProvider } from 'react-router/dom';

import { mountApp } from './mount.ts';
import { router } from './router.tsx';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container #root not found');
}

mountApp(
  container,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
