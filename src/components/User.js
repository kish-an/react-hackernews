import React, { useEffect, useReducer } from 'react';
import queryString from 'query-string';
import { fetchUser, fetchPosts } from '../utils/api';
import Loading from './Loading';
import { formatUnixTimestamp } from '../utils/helpers';
import StoryList from './StoryList';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'user-success':
            return {
                ...state,
                userLoading: false,
                error: null,
                user: action.user,
            }
        case 'posts-success':
            return {
                ...state,
                postsLoading: false,
                error: null,
                userPosts: action.posts,
            }
        case 'error':
            return {
                ...state,
                error: action.errorMessage,
            }
        default:
            throw new Error(`Action type: ${action.type} not supported!`);
    }
}

const initState = {
    userLoading: true,
    postsLoading: true,
    error: null,
    user: {},
    userPosts: [],
}

const User = ({ location }) => {
    const { id } = queryString.parse(location.search);
    const [state, dispatch] = useReducer(userReducer, initState);

    useEffect(() => {
        fetchUser(id)
            .then(user => {
                dispatch({
                    type: 'user-success',
                    user,
                })
                return user;
            })
            .then(user => fetchPosts(user.submitted.splice(0, 30)))
            .then(posts => dispatch({
                type: 'posts-success',
                posts,
            }))
            .catch(err => dispatch({
                 type: 'error',
                 errorMessage: err.message,
            }));

    }, []);

    const { user, userPosts, userLoading, postsLoading, error } = state;

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            {userLoading ? <Loading text={`Loading ${id}s profile`} /> : (
                <>
                    <h1 className='username'>{id}</h1>
                    <div className="post-info">
                        <span>
                            joined <b>{formatUnixTimestamp(user.created)[0]}, {formatUnixTimestamp(user.created)[1]}</b>
                        </span>
                        <span>has <b>{user.karma}</b> karma</span>
                    </div>

                    {user.about && <p dangerouslySetInnerHTML={{__html: user.about}}></p>}

                    {postsLoading ? <Loading text='Fetching posts' /> : (
                        <>
                            <h2>Posts</h2>
                            {userPosts.length > 0 ? <StoryList posts={userPosts} /> : <p className='center-text'>This user hasn't posted yet</p>}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default User;

