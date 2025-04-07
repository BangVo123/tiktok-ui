import axios from 'axios';

const token = localStorage.getItem('token');

const httpRequest = axios.create({
    baseURL: 'http://localhost:3050/api/v1',
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export const get = async (path, query = {}, options = {}) => {
    try {
        const res = await httpRequest.get(path, {
            ...options,
            params: query,
            withCredentials: true,
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const post = async (path, data, options = {}) => {
    const res = await httpRequest.post(path, data, options);
    return res.data;
};

export const patch = async (path, data, options = {}) => {
    const res = await httpRequest.patch(path, data, options);
    return res.data;
};

export default httpRequest;
