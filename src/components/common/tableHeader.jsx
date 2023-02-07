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
    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map(column => (
                        <th
                            key={column.path || column.key}
                            onClick={() => this.raiseSort(column.path)}>
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
