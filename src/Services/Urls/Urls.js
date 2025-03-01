import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: localStorage.getItem("Token")
      }
    
});

export const USER_URLS = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    RESET_PASSWORD: `/Users/Reset`,
    CHANGE_PASSWORD: `/Users/ChangePassword`,
    GET_USER: (id)=> `/users/${id}`,
}

export const RECIPES_URLS = {
    RECIPES_LIST: `/Recipe/`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
    ADD_RECIPE: `/Recipe/`,
    GET_RECIPE: (id) => `/Recipe/${id}`,
}

export const CATEGORIES_URLS = {
    CATEGORIES_LIST: `/Category/`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
    ADD_CATEGORY: `/Category/`,
}