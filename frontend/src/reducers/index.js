import {CHANGE_TO_CATEGORY, UPDATE_CATEGORIES} from '../actions/index';

const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES:// when categories have been fetched
            return {
                ...state,
                all: action.data.categories,
            };
        case CHANGE_TO_CATEGORY:// when the current category has been changed or is being initialized
            // TODO disregard all previous posts
            return {
                ...state,
                currentCategoryName: action.categoryName,
            };
        default:
            return state;
    }
};

export default {categories: categoryReducer};
