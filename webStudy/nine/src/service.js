import axios from 'axios';

import { token, getToken } from './http';

//普通请求放在这里面

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(async (config) => {

  let headerToken = token;
  
  if (!headerToken) {
    await getToken();
    headerToken = token;
  }

  config.headers.token = headerToken;
  return config;

});

instance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.log(error); //这也是一种错误上报的方式
    // return Promise.reject(error);
  }
);

export const getTabsApi = () => instance.get('/tabs');

export const getNewsList = () => instance.get('/newsList');