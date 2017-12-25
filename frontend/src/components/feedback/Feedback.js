import React from 'react';
import {MessageType} from '../../types/Typedefs';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Feedback.css';
import {FEEDBACKTYPE_ERROR, resetFeedback} from '../../actions/feedback-actions';

class Feedback extends React.Component {
    render() {
        // console.log('Feedback::render', this.props);
        const {messages, dispatchResetFeedback} = this.props;
        return <div className="feedback-main">
            {messages && !!messages.length && <div className="feedback-list-container">
                <ul>
                    {messages.map(m => <li className={m.type === FEEDBACKTYPE_ERROR ? 'error' : 'info'} key={m.message}>{m.message}</li>)}
                </ul>
                <div className="feedback-dismiss">
                    <button type="button" onClick={() => dispatchResetFeedback()}>Dismiss</button>
                </div>
            </div>}
        </div>;
    }
}

Feedback.propTypes = {
    messages: PropTypes.arrayOf(MessageType),
    dispatchResetFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
    // console.log('Feedback::mapStateToProps', state, props);
    return {
        messages: state.feedback.messages,
    };
};

const mapDispatchToProps = (dispatch) => {
    // console.log('Feedback::mapDispatchToProps', dispatch, props);
    return {
        dispatchResetFeedback: () => dispatch(resetFeedback())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Feedback);
