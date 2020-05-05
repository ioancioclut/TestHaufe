import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {RaisedButton, TextField} from "material-ui";


export default class Register extends React.Component {
    state = {
        username: "",
        password: ""
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    save = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Enter username"
                            floatingLabelText="Username"
                            onChange={e => this.change(e)}
                        />
                        <br/>
                        <TextField
                            hintText="Enter password"
                            floatingLabelText="Password"
                            onChange={e => this.change(e)}
                        />
                        <br/>
                        <RaisedButton label="Register" primary={true}/>
                        <br/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

