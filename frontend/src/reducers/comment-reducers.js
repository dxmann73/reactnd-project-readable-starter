import {INIT_COMMENTS, INSERT_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT} from '../actions/comment-actions';

// TODO this has a lot in common with the post-reducers, in fact it was copied from there.
// Maybe extract a reducer factory for flat-id-based states with optional sorting
const commentReducers = (state = {}, action) => {
    switch (action.type) {
        case INIT_COMMENTS:// when comments have been fetched
            const comments = action.comments
                .filter(comment => !comment.deleted)// disregard deleted comments
                .sort((a, b) => b.timestamp - a.timestamp);// newest first
            // flatten all comments into the state with their ID as a key, so we can update them directly later on
            const initState = comments.reduce((state, comment) => {
                state[comment.id] = comment;
                return state;
            }, {});
            initState.ids = comments.map(comment => comment.id);
            return initState;
        case UPDATE_COMMENT:// when a single comment has been fetched or updated
            return {
                ...state,
                [action.comment.id]: action.comment,
            };
        case INSERT_COMMENT:// insert comment at the top of the list
            return {
                ...state,
                [action.comment.id]: action.comment,
                ids: [action.comment.id, ...state.ids || []],
            };
        case REMOVE_COMMENT:// remove comment from state and from ID array; set ID array to undefined when we've deleted the last comment
            const stateAfterRemove = {
                ...state,
                ids: state.ids ? state.ids.filter(id => id !== action.commentId) : undefined
            };
            delete stateAfterRemove[action.commentId];
            return stateAfterRemove;
        default:
            return state;
    }
};

export default commentReducers;
