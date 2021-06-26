import React,{useState, useContext} from 'react';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, Badge, AppBar, Toolbar, Typography, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText, Drawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';

import {ProductContext} from '../context/Product';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(1.5),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor:'#00B970'
  },
}));

export default function Header(props) {

  const glbproduct = useContext(ProductContext);

  const classes = useStyles();

  const [isopen, setMobileOpen] = useState(false);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMobileOpen(!isopen);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['My orders', 'My Profile', 'Track Order'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
      {
        props.showdrawer ? (
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ):(
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={()=>{props.history.goBack()}}>
            <ArrowBackIcon />
          </IconButton>              
        )
      }
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
          <MenuItem>
            <Link to="/cartdetail" style={{textDecoration:'none',color:'#ffffff'}}>
              <IconButton aria-label={`show ${glbproduct.cartTotalItem} new items`} color="inherit">
                <Badge badgeContent={glbproduct.cartTotalItem} color="secondary">
                <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
        {
          props.showsearch ? (
            <Link to="/searchresult" style={{textDecoration:'none',color:'#ffffff'}}>
              <IconButton aria-label="search" color="inherit" edge="end">
                <SearchIcon />
              </IconButton>
            </Link>
          ):null
        }
          </MenuItem>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isopen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

    </div>
  );
}
