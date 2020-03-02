import React from 'react';
import PropTypes from 'prop-types';
import useFetchStories from '../hooks/useFetchStories';
import Loading from './Loading';
import StoryList from './StoryList';

const Stories = ({ type }) => {
    const { posts, error, loading } = useFetchStories(type);

    if (loading) {
        return <Loading text={`Loading ${type} stories`}/>
    } else if (error) {
        return <p>{error}</p>
    }

    return (
        <React.Fragment>
            <StoryList posts={posts} />
        </React.Fragment>
    )
}

Stories.propTypes = {
    type: PropTypes.string.isRequired,
}

export default Stories;

