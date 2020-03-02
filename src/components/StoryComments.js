import React, { useReducer, useEffect } from 'react';
import queryString from 'query-string';
import { fetchItem, fetchComments } from '../utils/api';
import Loading from './Loading';
import PostInfo from './PostInfo';

const storyCommentsReudcer = (state, action) => {
    switch (action.type) {
        case 'post-success':
            return {
                ...state,
                loadingPost: false,
                post: action.post,
                error: null,
            }
        case 'comments-success':
            return {
                ...state,
                loadingComments: false,
                comments: action.comments,
                error: null,
            }
        case 'error':
            return {
                ...state,
                loadingComments: false,
                loadingPost: false,
                error: action.errorMessage,
            }
        default:
            throw new Error(`Action type: ${action.type} is not supported!`);
    }
}

const initState = {
    loadingPost: true,
    loadingComments: true,
    post: {},
    comments: [],
    error: null,
}

const StoryComments = ({ location }) => {
    const { id } = queryString.parse(location.search);
    const [state, dispatch] = useReducer(storyCommentsReudcer, initState);

    useEffect(() => {
        fetchItem(id)
            .then(post => {
                dispatch({
                    type: 'post-success',
                    post,
                });

                return fetchComments(post.kids || [])
            })
            .then(comments => dispatch({
                type: 'comments-success',
                comments,
            }))
            .catch(err => dispatch({
                type: 'error',
                errorMessage: err.message
            }));
    }, [id]);

    const { loadingPost, loadingComments, post, comments, error } = state

    return (
        <div>
            {loadingPost ? <Loading text='Fetching post'/> : (
                <>
                    <a href={post.url} target='_blank' className='link'>
                        <h1 className='post-title'>{post.title}</h1>
                    </a>
                    <PostInfo
                        by={post.by}
                        time={post.time}
                        descendants={post.descendants}
                        id={post.id}
                    />

                    {loadingComments ? <Loading text='Fetching comments' /> : (
                        comments.map(comment => (
                            <div key={comment.id} className='comment'>
                                <PostInfo
                                    by={comment.by}
                                    time={comment.time}
                                />
                                <p dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                            </div>
                        ))
                    )}
                </>

            )}
        </div>
    )
}

export default StoryComments

