import React from 'react';

export default class ViewHistory extends React.Component {

    constructor(props) {
        super(props)
        this.ticker = this.props.ticker;
        this.company = this.props.company;
        this.grade = this.props.grade;
    }

    render() {
        return (
            <div>
                <div>
                    <p className="searched">Symbol : {this.ticker} </p>
                </div>
                <div>
                    <p className="searched">Company : {this.company} </p>
                </div>
                <div>
                    <p className="searched">Grade : {this.grade}</p>
                </div>
            </div>
        )
    }
}