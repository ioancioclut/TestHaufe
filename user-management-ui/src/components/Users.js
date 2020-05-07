import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from "material-ui/AppBar";
import {createExternalUser, getExternalUsers} from "../UserService";
import {RaisedButton, TextField} from "material-ui";
import messages from "./messages.json";


export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        getExternalUsers().then(res => {
            this.setState({users: res.data});
        });
    }

    handleUserChange = e => {
        this.setState({username: e.target.value});
    };

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    };

    createUser = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            this.setState({error: messages.emptyUserOrPassword});
        } else {
            const user = {
                name: this.state.username,
                password: this.state.password
            }
            createExternalUser(user).then(res => {
                console.log("User was successfully created");
                this.componentDidMount();
            }).catch(err => {
                this.setState({error: messages.errorCreatingUser});
                console.log("Error creating user: " + err.message);
            })
        }
    };

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Users"/>
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
                        <RaisedButton label="Create external user" primary={true} onClick={this.createUser}/>
                        <div className="container">
                            <div className="center">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.users.map(user => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.role}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}