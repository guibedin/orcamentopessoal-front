import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

class PrivateRoute extends Component {

    isLogado = () => {

        if(localStorage.getItem("auth-token") == null) {
            return false;         
        } else {
            return true;
        }
    }

    render() {
        
        return(
            this.isLogado() ? (<Route path={this.props.path} component={this.props.componente}/>) : (<Redirect to="/login" />)            
        );
    }
}

export default PrivateRoute;