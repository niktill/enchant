import React, { Component } from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { closeEnchantMessage } from "../actions";

class EnchantMessage extends Component {
    handleDismiss = () => {
        this.props.closeEnchantMessage();
    }
    render() {
        if (this.props.enchantMessage.active) {
            return (
                <div className='enchant-message-container popout' style={{ 'textAlign': 'center' }}>
                    <Message onDismiss={() => this.handleDismiss()}
                        negative={this.props.enchantMessage.type === 'error'}
                        positive={this.props.enchantMessage.type === 'success'}>
                        <Message.Header>{this.props.enchantMessage.header}</Message.Header>
                        <p>{this.props.enchantMessage.message}</p>
                        {this.props.enchantMessage.type === 'error' ? 
                        <p>Please try refreshing the page to resolve the issue.</p> : null}
                    </Message>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        enchantMessage: state.enchantMessage
    };
};

export default connect(mapStateToProps, { closeEnchantMessage })(EnchantMessage);
