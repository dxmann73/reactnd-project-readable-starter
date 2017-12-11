import {INIT_POSTS} from '../actions/post-actions';

const postReducers = (state = {}, action) => {
    // console.log('postReducers', state, action);
    switch (action.type) {
        case INIT_POSTS:// when posts have been fetched
            const posts = action.data.filter(post => !post.deleted);// disregard deleted posts
            // all posts live directly in the state, with their ID as a key, so we can update them directly
            const newState = posts.reduce((result, post) => {
                result[post.id] = post;
                return result;
            }, {});
            newState.ids = posts.map(post => post.id);
            return newState;
        default:
            return state;
    }
};

export default postReducers;
