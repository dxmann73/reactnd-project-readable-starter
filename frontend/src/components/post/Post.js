import React from 'react';
import {connect} from 'react-redux';
import {PostType} from '../../types/Typedefs';

class Post extends React.Component {
    render() {
        const {post} = this.props;
        return <div>
            {JSON.stringify(post)}
        </div>;
    }
}

Post.propTypes = {
    post: PostType,
};

const mapStateToProps = (state, props) => {
    // console.log('Post::mapStateToProps', state, props);
    return {
        post: props.post,
    };
};

export default connect(mapStateToProps)(Post);