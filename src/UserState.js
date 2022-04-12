import React from 'react';
import TopButton from "./Components/TopButton";
import BodyState from "./Components/BodyState";
import RegisterState from "./Components/RegisterState";
import LoginState from "./Components/LoginState";

export default class UserState extends React.Component {

    constructor() {
        super();

        this.state = {
            home_page: true,
            view_subreddits_page: false,
            signup_page: false,
            login_page: false,
            has_searched: false
        };
        this.gotoSearch = this.gotoSearch.bind(this);
        this.gotoSubreddits = this.gotoSubreddits.bind(this);
        this.gotoSignup = this.gotoSignup.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    changeUser(userinput) {
        this.setState({
            username: userinput
        })
    }

    gotoSearch() {
        this.setState({
            home_page: true,
            view_subreddits_page: false,
            signup_page: false,
            login_page: false,
            has_searched: false
        });
    }

    gotoSubreddits() {
        this.setState({
            home_page: false,
            view_subreddits_page: true,
            signup_page: false,
            login_page: false,
            has_searched: false
        });
    }

    gotoSignup() {
        this.setState({
            home_page: false,
            view_subreddits_page: false,
            signup_page: true,
            login_page: false,
            has_searched: false
        });
    }

    gotoLogin() {
        this.setState({
            home_page: false,
            view_subreddits_page: false,
            signup_page: false,
            login_page: true,
            has_searched: false
        });
    }

    render() {
        return(
            <a>This is some text.</a>
        )
    }
}
    /*
    render() {
        return (
            <UserState>
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
                    <body className="testpages">
                        <p>
                            This is a test of 'view subreddits'.
                        </p>
                    </body>
                }
                {this.state.signup_page &&
                    <body className="testpages">
                        <RegisterState />
                    </body>
                }
                {this.state.login_page &&
                    <body>
                        <LoginState />
                    </body>
                }
                {this.state.has_searched &&
                <body className="testpages">
                    <p>
                        This is a test of 'has searched'.
                    </p>
                </body>
                }
            </UserState>
        )
    }
     */

