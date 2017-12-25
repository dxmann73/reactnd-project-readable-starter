import * as PostsAPI from '../api/PostsAPI';

export const INIT_POSTS = 'INIT_POSTS';
export const INSERT_POST = 'INSERT_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REORDER_POSTS = 'REORDER_POSTS';

export const ORDER_NEWEST_FIRST = 'ORDER_NEWEST_FIRST';
export const ORDER_BY_SCORE_LOWEST_FIRST = 'ORDER_BY_SCORE_LOWEST_FIRST';
export const ORDER_BY_SCORE_HIGHEST_FIRST = 'ORDER_BY_SCORE_HIGHEST_FIRST';

/** Thunk / async actions:
 * They return a function which takes dispatch as an argument and dispatches the action on promise resolve
 */
export const fetchPosts = (categoryPath) => (dispatch) => {
    PostsAPI.getPosts(categoryPath).then(data =>
        dispatch(initPosts(data))
    );
};

export const fetchPost = (postId) => (dispatch) => {
    PostsAPI.getPost(postId).then(data =>
        dispatch(updatePost(data))
    );
};

export const votePostUp = (postId) => (dispatch) => {
    PostsAPI.upVote(postId).then(data =>
        dispatch(updatePost(data))
    );
    // .catch(err =>   console.log('error when voting', err) // TODO some sort of global error handling?
};

export const votePostDown = (postId) => (dispatch) => {
    PostsAPI.downVote(postId).then(data =>
        dispatch(updatePost(data))
    );
};

export const createPost = (post) => (dispatch) => {
    PostsAPI.createPost(post).then(data =>
        dispatch(insertPost(data))
    );
};

/** Synchronous actions */
/** Will replace all posts in the store. Fired when posts have been returned from the API call.*/
export const initPosts = (posts) => {
    return {
        type: INIT_POSTS,
        posts
    };
};

/** Will update the post in the store by replacing it. Fired after voting or otherwise changing the post as well as when post has been (re-)fetched */
export const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    };
};

/** Will insert a post at the top of the current list. Fired after creating a post. */
export const insertPost = (post) => {
    return {
        type: INSERT_POST,
        post
    };
};

/** Will reorder the posts depending on sort type */
export const reorderPosts = (sortMethod) => {
    return {
        type: REORDER_POSTS,
        sortMethod,
    };
};
