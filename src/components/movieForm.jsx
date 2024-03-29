import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getSingleMovie, saveMovie } from '../services/movieService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: '',
        },
        genres: [],
        errors: {},
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
    };

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
    };

    mapToViewModel = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    };

    populateGenres = async () => {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    };

    populateMovie = async () => {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;

            const { data: movie } = await getSingleMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (error) {
            if (error.response && error.response.status === 404)
                this.props.history.replace('/not-found');
        }
    };

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title', 'text', true)}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
