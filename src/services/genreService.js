import http from './httpService';
import config from '../config.json';

const getGenres = async () => http.get(`${config.apiUrl}/genres/`);

export { getGenres };
