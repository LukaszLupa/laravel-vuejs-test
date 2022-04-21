import axios, { AxiosInstance } from "axios";

/**
 * Create axios instance.
 */
export const API: AxiosInstance = axios.create({
    baseURL: process.env.MIX_API_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});
