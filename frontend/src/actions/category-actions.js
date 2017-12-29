import {addErrorFeedback} from '../actions/feedback-actions';
import {getCategories} from '../api/CategoryAPI';
import {fetchPosts} from './post-actions';

export const INIT_CATEGORIES = 'INIT_CATEGORIES';
export const CHANGE_TO_CATEGORY = 'CHANGE_TO_CATEGORY';

/**
 * Async actions: Return a function which takes dispatch as an argument and dispatch the action on resolve
 */
export const fetchCategories = () => (dispatch) => {
    getCategories()
        .then(data => dispatch(updateCategories(data)))
        .catch(err => dispatch(addErrorFeedback('Sorry, but we were not able to fetch categories from the server. Try reloading the page.')));
};

export const changeToCategory = (categoryPath, dispatch) => {
    // disregard all previous posts, fetch the new ones
    dispatch(fetchPosts(categoryPath));
    return {
        type: CHANGE_TO_CATEGORY,
        categoryPath,
    };
};

/** Synchronous actions */
/** Will update the categories in the store. Fired when categories have been returned from the API call.*/
export const updateCategories = (data) => {
    return {
        type: INIT_CATEGORIES,
        data
    };
};
