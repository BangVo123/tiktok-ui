import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('/users/search', {
            params: {
                q,
                type,
            },
        });
        //data is default obj value return by axios
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
