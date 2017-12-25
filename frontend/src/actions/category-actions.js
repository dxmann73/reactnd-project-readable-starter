import {userErrorFeedbackHandler} from '../api/BaseAPI';
import {getCategories} from '../api/CategoryAPI';
import {fetchPosts} from './post-actions';

export const INIT_CATEGORIES = 'INIT_CATEGORIES';
export const CHANGE_TO_CATEGORY = 'CHANGE_TO_CATEGORY';

/** Return a function which takes dispatch as an argument and dispatches the action on promise resolve */
export const fetchCategories = () => (dispatch) => {
    getCategories()
        .then(data => dispatch(updateCategories(data)))
        .catch(userErrorFeedbackHandler('Sorry, but we were not able to fetch categories from the server right now. Try reloading the page.'));
};

/**
 * Change the current category. Dispatches an action to fetch posts as well
 */
export const changeToCategory = (categoryPath, dispatch) => {
    // disregard all previous posts, fetch the new ones
    dispatch(fetchPosts(categoryPath));
    return {
        type: CHANGE_TO_CATEGORY,
        categoryPath,
    };
};

/** Will update the categories in the store. Fired when categories have been returned from the API call.*/
export const updateCategories = (data) => {
    return {
        type: INIT_CATEGORIES,
        data
    };
};
