import React, { Component } from "react";
import { List, Modal, Popup, Button, Container } from "semantic-ui-react";
import SpellDescription from './SpellDescription';

class DailySpellListItem extends Component {
    castSpell() {

    }

    render() {
        return (
            <Modal
                trigger={
                    <List.Item>
                        <Popup wide='very' basic size='small' header={this.props.spell.name}
                            content={<SpellDescription spell={this.props.spell} />}
                            trigger={<p>{this.props.spell.name}</p>} />
                    </List.Item>}
                header={this.props.spell.name}
                content={<div className='content'><SpellDescription spell={this.props.spell} /></div>}
                actions={{
                    content: <Button
                        content="Cast Spell"
                        labelPosition='right'
                        icon='magic'
                        onClick={() => this.castSpell()}
                        positive />,
                    positive: 'true'
                }} />
        );
    }
}

export default (DailySpellListItem);
