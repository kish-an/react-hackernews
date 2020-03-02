import React from 'react';
import PropTypes from 'prop-types';
import PostInfo from './PostInfo';

const StoryList = ({ posts }) => {
    return (
        <ul>
            {posts.map(({ id, title, url, by, descendants, time }) => (
                <li key={id} className='post'>
                    <a href={url} target='_blank' className='link'>
                        {title}
                    </a>
                    <PostInfo
                        by={by}
                        time={time}
                        descendants={descendants}
                        id={id}
                    />
                </li>
            ))}
        </ul>
    )
}

StoryList.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default StoryList
