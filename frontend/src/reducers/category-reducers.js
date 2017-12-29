import {CHANGE_TO_CATEGORY, INIT_CATEGORIES} from '../actions/category-actions';

export const defaultCategory = {name: 'all', path: null};

const categoryReducers = (state = {}, action) => {
    switch (action.type) {
        case INIT_CATEGORIES:// when categories have been fetched
            action.data.categories.unshift(defaultCategory);// 'all' comes first
            return {
                ...state,
                all: action.data.categories,
                byPath: action.data.categories.reduce((result, category) => {
                    result[category.path] = category;
                    return result;
                }, {}),
            };
        case CHANGE_TO_CATEGORY:// when the current category has been changed or is being initialized
            return {
                ...state,
                currentCategory: state.byPath[action.categoryPath],
            };
        default:
            return state;
    }
};

export default categoryReducers;
