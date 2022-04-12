import React from 'react';

export default class EnableNotifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isviewing: false
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState( {
            isviewing: !this.state.isviewing
        })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.isviewing &&<button type="button" className="bodybutton" onClick={this.onClick}>Close history</button>}
                </div>
                <div>
                    {!this.state.isviewing &&<button type="button" className="bodybutton" onClick={this.onClick}>View history</button>}
                </div>
            </div>
        )
    }
}