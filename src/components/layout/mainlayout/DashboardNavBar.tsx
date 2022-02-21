import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useDrawerContext } from "../contexts/drawer-context";
import { Hidden, IconButton, Toolbar, AppBar as MuiAppBar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop:any) => prop !== 'open',
})((props:any) => ({
  zIndex: props.theme.zIndex.drawer + 1,
  transition: props.theme.transitions.create(['width', 'margin'], {
    easing: props.theme.transitions.easing.sharp,
    duration: props.theme.transitions.duration.leavingScreen,
  }),
  ...(props.open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: props.theme.transitions.create(['width', 'margin'], {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DashboardNavBar: React.FC<any> = ( { bannerName,...rest}:any )  => {

  const { isOpened, toggleIsOpened } = useDrawerContext();

  return (
    <AppBar position="fixed" open={isOpened} elevation={0} {...rest} >
    {/* Displays on the big screen */}

    <Hidden smDown>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={() => toggleIsOpened(!isOpened)} edge="start"
          sx={{ marginRight: '36px', ...(isOpened && { display: 'none' }), }} >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <h2>{ bannerName ? bannerName : "Header" }</h2>
        </Typography>          
      </Toolbar>
    </Hidden>
    
    {/* Displays on the small screen */}
    <Hidden mdUp>
      <Toolbar >
        <IconButton aria-label="open drawer" edge="start" color="inherit" onClick={() => toggleIsOpened(!isOpened)} >          
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <h2>{ bannerName ? bannerName : "Header" }</h2>
        </Typography>

      </Toolbar>
    </Hidden>
  </AppBar>
  );
};

export default DashboardNavBar;
