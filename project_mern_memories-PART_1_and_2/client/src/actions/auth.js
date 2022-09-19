import {AUTH} from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signin = (formData, Navigate) => async (dispatch)=>
{
    try
    {
        const {data} = await api.signin(formData);
        dispatch({type: AUTH, data: data})
        Navigate('/');
    }
    catch(err)
    {
        console.log(err);
    }
}

export const signup = (formData, Navigate)=>async (dispatch)=>
{
    try
    {
        const {data} = await api.signup(formData);
        dispatch({type: AUTH, data});
        Navigate('/');
    }
    catch(err)
    {
        console.log(err);
    }
}