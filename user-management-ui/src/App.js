import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import Register from "./components/Register";
import Users from "./components/Users";
import NotAvailable from "./components/NotAvailable";
import axios from "axios";
import {hostUrl} from "./config";
import Login from "./components/Login";

class App extends Component {

    redirectToLogin() {
        this.props.history.push('login');
    }

    redirectToUnavailable() {
        this.props.history.push('unavailable');
    }

    componentDidMount() {
        axios.get(hostUrl + '/healthCheck').then(response => {
            if (response.status === 200) {
                this.redirectToLogin();
            } else {
                this.redirectToUnavailable()
            }
        }).catch(() => this.redirectToUnavailable());
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/unavailable" component={NotAvailable}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
