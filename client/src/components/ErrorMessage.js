import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { closeErrorMessage } from "../actions";

class ErrorMessage extends Component {
    handleDismiss = () => {
        this.props.closeErrorMessage();
    }
    render() {
        if (this.props.errorMessage.active) {
            return (
                <div className='error-message-container popout' style={{'textAlign': 'center'}}>
                    <Message onDismiss={() => this.handleDismiss()} negative>
                        <Message.Header>{this.props.errorMessage.type}</Message.Header>
                        <p>{this.props.errorMessage.message}</p>
                    </Message>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessage
    };
};

export default connect(mapStateToProps, { closeErrorMessage })(ErrorMessage);
