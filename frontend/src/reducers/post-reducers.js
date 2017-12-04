import {UPDATE_POSTS} from '../actions/post-actions';

const postReducers = (state = {}, action) => {
    // console.log('postReducers', state, action);
    switch (action.type) {
        case UPDATE_POSTS:// when posts have been fetched
            return {
                ...state,
                all: action.data.filter(post => !post.deleted),
            };
        default:
            return state;
    }
};

export default postReducers;
