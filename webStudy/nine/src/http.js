import axios from 'axios';

let token = null;
let tokenPromise = null;

const getToken = () => {

  if (tokenPromise) return tokenPromise;

  tokenPromise = axios.get('/api/token').then(res => {
    token = res.data.token;

    return token;
  })

  return tokenPromise;
}


export {
  token,
  getToken
}