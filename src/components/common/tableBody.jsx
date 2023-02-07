import React, { Component } from 'react';
import Like from '../like';

class TableBody extends Component {
    render() {
        const { data, currentPage, onLike, onDelete } = this.props;

        return (
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        {}
                        <td>{item.title}</td>
                        <td>{item.genre.name}</td>
                        <td>{item.numberInStock}</td>
                        <td>{item.dailyRentalRate}</td>
                        <td>
                            <Like liked={item.liked} onClick={() => onLike(item)} />
                        </td>
                        <td>
                            <button
                                onClick={() => onDelete(item, currentPage)}
                                className="btn btn-danger btn-sm">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
