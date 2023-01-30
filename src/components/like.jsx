import React from 'react';

function Like({ liked, onClick }) {
    let classes = `fa fa-heart${liked ? '' : '-o'}`;
    return (
        <i
            onClick={onClick}
            className={classes}
            aria-hidden="true"
            style={{ cursor: 'pointer' }}></i>
    );
}

export default Like;
