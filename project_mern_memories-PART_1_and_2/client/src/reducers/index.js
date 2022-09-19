import { combineReducers } from 'redux';
import authReducer from './Auth.js';
import posts from './posts';

export const reducers = combineReducers({ posts, authReducer });
