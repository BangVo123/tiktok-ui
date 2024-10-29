import axios from 'axios';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'http://localhost:3050/api/v1',
});

export const get = async (path, query = {}, options = {}) => {
    try {
        const res = await httpRequest.get(path, { ...options, params: query });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const post = async (path, data, options = {}) => {
    const res = await httpRequest.post(path, data, options);
    return res.data;
};

export default httpRequest;
