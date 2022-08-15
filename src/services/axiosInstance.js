const { default: Axios } = require('axios');

const axiosinstance = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

axiosinstance.defaults.headers.common['test'] =
    'test header';

export default axiosinstance;
