import axios from 'axios';
import { SERVER_URL } from '../environment';

export const api = axios.create({
  baseURL: SERVER_URL,
});
