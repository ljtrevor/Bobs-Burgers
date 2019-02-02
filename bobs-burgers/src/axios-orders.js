import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bobs-burgers-19852.firebaseio.com/'
});

export default instance;