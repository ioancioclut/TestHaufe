import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAlive: false}
    }

    componentDidMount() {
        fetch('  http://localhost:3001/healthcheck').then(response => {
            console.log(response.status);
            if (response.status === 200) {
                this.setState({isAlive: true});
            }
        });
    }

    render() {
        if (this.state.isAlive) {
            return (
                <div className="App">
                    <header className="App-header">
                        <p>
                            Welcome to User management.
                        </p>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header"><p>
                        User management is not available :(
                    </p>
                    </header>
                </div>
            );
        }
    }
}

export default App;
