export const RESET_FEEDBACK = 'RESET_FEEDBACK';
export const ADD_FEEDBACK = 'ADD_FEEDBACK';

export const FEEDBACKTYPE_ERROR = 'FEEDBACKTYPE_ERROR';
export const FEEDBACKTYPE_INFO = 'FEEDBACKTYPE_INFO';

/** Actions for the centralized feedback component */

export const resetFeedback = () => ({
    type: RESET_FEEDBACK
});

export const addFeedback = (feedbackType, feedbackMessage) => ({
    type: ADD_FEEDBACK,
    feedbackType,
    feedbackMessage,
});

export const addInfoFeedback = (error) => addFeedback(FEEDBACKTYPE_INFO, error.message || error);

/** works for both messages and instances of Error() */
export const addErrorFeedback = (error) => addFeedback(FEEDBACKTYPE_ERROR, error.message || error);

/** convenience method for API consumers that don't want to handle errors */
export const noop = (err) => {
    console.trace('swallowing error:', err);
};
