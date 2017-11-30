import {CHANGE_TO_CATEGORY, UPDATE_CATEGORIES} from '../actions/category-actions';
import {fetchPosts} from '../actions/post-actions';

const categoryReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES:// when categories have been fetched
            return {
                ...state,
                all: action.data.categories,
            };
        case CHANGE_TO_CATEGORY:// when the current category has been changed or is being initialized
            // disregard all previous posts, fetch the new ones
            action.dispatch(fetchPosts(action.categoryName));// TODO make this the full category path, with 'all' having undefined as path
            return {
                ...state,
                currentCategoryName: action.categoryName,
            };
        default:
            return state;
    }
};

export default categoryReducers;
