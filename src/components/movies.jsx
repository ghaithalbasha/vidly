import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import paginate from './utils/paginate';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        selectedGenre: null,
        searchTerm: '',
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
        this.setState({ selectedGenre: genre, currentPage: 1, searchTerm: '' });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedDate = () => {
        const { pageSize, currentPage, movies, selectedGenre, sortColumn, searchTerm } = this.state;
        let filtered = movies;
        if (searchTerm) {
            filtered = movies.filter(({ title }) =>
                title.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = movies.filter(movie => movie.genre._id === selectedGenre._id);
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const selectedMovies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, selectedMovies };
    };

    handleSearch = query => {
        this.setState({ searchTerm: query, selectedGenre: null, currentPage: 1 });
    };

    render() {
        const { pageSize, currentPage, movies, sortColumn, searchTerm } = this.state;
        const { length: count } = movies;
        const { totalCount, selectedMovies } = this.getPagedDate();

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
                    <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
                        New Movie
                    </Link>
                    <p>
                        Showing {totalCount} movie{count >= 2 && 's'} in the database
                    </p>
                    <SearchBox value={searchTerm} onChange={this.handleSearch} />
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
                        itemsCount={totalCount}
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
