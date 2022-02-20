import { Hidden, IconButton, Toolbar, AppBar as MuiAppBar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

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

const BackBtnNavBar: React.FC<any> = ( {...rest}:any )  => {

  let navigate = useNavigate();
  
  return (
    <AppBar position="fixed" elevation={0} {...rest} >

      <Hidden smDown>
        <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate(-1)}
              edge="start"
              sx={{marginRight: '36px'}}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <h2>Header</h2>
            </Typography>

        </Toolbar>
      </Hidden>
      
      {/* Displays on the small screen */}
      <Hidden mdUp>
        <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => navigate(-1)}
              edge="start"
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <h2>Header</h2>
            </Typography>

        </Toolbar>
      </Hidden>
    </AppBar>
  );
};

export default BackBtnNavBar;