import {UPDATE_CATEGORIES} from '../actions/index';

const categoryReducer = (state = {initial: true}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES:
            // when categories have been fetched, disregard all previous state; this will later include posts
            return {
                all: action.data.categories
            };
        default:
            return state;
    }
};

export default {categories: categoryReducer};
