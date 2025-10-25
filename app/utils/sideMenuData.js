import {
  LayoutDashboard,
  HandCoins,
  WalletMinimal,
  LogOut,
} from 'lucide-react-native'; 

export const SIDE_MENU_DATA = [
  {
    id: '01',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: 'Dashboard',
  },
  {
    id: '02',
    label: 'Income',
    icon: WalletMinimal,
    path: 'Income',
  },
  {
    id: '03',
    label: 'Expense',
    icon: HandCoins,
    path: 'Expense',
  },
  {
    id: '04',
    label: 'Logout',
    icon: LogOut,
    path: 'Logout',
  },
];
