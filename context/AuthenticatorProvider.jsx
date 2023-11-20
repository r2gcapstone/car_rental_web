import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const AuthenticatorProvider = ({ children }) => {
  const router = useRouter();
  const userCred = getCookie('ADMIN_TOKEN');
  const userData = userCred && JSON.parse(userCred);

  const adminPathname = [
    '/admin/dashboard',
    '/admin/account-management',
    '/admin/transaction-history',
    '/admin/activity-log',
    '/admin/subscription-management',
    '/admin/admin-profile',
  ];
  const protectedRouters = adminPathname.includes(router.pathname);

  useEffect(() => {
    if (!userData?.token && protectedRouters) {
      router.push('/sign-in');
      return;
    }

    if (!!userData?.token && router.pathname === '/sign-in') {
      router.replace('/admin/dashboard');
      return;
    }
  }, [router, userData]);

  return <>{children}</>;
};

export default AuthenticatorProvider;
