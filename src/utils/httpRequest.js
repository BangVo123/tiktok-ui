import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'http://127.0.0.1:3050/api/v1',
});

export const get = async (path, options = {}) => {
    const res = httpRequest.get(path, options);
    return (await res).data;
};

export const post = async (path, options = {}) => {
    const res = await httpRequest.post(path, options);
    return res.data;
};

export default httpRequest;
