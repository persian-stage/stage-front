'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {FormControl, InputAdornment, InputLabel, Modal, OutlinedInput, Skeleton, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useRouter} from 'next/navigation';
import {useGlobalContext} from "@/app/context/GlobalContext";
import {SnackbarProvider} from 'notistack';
import {httpClient} from '@/app/utils/httpClient';

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

interface NavBarProps {
    isToken?: boolean
}

export interface User {
    email: string;
    id: number;
    name: string;
    avatar: string | null;
}

export default function NavBar({isToken}: NavBarProps) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [isLoginFormOpen, setIsLoginFormOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mode, setMode] = useState<string>(isToken ? 'loggedIn':'login');
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')
    const { state, setState } = useGlobalContext();

    useEffect(() => {
        if (!isToken) return;
        const fetchUser = async () => {
            const user: User = await getUser();
            console.log(user)
            if (user) {
                setState({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar ?? ''
                    }
                });
                setMode('loggedIn');
            }
        };

        fetchUser();
    }, []);

    const { push } = useRouter();

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

    const openLoginForm = () => {
        setIsLoginFormOpen(true);
        setMode('login');
    };

    function openSignUpForm() {
        setIsLoginFormOpen(true);
        setMode('register');
    }

    function toggelForm() {
        setMode(mode == 'login' ? 'register' : 'login');
    }

    const handleClose = () => {
        setIsLoginFormOpen(false);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const endPoint = mode == 'login' ? 'authenticate' : 'register';
    const params = mode === 'login' ? {email, password} : {firstname, lastname, email, password};

    async function submitForm() {
        const data = await httpClient('/api/v1/auth/' + endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
            credentials: 'include'
        });
        if (data.loggedIn == 'true') {
            const user = await getUser();
            setState({user: {id: 1, name: 'John Doe', email: user.email, avatar: user.avatar}});
            setMode('loggedIn');
            handleClose();
        }
    }

    async function getUser() {
        return await httpClient('/api/v1/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
    }

    async function testApi() {
        const data = await httpClient('/api/v1/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        console.log('res: ', data);
    }

    async function logout() {
        await httpClient('/api/v1/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        setMode('login');
        push('/');
    }

    const settings = [
        {label: 'Profile', func: ()=>{}},
        {label: 'Account', func: ()=>{}},
        {label: 'Dashboard', func: ()=>{}},
        {label: 'Logout', func:logout},
    ];

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 0.1}}>
                        Persian Star
                    </Typography>
                    <Box sx={{flexGrow: 0.9}}>
                        <Button variant="outlined" color="success" onClick={testApi}>Test Api</Button>
                    </Box>

                    <Box sx={{flexGrow: 0, display: mode == 'loggedIn' ? 'block' : 'none'}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {state.user?.avatar == '' ?
                                    <Skeleton animation="wave" variant="circular" width={40} height={40} /> :
                                    <Avatar alt="Remy Sharp" src={`/img/${state.user?.avatar}`}/>}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center" onClick={setting.func}>{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Stack spacing={2} direction="row" sx={{display: mode == 'loggedIn' ? 'none' : 'block'}}>
                        <Button variant="contained" onClick={openSignUpForm}>SignUp</Button>
                        <Button variant="outlined" color="success" onClick={openLoginForm}>Login</Button>
                    </Stack>
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
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {[{name: 'Home', icon: <HomeIcon/>}].map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Modal
                open={isLoginFormOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400,}}>
                    <form id="login-form">
                        <Stack spacing={2} direction="column" sx={{display: mode == 'login' ? 'block' : 'none'}}>
                            <h2 id="parent-modal-title">Login</h2>
                            <TextField
                                id="outlined-basic"
                                value={email}
                                label="Email"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                sx={{mt: 3, mb: 1, width: '100%'}}
                                variant="outlined"
                            />
                            <FormControl sx={{mt: 1, width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button sx={{width: '100%'}} variant="contained" color="success" onClick={submitForm}>
                                Login
                            </Button>
                        </Stack>
                    </form>
                    <form id="login-form">
                        <Stack spacing={2} direction="column" sx={{display: mode == 'register' ? 'block' : 'none'}}>
                            <h2 id="parent-modal-title">Register</h2>
                            <TextField
                                id="outlined-basic"
                                value={firstname}
                                label="Name"
                                name="firstname"
                                onChange={e => setFirstname(e.target.value)}
                                sx={{mt: 3, mb: 1, width: '100%'}}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                value={lastname}
                                label="Lastname"
                                name="lastname"
                                onChange={e => setLastname(e.target.value)}
                                sx={{mt: 3, mb: 1, width: '100%'}}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-basic"
                                value={email}
                                label="Email"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                sx={{mt: 3, mb: 1, width: '100%'}}
                                variant="outlined"
                            />
                            <FormControl sx={{mt: 1, width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button sx={{width: '100%'}} variant="contained" color="success" onClick={submitForm}>
                                Register
                            </Button>
                        </Stack>
                    </form>
                    <br/>
                    <Divider>OR</Divider>
                    <br/>
                    <Button sx={{width: '100%'}} variant="contained" onClick={toggelForm}>
                        {mode == 'login' ? 'Register' : 'Login'}
                    </Button>
                </Box>
            </Modal>
            <SnackbarProvider/>
        </Box>
    );
}