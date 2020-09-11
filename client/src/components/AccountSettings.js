import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon, Menu, Button, Popup, Input } from "semantic-ui-react";
import { deleteCurrentUser } from "../actions";

class AccountSettings extends Component {
    state = {
        open: false,
        deleteEnabled: false
    }

    setOpen(arg) {
        this.setState({ open: arg })
    }

    validateDeleteInput(data) {
        if (data.value === 'delete account') {
            return this.setState({deleteEnabled: true})
        }
        return this.setState({deleteEnabled: false})
    }

    deleteAccount() {
        try {
            this.props.deleteCurrentUser()
        } catch(err) {
            this.setOpen(false)
        }
    }

    render() {
        return (
            <Modal closeIcon
                trigger={<Menu.Item><Icon name='setting' /></Menu.Item>}
                open={this.state.open}
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}>
                <Modal.Header>Account Settings</Modal.Header>
                <Modal.Content style={{ textAlign: 'left' }}>
                    <Popup
                        size='large'
                        wide
                        on='click'
                        trigger={<Button negative>Delete Account</Button>}
                        content={
                            <div>
                                To complete account deletion please type "delete account" into the field below
                                <Input style={{ marginTop: '10px' }} type='text' onChange={(e, data)=> this.validateDeleteInput(data)} />
                                <Button style={{ marginTop: '10px' }} negative
                                    disabled={!this.state.deleteEnabled} 
                                    onClick={() => this.deleteAccount()}>
                                    Delete Account
                                </Button>
                            </div>
                        } />
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, { deleteCurrentUser })(AccountSettings);
