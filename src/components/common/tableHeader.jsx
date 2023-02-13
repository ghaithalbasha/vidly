import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };

        if (sortColumn.path === path) {
            // if we clicked on the same column we need to toggle the sort order
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        } else {
            // if we clicked on another column, we need to make it asc
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = column => {
        const { sortColumn } = this.props;
        if (column.path !== sortColumn.path) return null;
        return (
            <i
                className={`fa fa-sort-${sortColumn.order === 'asc' ? 'asc' : 'desc'}`}
                aria-hidden="true"></i>
        );
    };

    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(column => (
                        <th
                            className={column.path && 'clickable'}
                            key={column.path || column.key}
                            onClick={() => column.path && this.raiseSort(column.path)}>
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
