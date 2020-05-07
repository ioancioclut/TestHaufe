import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {RaisedButton, TextField} from "material-ui";
import {Link, withRouter} from "react-router-dom";
import messages from "./messages.json"
import {loginUser} from "../UserService"


class Login extends React.Component {
    state = {
        username: "",
        password: "",
        error: ""
    }

    handleUserChange = e => {
        this.setState({username: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    login = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            this.setState({error: messages.emptyUserOrPassword});
        } else {
            const user = {
                name: this.state.username,
                password: this.state.password
            }
           loginUser(user).then(res => {
               if (res.data.role==='internal') {
                   console.log("Successfully login: " + res.data.name);
                   this.props.history.push('users');
               } else {
                   this.props.history.push('external');
               }
            }).catch(err => {
                this.setState({error: messages.invalidCredentials});
                console.log("Error login: " + err.message);
            })
        }
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter username"
                            floatingLabelText="Username"
                            onChange={e => this.handleUserChange(e)}
                        />
                        <br/>
                        <TextField
                            hintText="Enter password"
                            type="password"
                            floatingLabelText="Password"
                            onChange={e => this.handlePasswordChange(e)}
                        />
                        <br/>
                        {this.state.error}
                        <br/><br/>
                        <RaisedButton label="Login" primary={true} onClick={this.login}/>
                        <br/>
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Login)