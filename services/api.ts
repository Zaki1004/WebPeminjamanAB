import axios from 'axios';

const Api = axios.create({
  baseURL: "http://192.168.1.101:8080",
});

export default Api;