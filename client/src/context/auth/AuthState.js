import React, { createContext, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import Axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = (props) => {
  const initialtate = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialtate);

  // Load User
  const loadUser = async () => {
    // @todo - load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await Axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: e.message });
    }
  };
  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Contet-Type": "application-json",
      },
    };
    try {
      const res = await Axios.post("/api/users", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (e) {
      dispatch({ type: REGISTER_FAIL, payload: e.response.data.msg });
    }
  };
  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Contet-Type": "application-json",
      },
    };
    try {
      const res = await Axios.post("/api/auth", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (e) {
      dispatch({ type: LOGIN_FAIL, payload: e.response.data.msg });
    }
  };
  // Logout User
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
