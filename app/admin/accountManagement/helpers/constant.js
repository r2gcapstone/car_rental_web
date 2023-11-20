import { MenuTypes } from 'services/zustandVariables'
import { UserDataTypes } from 'services/zustandVariables'

export interface AccountTableTypes extends UserDataTypes {
  action?: string
}

interface statisticsMenuTypes {
  key: MenuTypes
  content: string
}

export const statisticsMenu: statisticsMenuTypes[] = [
  {
    key: 'today',
    content: 'Number of New Registered Users (Today)'
  },
  {
    key: 'per-day',
    content: 'Average Number of New Registered Users (Per Day)'
  },
  {
    key: 'monthly',
    content: 'Average Number of New Registered Users (Monthly)'
  },
  {
    key: 'all-time',
    content: 'Total Registered Users (All Time)'
  },
  {
    key: 'show-all',
    content: 'Show All'
  }
]
