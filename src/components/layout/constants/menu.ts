import { DrawerItem } from '../ts';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export const DRAWER_LIST: DrawerItem[] = [
  { route: "/wyzebot", literal: 'WyzeBot', Icon: DashboardIcon, },
  { route: "/orders", literal: 'Orders', Icon: ShoppingCartIcon, },
  { route: "/customers", literal: 'Customers', Icon: PeopleIcon, },
  { route: "/inventory", literal: 'Inventory', Icon: AttachMoneyIcon, },
];
