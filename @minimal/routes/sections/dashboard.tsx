import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from '@minimal/auth/guard';
// layouts
import DashboardLayout from '@minimal/layouts/dashboard';
// components
import { LoadingScreen } from '@minimal/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('@minimal/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('@minimal/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('@minimal/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('@minimal/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('@minimal/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('@minimal/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('@minimal/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('@minimal/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('@minimal/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('@minimal/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('@minimal/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('@minimal/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('@minimal/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('@minimal/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('@minimal/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('@minimal/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('@minimal/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('@minimal/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('@minimal/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('@minimal/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('@minimal/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('@minimal/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('@minimal/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('@minimal/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('@minimal/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('@minimal/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('@minimal/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('@minimal/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('@minimal/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('@minimal/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('@minimal/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('@minimal/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('@minimal/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('@minimal/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('@minimal/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('@minimal/pages/dashboard/chat'));
const MailPage = lazy(() => import('@minimal/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('@minimal/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('@minimal/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('@minimal/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('@minimal/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
