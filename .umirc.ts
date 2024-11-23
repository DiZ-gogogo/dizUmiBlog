import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Diz Coder Space',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Curriculum Vitae',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],

  npmClient: 'pnpm',
  apiRoute: {
    platform: 'vercel',
  },
  tailwindcss: {},
});
