import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import paginate from './utils/paginate';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
    };

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

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

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    render() {
        const { pageSize, currentPage, movies, selectedGenre, sortColumn } = this.state;
        const { length: count } = movies;

        const filtered =
            selectedGenre && selectedGenre._id
                ? movies.filter(movie => movie.genre._id === selectedGenre._id)
                : movies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const selectedMovies = paginate(sorted, currentPage, pageSize);

        if (count === 0) return <p>There is no movies in the database.</p>;

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>
                        Showing {filtered.length} movie{count >= 2 && 's'} in the database
                    </p>
                    <MoviesTable
                        selectedMovies={selectedMovies}
                        sortColumn={sortColumn}
                        currentPage={currentPage}
                        onLike={this.handleClick}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        order={sortColumn.order}
                    />
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
