import React from 'react';
import BodyButton from './BodyButton';
import SearchTextbox from './SearchTextbox';
const axios = require('axios');

export default class LoginState extends React.Component {

    constructor(props) {
        super(props);
        this.currentusername = "";
        this.currentpass = "";
        this.state = {
            grade: "",
            company: "",
            ticker: "",
            searched: false
        };

        this.stateHandleUsername = this.stateHandleUsername.bind(this);
        this.stateHandlePassword = this.stateHandlePassword.bind(this);
        this.stateHandleClick = this.stateHandleClick.bind(this);
    }

    stateHandleUsername = e =>  {
        this.currentusername = e.target.value;
        //console.log(e.target.value);
    }

    stateHandlePassword = e =>  {
        this.currentpass = e.target.value;
        //console.log(e.target.value);
    }

    stateHandleClick() {
        console.log("Attempting login with username " + this.currentusername + " and password " + this.currentpass);
        let tempuser = this.currentusername;
        let temppass = this.currentpass;
        axios.post('http://localhost:4000/login', {username: tempuser, password: temppass})
            .then((response) => response.data)
            .then(data => {
                console.log("Logged in as " + tempuser);
            console.log("This should be the full name... " + data)
        })
    }

    render() {
        return (
            <body className="bodystate">
                <div>
                    <SearchTextbox inputdefault="Username" stateinput={this.stateHandleUsername} type="email"/>
                </div>
                <div>
                    <SearchTextbox inputdefault="Password" stateinput={this.stateHandlePassword} type="password"/>
                </div>
                <div>
                    <BodyButton button_text="Login" onClick={this.stateHandleClick}/>
                </div>
            </body>
        )
    }
}