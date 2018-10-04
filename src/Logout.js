import React, {Component} from 'react';

class Logout extends Component {

    constructor() {
        super();        
    }

    componentWillMount() {
        console.log("teste")
        localStorage.removeItem("auth-token");   
    }

    render() {

        return(
            <h5>Logout realizado.</h5>
        );
    }
}

export default Logout;