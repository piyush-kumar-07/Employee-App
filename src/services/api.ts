import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com', // using a ummy json as server
    timeout: 10000,
    headers: {
        Accept: 'application/json',
    },
});

export default api;