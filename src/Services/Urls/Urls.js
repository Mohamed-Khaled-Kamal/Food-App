import axios from "axios";

export const baseUrl = "https://upskilling-egypt.com:3006/api/v1";
export const ImgUrl = "https://upskilling-egypt.com:3006/";

// puplic instance
export const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// private instance
export const privateAxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
});


export const USER_URLS = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    RESET_PASSWORD: `/Users/Reset`,
    CHANGE_PASSWORD: `/Users/ChangePassword`,
    VERIFY_ACCOUNT: `/Users/verify`,
    GET_USER: (id) => `/users/${id}`,
    USERS_LIST: `/Users/`,
    DELETE_USER: (id) => `/Users/${id}`,
    EDIT_USER: (id) => `/Users/${id}`,
}

export const RECIPES_URLS = {
    RECIPES_LIST: `/Recipe/`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
    ADD_RECIPE: `/Recipe/`,
    GET_RECIPE: (id) => `/Recipe/${id}`,
    EDIT_RECIPE: (id) => `/Recipe/${id}`,
}

export const FAVS_URLS = {
    GET_FAVS: `/userRecipe/`,
    CREATE_FAVS: `/userRecipe/`,
    DELETE_FAVS: (id) => `/userRecipe/${id}`,
}

export const CATEGORIES_URLS = {
    CATEGORIES_LIST: `/Category/`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
    ADD_CATEGORY: `/Category/`,
    EDIT_CATEGORY: (id) => `/Category/${id}`,
}

export const TAGS_URLS = {
    GET_TAGS: `/tag/`,
}