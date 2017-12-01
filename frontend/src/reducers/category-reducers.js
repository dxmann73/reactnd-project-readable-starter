import {CHANGE_TO_CATEGORY, UPDATE_CATEGORIES} from '../actions/category-actions';

export const defaultCategory = {name: 'all', path: null};

const categoryReducers = (state = {}, action) => {
    // console.log('categoryReducers', state, action);
    switch (action.type) {
        case UPDATE_CATEGORIES:// when categories have been fetched
            action.data.categories.unshift(defaultCategory);
            return {
                ...state,
                all: action.data.categories,
            };
        case CHANGE_TO_CATEGORY:// when the current category has been changed or is being initialized
            return {
                ...state,
                currentCategory: action.category,
            };
        default:
            return state;
    }
};

export default categoryReducers;
