import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Input, Button } from "semantic-ui-react";
import { setMaxSpellSlots, refillSpellSlots } from "../actions";

class SpellSlots extends Component {
    constructor() {
        super();
        this.spellSlotHeaders = ['1st Level', '2nd Level', '3rd Level', '4th-Level', '5th Level', '6th Level',
            '7th Level', '8th Level', '9th Level']
    }
    render() {
        return (
            <div style={{ 'marginBottom': '10px' }}>
                <Table unstackable celled style={{ 'marginBottom': '20px' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='9'>
                                <h3 style={{ display: 'inline' }}>Spell Slots</h3>
                                <Button size='small' content='Refill Spell Slots' style={{ marginLeft: '10px' }} onClick={() => this.props.refillSpellSlots()} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            {this.spellSlotHeaders.map(el =>
                                <Table.HeaderCell key={el[0]}>{el}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            {this.props.spellSlots.map((el, index) =>
                                <Table.Cell key={index}>
                                    {el[0] + ' / '}
                                    <Input size='mini' className='setSpellSlotMax' type='text'
                                        value={el[1]}
                                        onChange={(event, data) =>
                                            this.props.setMaxSpellSlots(index + 1, parseInt(data.value.replace(/^0+|0+$/g, "")))} />
                                </Table.Cell>)}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { spellSlots: state.spellSlots };
};

export default connect(mapStateToProps, { setMaxSpellSlots, refillSpellSlots })(SpellSlots);
