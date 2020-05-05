import React from 'react';
import {Component} from "react";
import axios from "axios";
import NotAvailable from "./NotAvailable";
import Register from "./Register";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {isAlive: false}
    }

    componentDidMount() {
        axios.get('/healthCheck').then(response => {
            if (response.status === 200) {
                this.setState({isAlive: true})
            }
        });
    }

    render() {
        if (this.state.isAlive) {
            return (<Register/>);
        } else {
            return (<NotAvailable/>);
        }
    }
}