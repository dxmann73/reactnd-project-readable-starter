import {noop} from '../actions/feedback-actions';
import * as CommentsAPI from '../api/CommentsAPI';
import {commentAdded, commentRemoved} from './post-actions';

export const INIT_COMMENTS = 'INIT_COMMENTS';
export const RESET_COMMENTS = 'RESET_COMMENTS';
export const INSERT_COMMENT = 'INSERT_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

/** Thunk / async actions */
export const fetchComments = (postId) => (dispatch) => {
    CommentsAPI.getComments(postId)
        .then(data => dispatch(initComments(data)))
        .catch(noop);
};

export const fetchComment = (commentId) => (dispatch) => {
    CommentsAPI.getComment(commentId)
        .then(data => dispatch(updateComment(data)))
        .catch(noop);
};

export const upVote = (commentId) => (dispatch) => {
    CommentsAPI.upVote(commentId)
        .then(data => dispatch(updateComment(data)))
        .catch(noop);
};

export const downVote = (commentId) => (dispatch) => {
    CommentsAPI.downVote(commentId)
        .then(data => dispatch(updateComment(data)))
        .catch(noop);
};

export const createComment = (comment) => (dispatch) => {
    CommentsAPI.createComment(comment)
        .then(data => {
            dispatch(insertComment(data));
            dispatch(commentAdded(data.parentId));
        })
        .catch(noop);
};

export const editComment = (id, comment) => (dispatch) => {
    CommentsAPI.editComment(id, comment)
        .then(data => dispatch(updateComment(data)))
        .catch(noop);
};

export const deleteComment = (id) => (dispatch) => {
    CommentsAPI.deleteComment(id)
        .then(data => {
            dispatch(removeComment(id));
            dispatch(commentRemoved(data.parentId));
        })
        .catch(noop);
};

/** Synchronous actions */
/** Will reset all comments in the store. Needs to be fired before new comments are fetched, to avoid showing the old ones. */
export const resetComments = () => {
    return {
        type: RESET_COMMENTS,
    };
};

/** Will replace all comments in the store. Fired when comments have been returned from the API call.*/
export const initComments = (comments) => {
    return {
        type: INIT_COMMENTS,
        comments
    };
};

/** Will update the comment in the store by replacing it. Fired after voting or otherwise changing the comment as well as when comment has been (re-)fetched */
export const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    };
};

/** Will insert a comment at the top of the current list. Fired after creating a comment. */
export const insertComment = (comment) => {
    return {
        type: INSERT_COMMENT,
        comment
    };
};

/** Will remove a comment from the state. Fired after comment has been successfully deleted on the server. */
export const removeComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId
    };
};
