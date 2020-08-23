import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Table, Input, Button } from "semantic-ui-react";
import { setMaxSpellSlots, refillSpellSlots } from "../actions";

class SpellSlots extends Component {
    constructor() {
        super();
        this.spellSlotHeaders = ['1st Level', '2nd Level', '3rd Level', '4th-Level', '5th Level', '6th Level',
            '7th Level', '8th Level', '9th Level']
    }
    render() {
        return (
            <div>
                <Header as='h3'>Spell Slots:</Header>
                <Button content='Refill Spell Slots' onClick={ () => this.props.refillSpellSlots()}/>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {this.spellSlotHeaders.map(el =>
                                <Table.HeaderCell key={el[0]}>{el}</Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            {this.props.spellSlots.map( (el, index) => 
                            <Table.Cell key={index}>
                                {el[0] + ' / '}
                                <Input size='mini' className='setSpellSlotMax' type='number' min='0' 
                                 value={el[1]}
                                 onChange={(event, data) => this.props.setMaxSpellSlots(index + 1, parseInt(data.value)) }/>
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
