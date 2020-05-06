import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {RaisedButton, TextField} from "material-ui";
import axios from "axios";
import {hostUrl} from "../config";
import {Link, withRouter} from "react-router-dom";
import messages from "./messages.json"


class Register extends React.Component {
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

    register = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            this.setState({error:messages.emptyUserOrPassword});
        } else {
            const user = {
                name: this.state.username,
                password: this.state.password
            }
            // axios.post(hostUrl + '/users', user).then(res => {
            //     this.props.history.push('users');
            //     console.log("User was successfully created");
            // }).catch(err => {
            //     this.setState({error: messages.errorCreatingUser});
            //     console.log("Error creating user: " + err.message);
            // })
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
                        <RaisedButton label="Login" primary={true} onClick={this.register}/>
                        <br/>
                        Don't have an account?  <Link to="/register">Register</Link>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(Register)