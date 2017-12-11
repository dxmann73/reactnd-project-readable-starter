import {CHANGE_TO_CATEGORY, INIT_CATEGORIES} from '../actions/category-actions';

export const defaultCategory = {name: 'all', path: null};

const categoryReducers = (state = {}, action) => {
    // console.log('categoryReducers', state, action);
    switch (action.type) {
        case INIT_CATEGORIES:// when categories have been fetched
            // console.log('categoryReducers::INIT_CATEGORIES', action.data.categories, byPath);
            action.data.categories.unshift(defaultCategory);
            return {
                ...state,
                all: action.data.categories,
                byPath: action.data.categories.reduce((result, cat) => {
                    result[cat.path] = cat;
                    return result;
                }, {}),
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
