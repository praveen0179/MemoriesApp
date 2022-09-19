import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';

import photo from './images/memories-Logo.png';

import { ButtonBase, Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@mui/material';
import useStyles from './styles.js';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="781958269262-m26f5f5jve3ofte42adaanbibgfqpq81.apps.googleusercontent.com">

    <BrowserRouter>
            <Container maxWidth="xl">
              <Navbar/>
              <Routes>
                <Route path='/' element={<Navigate replace to="/posts" />}></Route>
                <Route path="/posts" exact element={<Home/>}/>
                <Route path="/posts/search" exact element={<Home/>}/>
                <Route path="/posts/:id" element={<PostDetails/>}/>
                <Route path='/auth' element={!user?<Auth/>: <Navigate to="/posts"/>}></Route>
              </Routes>
              {/* <Home/> */}
            </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
