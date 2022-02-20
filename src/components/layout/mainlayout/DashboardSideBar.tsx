import Drawer from "@material-ui/core/Drawer";
import MenuItemsList from "./MenuItemsList";
import clsx from "clsx";
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import { Divider } from '@material-ui/core';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDrawerContext } from "../contexts/drawer-context";
import { Drawer as MuiDrawer } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon }  from '@mui/icons-material/';
import { IconButton } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')((props:any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: props.theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...props.theme.mixins.toolbar,
}));

const DrawerLg = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  (props:any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(props.open && {
      ...openedMixin(props.theme),
      '& .MuiDrawer-paper': openedMixin(props.theme),
    }),
    ...(!props.open && {
      ...closedMixin(props.theme),
      '& .MuiDrawer-paper': closedMixin(props.theme),
    }),
  }),
);

const useStyles = makeStyles((theme: Theme) => ({
  drawer: { // background: "#D8DCD6",
    position: "static",
  },
  closed: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  },
  opened: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',    
  },
}));

const DashboardSideBar = () => {
  const classes = useStyles();
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <DrawerLg variant="permanent" open={!isLargeScreen && isOpened ? true : false}
      onClose={() => toggleIsOpened(!isOpened)}
    >
      <DrawerHeader>
        <IconButton onClick={() => toggleIsOpened(!isOpened)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <MenuItemsList />
    </DrawerLg>
  );  
};

export default DashboardSideBar;
