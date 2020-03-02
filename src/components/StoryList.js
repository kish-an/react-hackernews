import React from 'react';
import PropTypes from 'prop-types';
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
                            <span> by  <a href='/'>{by}</a> </span>
                            <span>on {currDate}, {currTime}</span>
                            <span>with <a href='/'>{descendants}</a> comments</span>
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
