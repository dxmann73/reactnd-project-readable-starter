import {
    INIT_POSTS,
    INSERT_POST,
    ORDER_BY_SCORE_HIGHEST_FIRST,
    ORDER_BY_SCORE_LOWEST_FIRST,
    ORDER_NEWEST_FIRST,
    REORDER_POSTS,
    UPDATE_POST
} from '../actions/post-actions';

const postReducers = (state = {sortMethod: ORDER_NEWEST_FIRST}, action) => {
    // console.log('postReducers', state, action);
    switch (action.type) {
        case INIT_POSTS:// when posts have been fetched
            const posts = action.posts
                .filter(post => !post.deleted)// disregard deleted posts
                .sort(withCompareFn(state.sortMethod));// default sort based on currently selected method
            // flatten all posts into the state with their ID as a key, so we can update them directly
            const newState = posts.reduce((state, post) => {
                state[post.id] = post;
                return state;
            }, {});
            newState.sortMethod = state.sortMethod;
            newState.ids = posts.map(post => post.id);
            return newState;
        case UPDATE_POST:// when a single post has been fetched or updated
            return {
                ...state,
                [action.post.id]: action.post,
            };
        case INSERT_POST:
            return {
                ...state,
                [action.post.id]: action.post,
                ids: [action.post.id, ...state.ids],
            };
        case REORDER_POSTS:
            const reorderedPostIds = state.ids
                .map(id => state[id])// reconstruct full post array from current ID array
                .sort(withCompareFn(action.sortMethod))// sort it depending on method
                .map(post => post.id);// and re-map it to an array of IDs
            return {
                ...state,
                sortMethod: action.sortMethod,
                ids: reorderedPostIds,
            };
        default:
            return state;
    }
};

const withCompareFn = (sortMethod) => {
    const scoreCompareFnLowestFirst = (a, b) => a.voteScore > b.voteScore ? 1 : b.voteScore > a.voteScore ? -1 : 0;
    switch (sortMethod) {
        case ORDER_BY_SCORE_LOWEST_FIRST:
            return scoreCompareFnLowestFirst;
        case ORDER_BY_SCORE_HIGHEST_FIRST:
            return (a, b) => -scoreCompareFnLowestFirst(a, b);
        case ORDER_NEWEST_FIRST:
        default:
            return (a, b) => b.timestamp - a.timestamp;
    }
};

export default postReducers;
