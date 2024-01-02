import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from '@minimal/auth/guard';
// layouts
import CompactLayout from '@minimal/layouts/compact';
import AuthClassicLayout from '@minimal/layouts/auth/classic';
// components
import { SplashScreen } from '@minimal/components/loading-screen';

// ----------------------------------------------------------------------

// AMPLIFY
const AmplifyLoginPage = lazy(() => import('@minimal/pages/auth/amplify/login'));
const AmplifyRegisterPage = lazy(() => import('@minimal/pages/auth/amplify/register'));
const AmplifyVerifyPage = lazy(() => import('@minimal/pages/auth/amplify/verify'));
const AmplifyNewPasswordPage = lazy(() => import('@minimal/pages/auth/amplify/new-password'));
const AmplifyForgotPasswordPage = lazy(() => import('@minimal/pages/auth/amplify/forgot-password'));

// JWT
const JwtLoginPage = lazy(() => import('@minimal/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('@minimal/pages/auth/jwt/register'));

// FIREBASE
const FirebaseLoginPage = lazy(() => import('@minimal/pages/auth/firebase/login'));
const FirebaseRegisterPage = lazy(() => import('@minimal/pages/auth/firebase/register'));
const FirebaseVerifyPage = lazy(() => import('@minimal/pages/auth/firebase/verify'));
const FirebaseForgotPasswordPage = lazy(() => import('@minimal/pages/auth/firebase/forgot-password'));

// AUTH0
const Auth0LoginPage = lazy(() => import('@minimal/pages/auth/auth0/login'));
const Auth0Callback = lazy(() => import('@minimal/pages/auth/auth0/callback'));

// ----------------------------------------------------------------------

const authAmplify = {
  path: 'amplify',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <AmplifyLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <AmplifyRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <AmplifyVerifyPage /> },
        { path: 'new-password', element: <AmplifyNewPasswordPage /> },
        { path: 'forgot-password', element: <AmplifyForgotPasswordPage /> },
      ],
    },
  ],
};

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

const authFirebase = {
  path: 'firebase',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <FirebaseLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <FirebaseRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <FirebaseVerifyPage /> },
        { path: 'forgot-password', element: <FirebaseForgotPasswordPage /> },
      ],
    },
  ],
};

const authAuth0 = {
  path: 'auth0',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <Auth0LoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'callback',
      element: <Auth0Callback />,
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authAmplify, authJwt, authFirebase, authAuth0],
  },
];
