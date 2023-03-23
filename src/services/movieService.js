import http from './httpService';
import config from '../config.json';

const moviesApi = `${config.apiUrl}/movies`;

const movieUrl = id => `${moviesApi}/${id}`;

const getMovies = async () => http.get(moviesApi);

const getSingleMovie = id => http.get(movieUrl(id));

const saveMovie = async movie => {
    if (movie._id) {
        const movieObj = { ...movie };
        delete movieObj._id;
        return http.put(movieUrl(movie._id), movieObj);
    }

    return http.post(`${moviesApi}`, movie);
};

const deleteMovie = movieId => http.delete(movieUrl(movieId));

export { getMovies, getSingleMovie, deleteMovie, saveMovie };
