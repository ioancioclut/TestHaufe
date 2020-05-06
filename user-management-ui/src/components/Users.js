import React, {Component} from "react";
import {Link} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from "material-ui/AppBar";
import axios from "axios";
import {hostUrl} from "../config";


export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get(hostUrl + '/users').then(res=> {
            this.setState({users: res.data});
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Users"/>
                        <div className="container">
                            <div className="center">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Password</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.users.map(user => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.password}</TableCell>
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