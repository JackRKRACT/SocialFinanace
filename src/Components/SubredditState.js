import React from 'react';

export default class SubredditState extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <body>
                <p>Current subreddits : </p>
                <p>{JSON.stringify(this.props.sublist, null, 2) }</p>
                <button type="button" className="bodybutton" onClick={this.props.onClick}>Remove subreddit</button>
                <button type="button" className="bodybutton" onClick={this.props.onClick}>Add subreddit</button>
            </body>
        )
    }
}