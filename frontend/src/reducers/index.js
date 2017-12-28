import categoryReducers from './category-reducers';
import postReducers from './post-reducers';
import feedbackReducers from './feedback-reducers';
import commentReducers from './comment-reducers';

export default {
    categories: categoryReducers,
    posts: postReducers,
    comments: commentReducers,
    feedback: feedbackReducers,
};
