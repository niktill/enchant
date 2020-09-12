import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon, Menu, Button, Input } from "semantic-ui-react";
import { deleteCurrentUser, resetCurrentUser } from "../actions";

class AccountSettings extends Component {
    state = {
        open: false,
        deleteEnabled: false,
        resetEnabled: false
    }

    setOpen(arg) {
        this.setState({ open: arg })
    }

    validateDeleteInput(data) {
        if (data.value.toLowerCase() === 'delete account') {
            return this.setState({ deleteEnabled: true })
        }
        return this.setState({ deleteEnabled: false })
    }

    validateResetInput(data) {
        if (data.value.toLowerCase() === 'reset account') {
            return this.setState({ resetEnabled: true })
        }
        return this.setState({ resetEnabled: false })
    }

    deleteAccount() {
        try {
            this.props.deleteCurrentUser()
            this.setState({deleteEnabled: false, resetEnabled: false});
        } catch (err) {
            this.setOpen(false)
        }
    }

    resetAccount() {
        try {
            this.props.resetCurrentUser()
            this.setState({deleteEnabled: false, resetEnabled: false});
            this.setOpen(false)
        } catch (err) {
            this.setOpen(false)
        }
    }

    render() {
        return (
            <Modal closeIcon
                trigger={
                    <Menu.Item>
                        <Icon name='setting' />
                        {this.props.mobile ? 'Account Settings' : null}
                    </Menu.Item>}
                open={this.state.open}
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}>
                <Modal.Header>Account Settings</Modal.Header>
                <Modal.Content style={{ textAlign: 'left' }}>
                    <div>
                        <h3>Reset Account</h3>
                        <p style={{ display: 'block' }}>
                            Resetting your account will start you with a new empty spellbook. To reset your account
                            please type "reset account" into the field and then click the button below.
                        </p>
                        <Input style={{ marginTop: '5px' }} type='text' onChange={(e, data) => this.validateResetInput(data)} />
                        <Button style={{ marginLeft: '5px' }} negative
                            disabled={!this.state.resetEnabled}
                            onClick={() => this.resetAccount()}>
                            Reset Account
                        </Button>
                    </div>
                    <div>
                        <h3 style={{ marginTop: '10px' }}>Delete Account</h3>
                        <p style={{ display: 'block' }}>
                            To delete your account please type "delete account" into the field
                            and then click the button below. Please note account deletion will also revoke your
                            Google or Facebook account authorization of this app.
                        </p>
                        <Input style={{ marginTop: '5px' }} type='text' onChange={(e, data) => this.validateDeleteInput(data)} />
                        <Button style={{ marginLeft: '5px' }} negative
                            disabled={!this.state.deleteEnabled}
                            onClick={() => this.deleteAccount()}>
                            Delete Account
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, { deleteCurrentUser, resetCurrentUser })(AccountSettings);
