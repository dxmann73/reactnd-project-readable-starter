import React from 'react';
import PropTypes from 'prop-types';
import './CrudControls.css';

class CrudControls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmationShowing: false,
        };
    }

    showDeleteConfirmation(show) {
        this.setState({
            deleteConfirmationShowing: show,
        });
    }

    render() {
        const {deleteHandler, editHandler, saveHandler, cancelHandler, isEditing} = this.props;
        if (this.state.deleteConfirmationShowing) {
            return <div className="crud-wrapper">
                <h4 className="crud-heading">Delete?
                    <button type="button" className="crud-button" onClick={deleteHandler}>Yes</button>
                    <button type="button" className="crud-button" onClick={() => this.showDeleteConfirmation(false)}>No</button>
                </h4>
            </div>;
        }
        if (isEditing) {
            return <div className="crud-wrapper">
                <h4 className="crud-heading">Done?
                    <button type="button" className="crud-button" onClick={saveHandler}>Save</button>
                    <button type="button" className="crud-button" onClick={cancelHandler}>Cancel</button>
                </h4>
            </div>;
        }
        return <div className="crud-wrapper">
            <h4 className="crud-heading">
                <button type="button" className="crud-button" onClick={editHandler}>Edit</button>
                <button type="button" className="crud-button" onClick={() => this.showDeleteConfirmation(true)}>Delete</button>
            </h4>
        </div>;
    }
}

CrudControls.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    saveHandler: PropTypes.func,// only required when editing inline, i.e. parent keeps edit state
    cancelHandler: PropTypes.func,// only required when editing inline, i.e. parent keeps edit state
    isEditing: PropTypes.bool,// only required when editing inline, i.e. parent keeps edit state
};

export default CrudControls;
