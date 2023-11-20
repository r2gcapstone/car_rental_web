import React from 'react';
import {
  HomeIcon,
  AccountIcon,
  TransactionIcon,
  ActivityLogIcon,
  SubscriptionIcon,
  ProfileIcon,
} from '../components';

export const redirectLinks = [
  {
    path: 'dashboard',
    name: 'Home',
    icon: HomeIcon,
  },
  {
    path: 'account-management',
    name: 'Account Management',
    icon: AccountIcon,
  },
  {
    path: 'transaction-history',
    name: 'Transaction History',
    icon: TransactionIcon,
  },
  {
    path: 'activity-log',
    name: 'Activity Log for Vehicles',
    icon: ActivityLogIcon,
  },
  {
    path: 'subscription-management',
    name: 'Subscription Management',
    icon: SubscriptionIcon,
  },
  {
    path: 'admin_profile',
    name: 'Admin Profile',
    icon: ProfileIcon,
  },
];
