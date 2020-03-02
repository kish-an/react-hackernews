import React from 'react';
import PropTypes from 'prop-types';
import { formatUnixTimestamp } from '../utils/helpers';
import { Link } from 'react-router-dom';

const PostInfo = ({ by, time, descendants, id }) => {
    const [currDate, currTime] = formatUnixTimestamp(time);

    return (
        <div className="post-info">
            <span>
                by <Link to={{ pathname: '/user', search: `id=${by}` }}>{by}</Link>
            </span>
            <span>on {currDate}, {currTime}</span>
            {descendants !== undefined &&
            <span>
                with <Link to={{ pathname: '/post', search: `id=${id}` }}>{descendants}</Link> comments
            </span>}
        </div>
    )
}

PostInfo.propTypes = {
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    descendants: PropTypes.number,
    id: PropTypes.number,
}

export default PostInfo;

