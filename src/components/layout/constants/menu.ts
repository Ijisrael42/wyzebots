import { DrawerItem } from '../ts';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

export const DRAWER_LIST: DrawerItem[] = [
  { route: "/wyzebots", literal: 'WyzeBots', Icon: DashboardIcon, },
  { route: "/squads", literal: 'Squads', Icon: GroupIcon, },
  { route: "/tribes", literal: 'Tribes', Icon: GroupWorkIcon, },
];
