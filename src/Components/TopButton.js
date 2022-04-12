import React from 'react';

export default class TopButton extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <button type="button" className="topbutton" onClick={this.props.onClick}>{this.props.button_text}</button>
        )
    }
}