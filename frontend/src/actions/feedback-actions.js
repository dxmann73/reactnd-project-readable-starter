export const RESET_FEEDBACK = 'RESET_FEEDBACK';
export const ADD_FEEDBACK = 'ADD_FEEDBACK';

export const FEEDBACKTYPE_ERROR = 'FEEDBACKTYPE_ERROR';
export const FEEDBACKTYPE_INFO = 'FEEDBACKTYPE_INFO';

export const resetFeedback = () => ({
    type: RESET_FEEDBACK
});

export const addFeedback = (feedbackType, feedbackMessage) => ({
    type: ADD_FEEDBACK,
    feedbackType,
    feedbackMessage,
});

/** works for both messages and instances of Error() */
export const addErrorFeedback = (error) => addFeedback(FEEDBACKTYPE_ERROR, error.message || error);

/** convenience method for API consumers that don't want to handle errors */
export const noop = (err) => {
    console.trace('swallowing error:', err);
};
