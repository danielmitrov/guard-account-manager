import axios from 'axios';

import {API_URL} from '../consts/api';


export const API = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
});
