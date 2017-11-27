import {getCategories} from '../api/CategoryAPI';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const CHANGE_TO_CATEGORY = 'CHANGE_TO_CATEGORY';

/** Return a function which takes dispatch as an argument and dispatches the action on promise resolve */
export const fetchCategories = () => (dispatch) => {
    getCategories().then(data =>
        dispatch(updateCategories(data))
    );
};

/** change the current category */
export const changeToCategory = (categoryName) => {
    return {
        type: CHANGE_TO_CATEGORY,
        categoryName
    };
};

/** Will update the categories in the store. Fired when categories have been returned from the API call.*/
export const updateCategories = (data) => {
    return {
        type: UPDATE_CATEGORIES,
        data
    };
};

