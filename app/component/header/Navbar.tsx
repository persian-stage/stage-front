'use client';
import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
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
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Skeleton } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthFormOpen, toggleMode } from "@/app/state/authSlice";
import { AppDispatch, RootState } from "@/app/state/store";
import { checkUserAuthentication } from '@/app/state/authSlice';
import { useEffect } from "react";
import { useLogout } from '../../hooks/useLogout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useWebSocket } from "@/app/context/WebSocketContext";
import Badge from '@mui/material/Badge';
import { PATHS } from "@/app/constants/paths";
import { setIsNewMessage } from "@/app/state/commonSlice";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
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

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export interface User {
    email: string;
    id: number;
    name: string;
    avatar: string | null;
}

export default function NavBar() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, isUserLoggedIn, mode } = useSelector((state: RootState) => state.auth);
    const { isNewMessage } = useSelector((state: RootState) => state.common);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const logout = useLogout();
    const { messages } = useWebSocket();

    useEffect(() => {
        if (messages.length > 0 && !location.pathname.includes('/chats')) {
            dispatch(setIsNewMessage(true))
        }
    }, [messages, dispatch]);

    const handleOpenLoginModal = () => {
        if (mode !== 'login') {
            dispatch(toggleMode());
        }
        dispatch(toggleAuthFormOpen());
    };

    function handleOpenRegisterModal() {
        if (mode !== 'register') {
            dispatch(toggleMode());
        }
        dispatch(toggleAuthFormOpen());
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const settings = [
        {label: 'Profile', func: ()=>{}},
        {label: 'Account', func: ()=>{
                router.push('/account');
            }},
        {label: 'Dashboard', func: ()=>{}},
        {label: 'Logout', func:logout},
    ];

    return (
        <Box sx={ { display: 'flex' } }>
            <CssBaseline/>
            <AppBar position="fixed" open={ open }>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={ handleDrawerOpen }
                        edge="start"
                        sx={ { mr: 2, ...(open && { display: 'none' }) } }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={ { flexGrow: 1 } }>
                        <Link href='/' style={ { textDecoration: 'none', color: 'inherit' } }>
                            Stage
                        </Link>
                    </Typography>

                    <Box sx={ { display: isUserLoggedIn ? 'block' : 'none', marginRight: 3 }}>
                        <Link href={ PATHS.CHATS } style={{ textDecoration: 'none', color: "#fff", width: '100%' }}>
                            <Badge color="secondary" variant="dot" invisible={!isNewMessage}>
                                <ChatBubbleOutlineIcon/>
                            </Badge>
                        </Link>
                    </Box>

                    <Box sx={ { display: isUserLoggedIn ? 'block' : 'none' } }>
                        <Tooltip title="Open settings">
                            <IconButton onClick={ handleOpenUserMenu } sx={ { p: 0 } }>
                                { !!user && user.avatar === '' ?
                                    <Skeleton animation="wave" variant="circular" width={ 40 } height={ 40 }/> :
                                    <Avatar alt="Remy Sharp"  src={`${ !!user && user.avatar }`}/>
                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={ { mt: '45px' } }
                            id="menu-appbar"
                            anchorEl={ anchorElUser }
                            anchorOrigin={ {
                                vertical: 'top',
                                horizontal: 'right',
                            } }
                            keepMounted
                            transformOrigin={ {
                                vertical: 'top',
                                horizontal: 'right',
                            } }
                            open={ Boolean(anchorElUser) }
                            onClose={ handleCloseUserMenu }
                        >
                            { settings.map((setting) => (
                                <MenuItem key={ setting.label } onClick={ handleCloseUserMenu }>
                                    <Typography textAlign="center"
                                                onClick={ setting.func }>{ setting.label }</Typography>
                                </MenuItem>
                            )) }
                        </Menu>
                    </Box>
                    <Stack spacing={ 2 } direction="row" sx={ { display: !isUserLoggedIn ? 'flex' : 'none' } }>
                        <Button variant="contained" onClick={ handleOpenRegisterModal }>SignUp</Button>
                        <Button variant="outlined" color="success" onClick={ handleOpenLoginModal }>Login</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={ {
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                } }
                variant="persistent"
                anchor="left"
                open={ open }
            >
                <DrawerHeader>
                    <IconButton onClick={ handleDrawerClose }>
                        { theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/> }
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    { [ { name: 'Home', icon: <HomeIcon/> } ].map((item, index) => (
                        <ListItem key={ index } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    { item.icon }
                                </ListItemIcon>
                                <ListItemText primary={ item.name }/>
                            </ListItemButton>
                        </ListItem>
                    )) }
                </List>
                <Divider/>
                <List>
                    { [ {icon : 'ChatBubbleOutlineIcon', text: 'Chats'} ].map((item, index) => (
                        <ListItem key={ index } disablePadding>
                            <Link href={ PATHS.CHATS } style={{ textDecoration: 'none', color: "#fff", width: '100%' }}>
                                <ListItemButton>
                                            <ListItemIcon>
                                                { item.icon === 'ChatBubbleOutlineIcon' ?
                                                    <Badge color="secondary" variant="dot" invisible={!isNewMessage}>
                                                        <ChatBubbleOutlineIcon/>
                                                    </Badge>
                                                    : <MailIcon/> }
                                            </ListItemIcon>
                                    <ListItemText primary={ item.text }/>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )) }
                </List>
            </Drawer>
        </Box>
    );
}