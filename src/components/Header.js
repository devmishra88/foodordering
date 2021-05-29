import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { MenuItem, Badge } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor:'#00B970'
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Menu
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
		  <MenuItem>
			<IconButton aria-label="show 5 new notifications" color="inherit">
			  <Badge badgeContent={5} color="secondary">
				<ShoppingCartIcon />
			  </Badge>
			</IconButton>
		  </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
