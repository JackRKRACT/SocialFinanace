import React from 'react';
import './App.css';
import BodyState from './Components/BodyState';
import TopButton from './Components/TopButton';
import LoginState from './Components/LoginState';
import RegisterState from "./Components/RegisterState";
import SubredditState from "./Components/SubredditState";
const axios = require('axios');

// This is a simple version of a React component, that will encompass all of our other React components in our project!
// We can include all of our other components within our App function, by using a line like <ClassName propParameter="propData" /> within the div.

// The beauty of React components is that their returns mix HTML and Javascript really well, using a syntax called JSX
// JSX allows to use functions in the construction of our raw HTML!
// We can read more about JSX here : https://reactjs.org/docs/introducing-jsx.html

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home_page: true,
            view_subreddits_page: false,
            signup_page: false,
            login_page: false,
            has_searched: false
        };
        this.currentUser = "guest";
        this.subredditList = ['no subreddits', 'again', 'part3', 'wowherewego'];
        this.gotoSearch = this.gotoSearch.bind(this);
        this.gotoSubreddits = this.gotoSubreddits.bind(this);
        this.gotoSignup = this.gotoSignup.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    gotoSearch() {
        this.setState ({
            home_page: true,
            view_subreddits_page: false,
            signup_page: false,
            login_page: false,
            has_searched: false
        });
    }

    gotoSubreddits() {
        axios.post('http://localhost:4000/subreddits', "guest")
            .then((response) => response.data)
            .then(data => {
                console.log("Got subreddits from the server : " + data[0].redditName);
                this.subredditList = data;
                //this.subredditList = ['no subreddits', 'again', 'part3', 'wowherewego'];

                this.setState ({
                    home_page: false,
                    view_subreddits_page: true,
                    signup_page: false,
                    login_page: false,
                    has_searched: false
                });
            })
    }

    gotoSignup() {
        this.setState ({
            home_page: false,
            view_subreddits_page: false,
            signup_page: true,
            login_page: false,
            has_searched: false
        });
    }

    gotoLogin() {
        this.setState ({
            home_page: false,
            view_subreddits_page: false,
            signup_page: false,
            login_page: true,
            has_searched: false
        });
    }

    render() {
        return (
            <div className="App" currentUser={this.currentUser}>
                <header>
                    <a id ="title" onClick={this.gotoSearch}>SocialFinance</a>
                    <div id="headerbuttons">
                        <TopButton button_text="Login" onClick={this.gotoLogin}/>
                        <TopButton button_text="Signup" onClick={this.gotoSignup}/>
                        <TopButton button_text="View Subreddits" onClick={this.gotoSubreddits}/>
                    </div>
                </header>
                {this.state.home_page &&
                <body>
                <BodyState />
                </body>
                }
                {this.state.view_subreddits_page &&
                <body>
                    <SubredditState sublist={this.subredditList}/>
                </body>
                }
                {this.state.signup_page &&
                <body>
                <RegisterState className="authstate"/>
                </body>
                }
                {this.state.login_page &&
                <body>
                <LoginState className="authstate"/>
                </body>
                }
                {this.state.has_searched &&
                <body className="testpages">
                <p>
                    This is a test of 'has searched'.
                </p>
                </body>
                }
            </div>
        );
    }
}
