import React from 'react';

export default class SearchTextbox extends React.Component {
    render() {
        return (
            <input type={this.props.type} className="searchinput" placeholder={this.props.inputdefault} onChange={this.props.stateinput}/>
        )
    }
}