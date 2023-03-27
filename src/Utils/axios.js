import axios from 'axios';

const instance = axios.create({
    baseURL: "https://rschat-backend.onrender.com"
});

export default instance;