import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import { createStyles, darken, makeStyles, Theme, } from "@material-ui/core/styles";
import { Theme } from '@mui/material/styles';
import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

import { Link } from "react-router-dom";

import { DrawerItem } from "../ts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      "&:hover": { backgroundColor: theme.palette.primary.dark, color: theme.palette.common.white, },
      "&$selected": { backgroundColor: theme.palette.primary.light, color: theme.palette.common.white, },
    },
    selected: {}, listIcon: { paddingRight: theme.spacing(2), },
    icon: { // color: theme.palette.secondary.main,
    },
  })
);

type Props = DrawerItem & {
  selected?: boolean;
  onClick?: () => void;
};

const MenuItem: React.FC<Props> = ({ route, literal, Icon, selected, onClick, }) => {

  const classes = useStyles();
  const link = (
    <ListItem button selected={selected} onClick={onClick}
      classes={{ selected: classes.selected, button: classes.button, }} 
    >
      <ListItemIcon className={classes.listIcon}> <Icon className={classes.icon} /> </ListItemIcon>
      <ListItemText primary={literal} />
    </ListItem>
  );

  return route ? <Link to={route}>{link}</Link> : link;
};

export default MenuItem;
