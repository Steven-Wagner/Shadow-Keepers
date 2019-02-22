import React, { Component } from 'react';

function Item(props) {
    return (
        <li>
            <p className="item-name">{props.itemData.name}</p>
            <p className="item-description">{props.itemData.description}</p>
            <p>{props.itemData.special}</p>
        </li>
    )
}

export default class Inventory extends Component {
    render() {

        const items = this.props.currentItems.map((item, i)=>{
            return <Item itemData={item} key={i} />
        })

        return (
            <ul>
                {items}
            </ul>
        )
    }
}