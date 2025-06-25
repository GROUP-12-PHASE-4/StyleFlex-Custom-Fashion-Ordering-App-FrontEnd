import axios from 'axios';
const API = axios.create({
 baseURL: 'https://styleflex-custom-fashion-ordering-app.onrender.com/api',
});
export default API;
