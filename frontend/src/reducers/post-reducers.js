import {
    INIT_POSTS,
    INSERT_POST,
    ORDER_BY_SCORE_HIGHEST_FIRST,
    ORDER_BY_SCORE_LOWEST_FIRST,
    ORDER_NEWEST_FIRST,
    REMOVE_POST,
    REORDER_POSTS,
    UPDATE_COMMENT_COUNT,
    UPDATE_POST
} from '../actions/post-actions';

const postReducers = (state = {sortMethod: ORDER_BY_SCORE_HIGHEST_FIRST}, action) => {
    switch (action.type) {
        case INIT_POSTS:// when posts have been fetched
            const posts = action.posts
                .filter(post => !post.deleted)// disregard deleted posts
                .sort(withCompareFn(state.sortMethod));// default sort based on currently selected method
            // flatten all posts into the state with their ID as a key, so we can update them directly later on
            const initState = posts.reduce((state, post) => {
                state[post.id] = post;
                return state;
            }, {});
            initState.sortMethod = state.sortMethod;
            initState.ids = posts.map(post => post.id);
            return initState;
        case UPDATE_POST:// when a single post has been fetched or updated
            return {
                ...state,
                [action.post.id]: action.post,
            };
        case INSERT_POST:// insert post at the top of the list
            return {
                ...state,
                [action.post.id]: action.post,
                ids: [action.post.id, ...state.ids || []],
            };
        case REMOVE_POST:// remove post from state and ID list; ID list is set to undefined when we delete the last post
            const stateAfterRemove = {
                ...state,
                ids: state.ids ? state.ids.filter(id => id !== action.postId) : undefined
            };
            delete stateAfterRemove[action.postId];
            return stateAfterRemove;
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
        case UPDATE_COMMENT_COUNT:// change the comment count on the fly, without reloading the post
            return {
                ...state,
                [action.postId]: {
                    ...state[action.postId],
                    commentCount: state[action.postId].commentCount + action.amount
                },
            };
        default:
            return state;
    }
};

const withCompareFn = (sortMethod) => {
    const scoreCompareFnLowestFirst = (a, b) => a.voteScore > b.voteScore ? 1 : b.voteScore > a.voteScore ? -1 : 0;
    switch (sortMethod) {
        case ORDER_NEWEST_FIRST:
            return (a, b) => b.timestamp - a.timestamp;
        case ORDER_BY_SCORE_LOWEST_FIRST:
            return scoreCompareFnLowestFirst;
        case ORDER_BY_SCORE_HIGHEST_FIRST:
        default:
            return (a, b) => -scoreCompareFnLowestFirst(a, b);
    }
};

export default postReducers;
