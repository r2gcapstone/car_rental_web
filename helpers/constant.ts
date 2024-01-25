import { FC } from 'react'
import {
  HomeIcon,
  AccountIcon,
  TransactionIcon,
  ActivityLogIcon,
  SubscriptionIcon,
  ProfileIcon
} from 'components'

export interface RedirectLinksTypes {
  path: string
  name: string
  icon: FC<{}>
}

export const redirectLinks: RedirectLinksTypes[] = [
  {
    path: 'dashboard',
    name: 'Home',
    icon: HomeIcon
  },
  {
    path: 'account-management',
    name: 'Account Management',
    icon: AccountIcon
  },
  {
    path: 'vehicle-management',
    name: 'Vehicle Management',
    icon: ActivityLogIcon
  },
  {
    path: 'transaction-management',
    name: 'Transaction History',
    icon: TransactionIcon
  },
  {
    path: 'subscription-management',
    name: 'Subscription Management',
    icon: SubscriptionIcon
  },
  {
    path: 'administrator-management',
    name: 'Administrator Management',
    icon: AccountIcon
  },
  {
    path: 'admin-profile',
    name: 'Admin Profile',
    icon: ProfileIcon
  }
]
