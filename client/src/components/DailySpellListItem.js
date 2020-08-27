import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Modal, Popup } from "semantic-ui-react";
import SpellDescription from './SpellDescription';
import { castSpell } from '../actions';

class DailySpellListItem extends Component {
    castSpell(spellLevel) {
        if (spellLevel !== 0 && this.props.spellSlots[spellLevel - 1][0] > 0) {
            this.props.castSpell(spellLevel)
        }
    }
    render() {
        return (
            <Modal
                trigger={
                    <List.Item>
                        <Popup wide='very' basic size='small' header={this.props.spell.name}
                            content={<SpellDescription spell={this.props.spell} />}
                            trigger={<p className='dailySpellName'>{this.props.spell.name}</p>} />
                    </List.Item>}
                header={this.props.spell.name}
                content={
                    <div className='content'>
                        <SpellDescription spell={this.props.spell} />

                    </div>}
                actions={[
                    (this.props.spell.level_int !== 0) ?
                        <p key='-cast-message' size='small' style={{
                            'display': 'inline',
                            'color': (this.props.spellSlots[this.props.spell.level_int - 1][0] === 0) ? 'red' : ''
                        }}>
                            {(this.props.spellSlots[this.props.spell.level_int - 1][0] === 0) ?
                                'You have no available daily ' + this.props.spell.level + ' spell slots!' :
                                this.props.spell.level + ' spell slots available: ' + this.props.spellSlots[this.props.spell.level_int - 1][0]}
                        </p> : null,
                    {
                        key: 'cast-spell',
                        content: 'Cast Spell',
                        labelPosition: 'right',
                        icon: 'magic',
                        onClick: () => this.castSpell(this.props.spell.level_int),
                        positive: true,
                        disabled: this.props.spell.level_int !== 0 && this.props.spellSlots[this.props.spell.level_int - 1][0] <= 0
                    }]} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spellSlots: state.spellSlots
    };
};

export default connect(mapStateToProps, { castSpell })(DailySpellListItem);
