import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import { useDrawerContext } from "../contexts/drawer-context";
import { Theme } from '@mui/material/styles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {},
  icon: { padding: theme.spacing(1), },
  title: { margin: "auto", },
}));

const Header = () => {
  const classes = useStyles();
  const { isOpened, toggleIsOpened } = useDrawerContext();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
      <IconButton color="inherit" onClick={() => toggleIsOpened(!isOpened)}  className={classes.icon} >
          {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
