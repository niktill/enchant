import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Modal, Icon } from "semantic-ui-react";
import SpellDescription from './SpellDescription';

class MobileSpellListItem extends Component {
    render() {
        const spellSelected = this.props.spellListMonitors.some(el => el.slug === this.props.spell.slug);
        return (
            <Modal closeIcon
                trigger={
                    <List.Item>
                        {this.props.spell.name}
                        {spellSelected ? <Icon className='mobile-spell-check-icon' name='check'/> : null}
                    </List.Item>}
                header={this.props.spell.name}
                content={
                    <div className='content'>
                        <SpellDescription spell={this.props.spell} />
                    </div>}
                actions={[
                    {
                        key: 'select-spell',
                        icon: spellSelected ? 'remove' : 'add',
                        content: spellSelected ? 'Remove Spell' : 'Add Spell',
                        labelPosition: 'right',
                        onClick: () => this.props.selectSpellAction(this.props.spell),
                        positive: !spellSelected,
                        negative: spellSelected
                    }]} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        spellbookSpells: state.spellbookSpells,
        dailySpells: state.dailySpells
    };
};

export default connect(mapStateToProps, {})(MobileSpellListItem);
