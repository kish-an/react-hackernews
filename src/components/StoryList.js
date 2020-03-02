import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatUnixTimestamp } from '../utils/helpers';

const StoryList = ({ posts }) => {
    return (
        <ul>
            {posts.map(({ id, title, url, by, descendants, time }) => {
                const [currDate, currTime] = formatUnixTimestamp(time);

                return (
                    <li key={id} className='post'>
                        <a href={url} target='_blank' className='link'>
                            {title}
                        </a>
                        <div className="post-info">
                            <span>
                                by <Link to={{ pathname: '/user', search: `id=${by}` }}>{by}</Link>
                            </span>
                            <span>on {currDate}, {currTime}</span>
                            <span>
                                with <Link to={{ pathname: '/post', search: `id=${id}`}}>{descendants}</Link> comments
                            </span>
                        </div>

                    </li>
                )
            })}
        </ul>
    )
}

StoryList.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default StoryList
