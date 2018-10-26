import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem("auth-token");
    }

    render() {

        return(
            <Redirect to="/login"/>
        );
    }
}

export default Logout;