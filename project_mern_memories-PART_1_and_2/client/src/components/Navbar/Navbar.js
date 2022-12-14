import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Avatar, Toolbar, Button, AppBar, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
// import {LOGOUT} from '../../constants/actionTypes.js';
import decode from 'jwt-decode';

const Navbar = ()=>
{
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const location = useLocation();

    const logout = ()=>
    {
        dispatch({type: 'LOGOUT'});
        Navigate('/');
        setUser(null);
    }

    useEffect(()=>
    {
        const token = user?.token;

        if(token)
        {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime())
            {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                Memories
            </Typography> */}
            <img src={memoriesText} alt="icon" height="45px"/>
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {
                user?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {
                                user.result?.name
                            }
                        </Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):
                (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Signin</Button>
                )
            }
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;
