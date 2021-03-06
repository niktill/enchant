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
            <div className='spellSlotsTable' style={{ 'marginBottom': '10px' }}>
                {this.props.appView.mobile ?
                    <Table unstackable definition celled style={{ 'marginBottom': '20px' }}>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    <h3 style={{ display: 'inline' }}>Spell Slots</h3>
                                    <Button size='small' content='Refill Spell Slots' style={{ marginLeft: '10px' }} onClick={() => this.props.refillSpellSlots()} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body className='spellSlotNumbers'>
                            {this.props.spellSlots.map((el, index) =>
                                <Table.Row key={this.spellSlotHeaders[index]}>
                                    <Table.Cell>{this.spellSlotHeaders[index]}</Table.Cell>
                                    <Table.Cell key={index}>
                                        {el[0] + ' / '}
                                        <Input size='small' className='setSpellSlotMax' type='number'
                                            value={el[1].toString()}
                                            onChange={(event, data) =>
                                                this.props.setMaxSpellSlots(index + 1, parseInt(data.value))} />
                                    </Table.Cell>
                                </Table.Row>)}
                        </Table.Body>
                    </Table>
                    :
                    <Table celled style={{ 'marginBottom': '20px' }}>
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
                        <Table.Body className='spellSlotNumbers'>
                            <Table.Row>
                                {this.props.spellSlots.map((el, index) =>
                                    <Table.Cell key={index}>
                                        {el[0] + ' / '}
                                        <Input size='small' className='setSpellSlotMax' type='number'
                                            value={el[1].toString()}
                                            onChange={(event, data) =>
                                                this.props.setMaxSpellSlots(index + 1, parseInt(data.value))} />
                                    </Table.Cell>)}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { spellSlots: state.spellSlots, appView: state.appView };
};

export default connect(mapStateToProps, { setMaxSpellSlots, refillSpellSlots })(SpellSlots);
