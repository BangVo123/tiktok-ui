import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const res = httpRequest.get(path, options);
    return (await res).data;
};

export default httpRequest;
