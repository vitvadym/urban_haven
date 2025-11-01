import a from 'axios';
import { baseUrl } from '../constanst';

const axios = a.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default axios;
