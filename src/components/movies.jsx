import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';
import Pagination from './common/pagination';
import paginate from './utils/paginate';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
    };

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleClick = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    render() {
        const { pageSize, currentPage, movies } = this.state;
        const { length: count } = movies;
        const selectedMovies = paginate(movies, currentPage, pageSize);

        if (count === 0) return <p>There is no movies in the database.</p>;

        return (
            <>
                <p>
                    Showing {count} movie{count >= 2 && 's'} in the database
                </p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMovies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like
                                        liked={movie.liked}
                                        onClick={() => this.handleClick(movie)}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(movie, currentPage)}
                                        className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </>
        );
    }
}

export default Movies;
