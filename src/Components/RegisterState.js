import React from 'react';
import BodyButton from './BodyButton';
import SearchTextbox from './SearchTextbox';
const axios = require('axios');

export default class RegisterState extends React.Component {

    constructor(props) {
        super(props);
        this.currentusername = "";
        this.currentpass = "";
        this.firstname = "";
        this.lastname = "";

        this.stateHandleFirstname = this.stateHandleFirstname.bind(this);
        this.stateHandleLastname = this.stateHandleLastname.bind(this);
        this.stateHandleUsername = this.stateHandleUsername.bind(this);
        this.stateHandlePassword = this.stateHandlePassword.bind(this);
        this.stateHandleClick = this.stateHandleClick.bind(this);
    }

    stateHandleFirstname = e =>  {
        this.currentusername = e.target.value;
        //console.log(e.target.value);
    }

    stateHandleLastname = e =>  {
        this.currentpass = e.target.value;
        //console.log(e.target.value);
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
        console.log("Attempting register with first " + this.firstname + ", last " + this.lastname + ", username " + this.currentusername + " and password " + this.currentpass);
        axios.post('http://localhost:4000/login', {first: this.firstname, last: this.lastname, username: this.currentusername, password: this.currentpass})
            .then((response) => response.data)
            .then(data => {
                console.log("Registered as user " + this.currentusername);
                console.log(data.toString());
            })
    }

    render() {
        return (
            <body className={this.props.className}>
            <div>
                <SearchTextbox inputdefault="First" stateinput={this.stateHandleFirstname} type="text"/>
            </div>
            <div>
                <SearchTextbox inputdefault="Last" stateinput={this.stateHandleLastname} type="text"/>
            </div>
            <div>
                <SearchTextbox inputdefault="Username" stateinput={this.stateHandleUsername} type="email"/>
            </div>
            <div>
                <SearchTextbox inputdefault="Password" stateinput={this.stateHandlePassword} type="password"/>
            </div>
            <div>
                <BodyButton button_text="Register" onClick={this.stateHandleClick}/>
            </div>
            </body>
        )
    }
}