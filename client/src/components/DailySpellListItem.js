import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Modal, Popup, Button } from "semantic-ui-react";
import SpellDescription from './SpellDescription';
import { castSpell } from '../actions';

class DailySpellListItem extends Component {
    state = {
        modalOpen: false
    };
    setOpen(arg) {
        this.setState({modalOpen: arg})
    }
    castSpell(spellLevel) {
        if (spellLevel !== 0 && this.props.spellSlots[spellLevel - 1][0] > 0) {
            this.props.castSpell(spellLevel)
        }
    }
    render() {
        return (
            <Modal closeIcon
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={this.state.modalOpen}
                trigger={
                    <List.Item>
                        <Popup wide='very' basic size='small' header={this.props.spell.name}
                            disabled={this.props.isMobile}
                            content={<SpellDescription spell={this.props.spell} />}
                            trigger={<p className='dailySpellName'>{this.props.spell.name}</p>} />
                    </List.Item>}>
                <Modal.Header>{this.props.spell.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <SpellDescription spell={this.props.spell} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {(this.props.spell.level_int !== 0) ?
                        <p key='-cast-message' size='small' style={{
                            'display': 'inline',
                            'color': (this.props.spellSlots[this.props.spell.level_int - 1][0] === 0) ? 'red' : ''
                        }}>
                            {(this.props.spellSlots[this.props.spell.level_int - 1][0] === 0) ?
                                'You have no available prepared ' + this.props.spell.level + ' spell slots!' :
                                this.props.spell.level + ' spell slots available: ' + this.props.spellSlots[this.props.spell.level_int - 1][0]}
                        </p> : null}
                    <Button
                        key='cast-spell'
                        content='Cast Spell'
                        labelPosition='right'
                        icon='magic'
                        onClick={() => {this.setOpen(false); this.castSpell(this.props.spell.level_int);}}
                        positive
                        disabled={this.props.spell.level_int !== 0 && this.props.spellSlots[this.props.spell.level_int - 1][0] <= 0}
                    />
                </Modal.Actions>
            </ Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spellSlots: state.spellSlots
    };
};

export default connect(mapStateToProps, { castSpell })(DailySpellListItem);
