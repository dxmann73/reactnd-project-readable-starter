import {CHANGE_TO_CATEGORY, UPDATE_CATEGORIES} from '../actions/category-actions';

export const defaultCategory = {name: 'all', path: null};

const categoryReducers = (state = {}, action) => {
    // console.log('categoryReducers', state, action);
    switch (action.type) {
        case UPDATE_CATEGORIES:// when categories have been fetched
            action.data.categories.unshift(defaultCategory);
            const byPath = {};
            action.data.categories.forEach(cat => byPath[cat.path] = cat);
            // console.log('categoryReducers::UPDATE_CATEGORIES', action.data.categories, byPath);
            return {
                ...state,
                all: action.data.categories,
                byPath: byPath
            };
        case CHANGE_TO_CATEGORY:// when the current category has been changed or is being initialized
            // console.log('categoryReducers::CHANGE_TO_CATEGORY', action, state);
            return {
                ...state,
                currentCategory: state.byPath[action.categoryPath],
            };
        default:
            return state;
    }
};

export default categoryReducers;
