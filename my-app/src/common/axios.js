
import axios from 'axios';

axios.defaults.baseURL = process.env.API_BASE_URL;

export const get = (endpoint, params = {},headers={}) => {
  return axios.get(endpoint, { params },{headers})
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const post = (endpoint, data,headers={}) => {
  return axios.post(endpoint, data,{headers})
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const put = (endpoint, data,headers={}) => {
  return axios.put(endpoint, data , {headers})
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const remove = (endpoint,headers={}) => {
  return axios.delete(endpoint,{headers})
    .then(response => response.data)
    .catch(error => console.log(error));
};
