import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    
});

export const USER_URLS = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    RESET_PASSWORD: `/Reset/Request`,
    GET_USER: (id)=> `/users/${id}`,
}

export const RECIPES_URLS = {
    RECIPES_LIST : `${baseUrl}/Recipe/`,
}

export const CATEGORIES_URLS = {
    CATEGORIES_LIST : `${baseUrl}/Category/`,
}