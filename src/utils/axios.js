import axios from 'axios';

const API = 'http://localhost:8000';

const axiosInstance = axios.create({ baseURL:API});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
   
    
    if (accessToken) {
      
      config.headers.Authorization = `Bearer ${accessToken}`;
     
    }
    return config;
  },
  
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  try {
    const res = await axiosInstance.get(url, config);
    return res.data;
  } catch (error) {
    return Promise.reject(error.response && error.response.data);
  }
};

export const fetcherPost = async (args) => {
  const [url, payload, config] = Array.isArray(args) ? args : [args];
  try {
    const res = await axiosInstance.post(url, payload, config);
    return res.data;
  } catch (error) {
    return Promise.reject(error.response && error.response.data);
  }
};
