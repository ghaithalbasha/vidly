import http from './httpService';
import config from '../config.json';

const getMovies = async () => {
    const { data: genres } = await http.get(`${config.apiUrl}/movies/`);
    return genres;
};

const deleteMovie = movieId => http.delete(`${config.apiUrl}/movies/${movieId}`);

export { getMovies, deleteMovie };
