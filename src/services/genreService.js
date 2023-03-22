import http from './httpService';
import config from '../config.json';

const getGenres = async () => {
    const { data: genres } = await http.get(`${config.apiUrl}/genres/`);
    return genres;
};

export { getGenres };
