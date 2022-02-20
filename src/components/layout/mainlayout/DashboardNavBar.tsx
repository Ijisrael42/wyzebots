import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useDrawerContext } from "../contexts/drawer-context";
import { Hidden, IconButton, Toolbar, AppBar as MuiAppBar, MenuItem, Typography, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AccountCircle } from "@mui/icons-material";
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

const DashboardNavBar: React.FC<any> = ( {...rest}:any )  => {

  const { isOpened, toggleIsOpened } = useDrawerContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event: any) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const logout = () => {};

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
          <h2>Header</h2>
        </Typography>

        <div>
          <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
            aria-haspopup="true" onClick={handleMenu} color="inherit" >
            <AccountCircle />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
            open={Boolean(anchorEl)} onClose={handleClose} >
            <MenuItem component={RouterLink} to="/app/profile" >Profile</MenuItem>
            <MenuItem onClick={() => logout()}>Log Out</MenuItem>
          </Menu>
        </div>
          
      </Toolbar>
    </Hidden>
    
    {/* Displays on the small screen */}
    <Hidden mdUp>
      <Toolbar >
        <IconButton aria-label="open drawer" edge="start" color="inherit" onClick={() => toggleIsOpened(!isOpened)} >          
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          <h2>Header</h2>
        </Typography>

      </Toolbar>
    </Hidden>
  </AppBar>
  /* 
    <AppBar className={classes.appBar}>
      <Toolbar>
      <IconButton color="inherit" onClick={() => toggleIsOpened(!isOpened)}  className={classes.icon} >
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Header
        </Typography>
      </Toolbar>
    </AppBar> */
  );
};

export default DashboardNavBar;
