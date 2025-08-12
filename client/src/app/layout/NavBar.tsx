import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { DarkMode, Favorite, LightMode } from '@mui/icons-material';
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchFavoriteQuery } from "../../features/favorite/favoriteApi";
import { useUserInfoQuery } from "../../features/account/accountApi";
import UserMenu from "./UserMenu";

const midLinks = [
      { title: 'property', path: '/property' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: '#baecf9'
    }
}

export default function NavBar() {
      const {data: user} = useUserInfoQuery();
    const {isLoading, darkMode} = useAppSelector(state => state.ui);
    const dispatch = useAppDispatch();
   
    const { data: favorite } = useFetchFavoriteQuery();

    const favoriteCount = favorite?.favoriteItems?.length || 0;


    return (
       <AppBar position="fixed">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' alignItems='center'>
            <Typography component={NavLink} sx={navStyles} to='/' variant="h6">RE-STORE</Typography>
            <IconButton onClick={() => dispatch(setDarkMode())}>
                {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
            </IconButton>
        </Box>

        <List sx={{ display: 'flex' }}>
            {midLinks.map(({ title, path }) => (
                <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                >
                    {title.toUpperCase()}
                </ListItem>
            ))}
        </List>

        <Box display='flex' alignItems='center'>
            {/* Favorites Button */}
            <IconButton component={Link} to='/favorites' size="large" sx={{ color: 'inherit' }}>
                <Badge badgeContent={favoriteCount} color="secondary">
                    <Favorite />
                </Badge>
            </IconButton>

          

           {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
        </Box>

    </Toolbar>
    {isLoading && (
        <Box sx={{ width: '100%' }}>
            <LinearProgress color="secondary" />
        </Box>
    )}
</AppBar>
    )
}