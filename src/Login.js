import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();

        this.initialState = {username: '', password: '', redirect: false};
        this.state = this.initialState;
    }

    componentDidMount() {

        if(this.isLogado()) {
            this.setState({redirect: true});
        } else {
            this.setState({redirect: false});
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    isLogado = () => {

        if(localStorage.getItem("auth-token") !== null) {
            return true;
        }
        return false;
    }

    efetuaLogin = event => {

        event.preventDefault();

        //localStorage.setItem("auth-token", "token");
        //this.setState({redirect: true});
        
        const url = new URL("https://orcamentopessoal.ddns.net:8443/usuario/login/");
        //const url = new URL("http://localhost:8080/usuario/login/");
        const usuario = {username: this.state.username, password: this.state.password};

        var fetchParams = {
            mode: 'cors',
            method: 'POST', 
            body: JSON.stringify(usuario), 
            headers: {"Content-Type": 'application/json'}
        };
        
        fetch(url, fetchParams)
            .then(response => {
                //console.log(response);
                if(response.ok) {
                    return response.text();                    
                } else {
                    throw new Error('Não foi possível realizar o login!');
                }
            })
            .then(token => {
                //console.log("jwt token: " + token);
                localStorage.setItem("auth-token", token);
                this.setState({redirect: true});
            })
            .catch(error => {
                alert(error);
                console.log(error);
            })
        
        //console.log(url, fetchParams, localStorage.getItem("auth-token"));
    }

    render() {

        const {username, password, redirect} = this.state;

        if(redirect) {            
            return(<Redirect to="/contas/lista"/>)
        } else {
            return (

                <div>
                    <h5>Login - Entrar no sistema</h5>
    
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="username">Usuario</label>
                                <input type="text" name="username" id="username" className="form-control" value={username} onChange={this.handleChange}/>                        
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Senha</label>
                                <input type="password" name="password" id="password" className="form-control" value={password} onChange={this.handleChange}/>
                            </div>                    
                        </div>
                        
                        <input type="button" name="login" id="login" className="btn btn-primary" value="Entrar" onClick={this.efetuaLogin}/>                    
                    </form>
                </div>
    
            );
        }        
    }
}

export default Login;