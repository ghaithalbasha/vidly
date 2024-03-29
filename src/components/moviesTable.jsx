import React, { Component } from 'react';
import Like from './like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => (
                <Link className="sss" to={`/movies/${movie._id}`}>
                    {movie.title}
                </Link>
            ),
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'like',
            content: item => <Like liked={item.liked} onClick={() => this.props.onLike(item)} />,
        },
        {
            key: 'delete',
            content: movie => (
                <button
                    onClick={() => this.props.onDelete(movie)}
                    className="btn btn-danger btn-sm">
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { selectedMovies: movies, onSort, sortColumn } = this.props;

        return (
            <Table columns={this.columns} data={movies} onSort={onSort} sortColumn={sortColumn} />
        );
    }
}

export default MoviesTable;
