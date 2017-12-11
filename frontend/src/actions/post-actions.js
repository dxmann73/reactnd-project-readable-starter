import {getPosts, upVote} from '../api/PostsAPI';

export const INIT_POSTS = 'INIT_POSTS';

/** Thunk / async actions:
 * They return a function which takes dispatch as an argument and dispatches the action on promise resolve
 */
export const fetchPosts = (categoryPath) => (dispatch) => {
    getPosts(categoryPath).then(data =>
        dispatch(updatePosts(data))
    );
};

export const votePostUp = (postId) => (dispatch) => {
    upVote(postId).then(data =>
            console.log('upvoted; result: ', data)
        // dispatch(updatePosts(data))
    );
    // .catch(err =>   console.log('error when voting', err) // TODO some sort of global error handling?
};

/** Synchronous actions */
/** Will update the posts in the store. Fired when posts have been returned from the API call.*/
export const updatePosts = (data) => {
    return {
        type: INIT_POSTS,
        data
    };
};

