import axios from 'axios';

const Api = axios.create({
  baseURL: "https://condition-provider-motorcycle-sides.trycloudflare.com",
});

export default Api;