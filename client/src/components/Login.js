import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Form, Button, Input, Modal, Container, Message } from "semantic-ui-react";
import { setMaxSpellSlots, refillSpellSlots } from "../actions";

class Login extends Component {
    render() {
        return (
            <Segment id='login-segment'>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <Input placeholder='Username' type='username' required />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input placeholder='Password' type='password' required />
                    </Form.Field>
                    <Button type='submit'>Log In</Button>
                    <Modal
                        trigger={
                            <Button floated='right' basic color='blue' onClick={(event)=>{event.preventDefault()}}>
                                Create account
                            </Button>}
                        header='Create Account'
                        content={
                            <Container id='create-account-container'>
                                <Form>
                                    <Form.Field>
                                        <label>Username</label>
                                        <Input placeholder='Username' type='username' required />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <Input placeholder='Password' type='password' required />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Confirm Password</label>
                                        <Input placeholder='Confirm Password' type='password' required />
                                    </Form.Field>
                                </Form>
                            </Container>}
                        actions={[{ key: 'create-account', content: 'Create Account', color: 'blue' }]} />
                </Form>
                <Message>
                    Log in Message
                </Message>
            </Segment >
        );
    }
}

const mapStateToProps = (state) => {
    return { spellSlots: state.spellSlots };
};

export default connect(mapStateToProps, { setMaxSpellSlots, refillSpellSlots })(Login);
