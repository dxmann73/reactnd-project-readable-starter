import {ADD_FEEDBACK, RESET_FEEDBACK} from '../actions/feedback-actions';

const defaultState = {messages: []};

const feedbackReducers = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FEEDBACK:
            return {
                messages: [
                    {type: action.feedbackType, message: action.feedbackMessage},
                    ...state.messages]
            };
        case RESET_FEEDBACK:
            return defaultState;
        default:
            return state;
    }
};

export default feedbackReducers;
