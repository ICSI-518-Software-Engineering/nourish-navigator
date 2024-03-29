"use client";

import { jwtDecode } from "jwt-decode";
import { UserSessionDetailsType } from "./dataAndTypes";

const TOKEN_KEY = "userToken";

export const loginUser = (token: string, redirectUrl = "/") => {
  sessionStorage.setItem(TOKEN_KEY, token);
  window.location.pathname = redirectUrl;
};

export const logoutUser = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  window.location.pathname = "/";
};

export const decodeJWT = (token: string) => {
  return jwtDecode<UserSessionDetailsType>(token);
};

export const getLoggedInUserDetails = () => {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }
    return decodeJWT(token);
  } catch (error) {
    return null;
  }
};
