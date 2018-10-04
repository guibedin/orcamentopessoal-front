import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor() {
        super();

        this.initialState = {usuario: '', senha: ''};
        this.state = this.initialState;
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    efetuaLogin = event => {


        event.preventDefault();

        localStorage.setItem("auth-token", "token");
        
        const url = "http://localhost:8080/login";
        var fetchParams = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: {"Content-Type": 'application/json'}
        };
        /*
        fetch(url, fetchParams)
            .then(response => {

                if(response.ok) {
                    return response.text();                    
                } else {
                    throw new Error('Não foi possível realizar o login!');
                }
            })
            .then(token => {
                console.log(token);
                localStorage.setItem("auth-token", token);
            })
            .catch(error => {
                console.log(error);
            })
            */
        console.log(url, fetchParams, localStorage.getItem("auth-token"));
    }

    render() {

        const {usuario, senha} = this.state;

        if(localStorage.getItem("auth-token") !== null) {
            alert("Você já está logado!");

            return(<Redirect to="/contas/lista"/>)
        } else {
            return (

                <div>
                    <h5>Login - Entrar no sistema</h5>
    
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="usuario">Usuario</label>
                                <input type="text" name="usuario" id="usuario" className="form-control" value={usuario} onChange={this.handleChange}/>                        
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="senha">Senha</label>
                                <input type="password" name="senha" id="senha" className="form-control" value={senha} onChange={this.handleChange}/>
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