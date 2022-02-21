import { DrawerItem } from '../ts';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';

export const DRAWER_LIST: DrawerItem[] = [
  { route: "/wyzebots", literal: 'WyzeBots', Icon: DashboardIcon, },
  { route: "/squads", literal: 'Squads', Icon: GroupIcon, },
  { route: "/orders", literal: 'Orders', Icon: ShoppingCartIcon, },
  { route: "/customers", literal: 'Customers', Icon: PeopleIcon, },
  { route: "/inventory", literal: 'Inventory', Icon: AttachMoneyIcon, },
];
