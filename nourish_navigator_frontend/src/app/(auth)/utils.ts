"use client";

import { jwtDecode } from "jwt-decode";
import { UserSessionDetailsType } from "./dataAndTypes";

const TOKEN_KEY = "userToken";

export const loginUser = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
  window.location.pathname = "/";
};

export const logoutUser = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  window.location.pathname = "/";
};

export const getLoggedInUserDetails = () => {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }
    return jwtDecode<UserSessionDetailsType>(token);
  } catch (error) {
    return null;
  }
};
