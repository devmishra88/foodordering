import React,{useState, useContext} from 'react';
import {Link} from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, Badge, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, ListItemSecondaryAction} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SortIcon from '@material-ui/icons/Sort';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {ProductContext} from '../context/Product';
const nosh_localdata = localStorage.getItem(`nosh_localdata`) !== null ? JSON.parse(localStorage.getItem(`nosh_localdata`)):{restaurantid:'', phone:'', isagree:''};

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

  const{iscategoryloaded, hascategory, allcategories} = glbproduct;

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
    {nosh_localdata.phone !== "guest" ? (
      <Link to={`/profile`} style={{textDecoration:'none',color:'#666666'}}>
      <div style={{textAlign:'center',backgroundColor:'#00B970',color:'#ffffff',padding:'25px 0',position:'relative'}} onClick={()=>{

      }}>
        <div style={{position:'absolute',top:'5px',right:'5px'}}><CreateIcon /></div>
        <AccountCircleIcon />
        <br />
        {nosh_localdata.customer_name}
        <br />
        {nosh_localdata.phone}
      </div>
      </Link>
    ):null}
    <Divider />
    <List>
        <Link to={`/orders`} style={{textDecoration:'none',color:'#666666'}}>
          <ListItem button>
            <ListItemIcon><SortIcon /></ListItemIcon>
            <ListItemText primary={`My Orders`} />
            <ListItemSecondaryAction>
              <ArrowForwardIosIcon color="action"/>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
        <Link to={`/orderstatus`} style={{textDecoration:'none',color:'#666666'}}>
          <ListItem button>
            <ListItemIcon><SortIcon /></ListItemIcon>
            <ListItemText primary={`Order Status`} />
            <ListItemSecondaryAction>
              <ArrowForwardIosIcon color="action"/>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
    </List>
    <Divider />
      <List>
        <Link to={`/terms`} style={{textDecoration:'none',color:'#666666'}}>
          <ListItem button>
            <ListItemIcon><SortIcon /></ListItemIcon>
            <ListItemText primary={`Term Of Use`} />
            <ListItemSecondaryAction>
              <ArrowForwardIosIcon color="action"/>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon><ExitToAppOutlinedIcon color="secondary"/></ListItemIcon>
            <ListItemText color="secondary" primary={`Logout`} />
            <ArrowForwardIosIcon color="action"/>
          </ListItem>
      </List>
      <Divider />
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
