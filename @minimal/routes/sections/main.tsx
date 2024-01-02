import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from '@minimal/layouts/main';
import SimpleLayout from '@minimal/layouts/simple';
import CompactLayout from '@minimal/layouts/compact';
// components
import { SplashScreen } from '@minimal/components/loading-screen';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('@minimal/pages/home'));
const Page500 = lazy(() => import('@minimal/pages/500'));
const Page403 = lazy(() => import('@minimal/pages/403'));
const Page404 = lazy(() => import('@minimal/pages/404'));
const FaqsPage = lazy(() => import('@minimal/pages/faqs'));
const AboutPage = lazy(() => import('@minimal/pages/about-us'));
const ContactPage = lazy(() => import('@minimal/pages/contact-us'));
const PricingPage = lazy(() => import('@minimal/pages/pricing'));
const PaymentPage = lazy(() => import('@minimal/pages/payment'));
const ComingSoonPage = lazy(() => import('@minimal/pages/coming-soon'));
const MaintenancePage = lazy(() => import('@minimal/pages/maintenance'));
// PRODUCT
const ProductListPage = lazy(() => import('@minimal/pages/product/list'));
const ProductDetailsPage = lazy(() => import('@minimal/pages/product/details'));
const ProductCheckoutPage = lazy(() => import('@minimal/pages/product/checkout'));
// BLOG
const PostListPage = lazy(() => import('@minimal/pages/post/list'));
const PostDetailsPage = lazy(() => import('@minimal/pages/post/details'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: 'about-us', element: <AboutPage /> },
      { path: 'contact-us', element: <ContactPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'checkout', element: <ProductCheckoutPage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <PostListPage />, index: true },
          { path: 'list', element: <PostListPage /> },
          { path: ':title', element: <PostDetailsPage /> },
        ],
      },
    ],
  },
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    ),
    children: [
      { path: 'pricing', element: <PricingPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
