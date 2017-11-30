import {getPosts} from '../api/PostsAPI';

export const UPDATE_POSTS = 'UPDATE_POSTS';

/** Return a function which takes dispatch as an argument and dispatches the action on promise resolve */
export const fetchPosts = (category) => (dispatch) => {
    getPosts(category.path).then(data =>
        dispatch(updatePosts(data))
    );
};

/** Will update the posts in the store. Fired when posts have been returned from the API call.*/
export const updatePosts = (data) => {
    return {
        type: UPDATE_POSTS,
        data
    };
};

