import React from 'react';

export default class TopButton extends React.Component {
    render() {
        return (
            <button type="button" className="bodybutton" onClick={this.props.onClick}>{this.props.button_text}</button>
        )
    }
}