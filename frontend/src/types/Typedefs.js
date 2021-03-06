import PropTypes from 'prop-types';

export const CategoryType = PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string,// can be null for the default category
    }
);

export const PostType = PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        commentCount: PropTypes.number.isRequired,
    }
);

export const CommentType = PropTypes.shape({
        id: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        parentDeleted: PropTypes.bool.isRequired,
    }
);

export const MessageType = PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }
);
