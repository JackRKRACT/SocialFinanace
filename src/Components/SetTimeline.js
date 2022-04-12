import React from 'react';

export default class SetTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isviewing: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            isviewing: !this.state.isviewing
        });
    }

    render() {
        return (
            <div>
                {this.state.isviewing && <button type="button" className="bodybutton" onClick={this.onClick}>Close timeline</button>}
                {!this.state.isviewing && <button type="button" className="bodybutton" onClick={this.onClick}>Set timeline</button>}
            </div>
        )
    }
}