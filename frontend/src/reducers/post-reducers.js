import {UPDATE_POSTS} from '../actions/post-actions';

const postReducers = (state = {}, action) => {
    // console.log('postReducers', state, action);
    switch (action.type) {
        case UPDATE_POSTS:// when posts have been fetched
            const posts = action.data.filter(post => !post.deleted);
            return {
                ...state,
                ids: posts.map(post => post.id),
                byId: posts.reduce((result, post) => {
                    result[post.id] = post;
                    return result;
                }, {}),
            };
        default:
            return state;
    }
};

export default postReducers;
