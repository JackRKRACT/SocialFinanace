import React from 'react';
import BodyButton from './BodyButton';
import SearchTextbox from './SearchTextbox';
import ViewHistory from "./ViewHistory";
import SetTimeline from "./SetTimeline";
import EnableNotifications from "./EnableNotifications";
import SearchResults from "./SearchResults"
const axios = require('axios');

export default class BodyState extends React.Component {
    constructor(props) {
        super(props);
        this.currentinput = "";
        this.state = {
            grade: "",
            company: "",
            ticker: "",
            searched: false
        };

        this.stateHandleInput = this.stateHandleInput.bind(this);
        this.stateHandleClick = this.stateHandleClick.bind(this);
    }

    stateHandleInput = e =>  {
        this.currentinput = e.target.value;
    }

    stateHandleClick() {
    console.log(this.currentinput);
    axios.post('http://localhost:4000/stock', this.currentinput)
        .then((response) => response.data)
        .then(data => {
            this.setState({
                grade: data[0].grade,
                company: data[0].companyName,
                ticker: data[0].sTicker,
                searched: true
            })
            console.log(data[0].companyName)
            console.log(data[0])
            console.log(data)
        })
    }


/*
    stateHandleClick() {
        console.log("Hello");
        this.setState({
            grade: "",
            company: "",
            ticker: "",
            searched: true
        });
    }
 */


    /*
        render() {
        return (
            <body className="bodystate">
            <div>
            <SearchTextbox inputdefault="Search symbol" stateinput={this.stateHandleInput} type="text"/>
            <BodyButton button_text="Search" onClick={this.stateHandleClick}/>
            </div>
            {this.state.searched && <SetTimeline/>}
            {this.state.searched && <ViewHistory/>}
            {this.state.searched && <EnableNotifications/>}
            {this.state.searched && <SearchResults ticker={this.state.ticker} company={this.state.company} grade={this.state.grade}/>}
            </body>
        )
    }
     */
    render() {
        return (
            <body className="bodystate">
            <div>
                <SearchTextbox inputdefault="Search symbol" stateinput={this.stateHandleInput} type="text"/>
                <BodyButton button_text="Search" onClick={this.stateHandleClick}/>
            </div>
            <div>
                <SetTimeline />
            </div>
            <div>
                {this.state.searched && <ViewHistory ticker={this.state.ticker} company={this.state.company} grade={this.state.grade}/>}
            </div>
            <div>
                {this.state.searched && <EnableNotifications/>}
            </div>
            <div>
                {this.state.searched && <SearchResults />}
            </div>
            </body>
        )
    }

}