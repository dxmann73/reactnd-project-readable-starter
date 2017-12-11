import {INIT_POSTS, UPDATE_POST} from '../actions/post-actions';

const postReducers = (state = {}, action) => {
    // console.log('postReducers', state, action);
    switch (action.type) {
        case INIT_POSTS:// when posts have been fetched
            const posts = action.posts.filter(post => !post.deleted);// disregard deleted posts
            // all posts live directly in the state, with their ID as a key, so we can update them directly
            const newState = posts.reduce((result, post) => {
                result[post.id] = post;
                return result;
            }, {});
            newState.ids = posts.map(post => post.id);
            return newState;
        case UPDATE_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            };
        default:
            return state;
    }
};

export default postReducers;
