import {getCategories} from '../api/CategoryAPI';
import {fetchPosts} from './post-actions';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const CHANGE_TO_CATEGORY = 'CHANGE_TO_CATEGORY';

/** Return a function which takes dispatch as an argument and dispatches the action on promise resolve */
export const fetchCategories = () => (dispatch) => {
    getCategories().then(data =>
        dispatch(updateCategories(data))
    );
};

/**
 * Change the current category. Dispatches an action to fetch posts as wel
 */
export const changeToCategory = (category, dispatch) => {
    // disregard all previous posts, fetch the new ones
    dispatch(fetchPosts(action.category));
    return {
        type: CHANGE_TO_CATEGORY,
        category,
        dispatch
    };
};

/** Will update the categories in the store. Fired when categories have been returned from the API call.*/
export const updateCategories = (data) => {
    return {
        type: UPDATE_CATEGORIES,
        data
    };
};

