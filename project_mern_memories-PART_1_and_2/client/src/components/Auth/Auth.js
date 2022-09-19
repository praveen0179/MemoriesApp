import React, { useState,useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Icon from './Icon.js';
import { useDispatch } from 'react-redux';
import useStyles from './styles.js';
import LockIcon from '@mui/icons-material/Lock';
import Input from './Input.js';
import {useNavigate} from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirm_password:''};

const Auth = () => {
  const classes = useStyles();

  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const Navigate = useNavigate();
  
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    if(isSignUp)
    {
      dispatch(signup(formData, Navigate))
    }
    else
    {
      dispatch(signin(formData, Navigate));
    }
  }

  const switchMode = ()=>
  {
    setIsSignUp((prevState)=>!prevState);
    setShowPassword(false);
  }

  const onSuccess = (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    // console.log(res);
    
    try{
      dispatch({type:'AUTH', data:{result, token}});

      Navigate('/');
    }
    catch(err)
    {
      console.log(err.message);
    }
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: "781958269262-m26f5f5jve3ofte42adaanbibgfqpq81.apps.googleusercontent.com",
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  return (
    <Container component='main' maxWidth="xs">
      <Paper className={classes.Paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">
          {
            isSignUp ? 'SignUp' : 'SignIn'
          }
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spcing={2}>
            {
              isSignUp ? (
                <>
                  <Input name="firstName" label="FirstName" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="lastName" handleChange={handleChange} half />
                </>
              ) : null
            }
            <Input name="email" label="email" handleChange={handleChange} type="email" />
            <Input name="password" label="password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {
              isSignUp ? <Input name="confirm_password" label="confirm_password" handleChange={handleChange} type="password" /> : null
            }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'SignUp' : 'SignIN'}
          </Button>
          
          <GoogleLogin
            clientId={"781958269262-m26f5f5jve3ofte42adaanbibgfqpq81.apps.googleusercontent.com"}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
          {/* <GoogleLogin clientId="781958269262-m26f5f5jve3ofte42adaanbibgfqpq81.apps.googleusercontent.com" render={(renderProps)=>(
            <Button className={classes.googleButton} type='contained' color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}>Google Signin</Button>
          )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {
                  isSignUp?'Already have Account sign in ': "Don't have account sign up"
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
