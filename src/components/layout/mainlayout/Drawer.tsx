import Drawer from "@material-ui/core/Drawer";
import MenuItemsList from "./MenuItemsList";
import clsx from "clsx";
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@mui/material/styles';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { styled, useTheme } from "@material-ui/core/styles";
import { useDrawerContext } from "../contexts/drawer-context";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon }  from '@mui/icons-material/';
import { IconButton } from '@mui/material';

const drawerWidth = 240;

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

const DrawerHeader = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: props.theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...props.theme.mixins.toolbar,
}));

const CustomDrawer = () => {
  const classes = useStyles();
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Drawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={!isLargeScreen && isOpened ? true : false}
      onClose={() => toggleIsOpened(!isOpened)}
      classes={{ paper: clsx(classes.drawer, { [classes.closed]: !isOpened, [classes.opened]: isOpened, }),
      }}
    >
      { isLargeScreen && (
        <DrawerHeader>
          <IconButton onClick={() => toggleIsOpened(!isOpened)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>        
      )}

      <MenuItemsList />
    </Drawer>
  );
};

export default CustomDrawer;
