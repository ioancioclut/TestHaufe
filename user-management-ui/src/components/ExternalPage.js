import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Link, withRouter} from "react-router-dom";

class ExternalPage extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="External Page"
                        />
                        <br/>
                        Here is noting to do. Please login with an 'internal' user <Link to="/login">Login</Link>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(ExternalPage)