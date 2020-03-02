import { useReducer, useEffect } from 'react';
import { fetchStories } from '../utils/api';

const fetchStoriesReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                error: null,
                posts: action.posts
            }
        case error:
            return {
                ...state,
                error: action.errorMessage,
                loading: false
            }
        default:
            throw new Error(`Action type: ${action.type} is not supported!`);
    }
}

const initState = {
    loading: true,
    error: null,
    stories: []
}

const useFetchStories = type => {
    const [state, dispatch] = useReducer(fetchStoriesReducer, initState);

    useEffect(() => {
        fetchStories(type)
            .then(posts => dispatch({
                type: 'success',
                posts,
            }))
            .catch(err => dispatch({
                type: 'error',
                errorMessage: err,
            }));
    }, [type]);

    return state;
}

export default useFetchStories;
