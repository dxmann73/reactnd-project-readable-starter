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
                .sort(determineCompareFn(state.sortMethod));// default sort based on currently selected method
            // all posts live in the state, with their ID as a key, so we can update them directly
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
        case INSERT_POST:
            return {
                ...state,
                [action.post.id]: action.post,
                ids: [action.post.id, ...state.ids],
            };
        case REORDER_POSTS:
            // determine compare function by sort method
            const compareFn = determineCompareFn(action.sortMethod);
            // reconstruct full post array from current ID array and sort it depending on method
            const mappedPosts = state.ids.map(id => state[id]);
            let orderedPosts = mappedPosts.sort(compareFn);
            let resultingIds = orderedPosts.map(post => post.id);
            return {
                ...state,
                sortMethod: action.sortMethod,
                ids: resultingIds,
            };
        default:
            return state;
    }
};

const determineCompareFn = (sortMethod) => {
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
