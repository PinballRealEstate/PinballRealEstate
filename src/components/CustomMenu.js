import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Logout } from '@mui/icons-material';
import { getProfileByID, getUser, logout } from '../services/supabase-utils';
import { useHistory } from 'react-router-dom';
import './CustomMenu.css';

const drawerWidth = 245;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function CustomMenu({ setUser }) {
  const { push } = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  //tracking state to customize user toolbar
  const [currentUser, setCurrentUser] = useState({
    username: '',
    avatar: ''
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 // function to logout singular user
  async function logOutHandler() {
    await logout();
    setUser('');
  }
  // function to push user to profile page
  function handleProfile(){
    push('/profile');
    setOpen(false);
  }
  // function to push user to about team page
  function handleAbout(){
    push('/about');
    setOpen(false);
  }
  // function to return user to home page
  function handleHome(){
    push('/');
    setOpen(false);
  }
  //used to get userprofile information to display on menu
  useEffect(() => {
    async function getCurrentUser(){
      const userSession = await getUser();
      const currentUser = await getProfileByID(userSession.id);
      setCurrentUser(currentUser);
    }
    getCurrentUser();
  }, []);

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar sx={{ background: '#40798c', height: '80px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: '#1f363d', fontSize: '3rem', position: 'absolute', top: '10px' }}/>
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: 'flex' }}>
            <h1 className='welcome'>Welcome, {currentUser.username}</h1>
            <h1 className='favicon'>PINBALL REAL ESTATE<img src={process.env.PUBLIC_URL + '/Logo.png'} /></h1>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ background: '#cfe0c3', display: 'flex', justifyContent: 'space-between' }}>
          <Avatar alt={currentUser.username} src={currentUser.avatar} sx={{ margin: '0px 10px 0px 5px' }}/> {`${currentUser.username}'s Profile`}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ background: '#1f363d', height: '2px' }} />
        <List sx={{ background: '#cfe0c3' }}>
          {['Home', 'Saved Homes', 'Meet the Team', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ color: '#1f363d' }}>
              <ListItemButton onClick={index === 0 && handleHome 
            || index === 1 && handleProfile
            || index === 2 && handleAbout
            || index === 3 && logOutHandler}>
                <ListItemIcon sx={{ color: '#284750' }} >
                  {index === 0 && <HomeIcon fontSize='large'/> 
                  || index === 1 && <FavoriteBorderIcon fontSize='large'/> 
                  || index === 2 && <PeopleIcon fontSize='large'/>
                  || index === 3 && <Logout fontSize='large' />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List sx={{ background: '#cfe0c3', height: '100%' }} >
          {}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
