import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../setAuthToken';

import {AUTH} from "../defines";
import {PUBLIC_API_URL} from '../../config'

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    token: null,
    loading: false
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      const token=localStorage.token.replaceAll('"','')
      //sending token to headers
      setAuthToken(token)
      try {
        const res = await axios.get(`${PUBLIC_API_URL}/api/auth/me`);
        dispatch({
          type: AUTH.LOAD_USER,
          payload: {...res.data.data,token}
        })

      } catch (err) {
        dispatch({
          type: AUTH.LOAD_USER_FAIL,
          payload: err.response.data.error
        })
      }
    }
  };

  // Login User
  const login = async (data) => {
      dispatch({
        type: AUTH.LOG_IN,
        payload: data,
      });

  };

  // Logout
  const logout = () => {
    localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
    dispatch({ type: AUTH.LOG_OUT });
  }

  // Clear Errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        loading:state.loading,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
