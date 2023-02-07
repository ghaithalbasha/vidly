import React from 'react';

function ListGroup({ onItemSelect, items, textProperty, valueProperty, selectedItem }) {
    return (
        <ul className="list-group">
            {items.map(item => (
                <li
                    onClick={() => onItemSelect(item)}
                    key={item[valueProperty]}
                    className={`list-group-item${item === selectedItem ? ' active' : ''}`}>
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id',
};

export default ListGroup;
