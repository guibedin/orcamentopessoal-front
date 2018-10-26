import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Cadastrar extends Component {

    constructor() {
        super();

        this.initialState = {
            username: '',
            password: '',
            passwordRepetida: '',
            email: '',
            redirect: false
        };

        this.state = this.initialState;
    }

    handleChange = evento => {
        this.setState({[evento.target.name]: evento.target.value})
    }

    cadastrarUsuario = evento => {

        evento.preventDefault();

        const {password, passwordRepetida} = this.state;
        const url = new URL("http://localhost:8080/usuario/cadastrar/");
        
        const fetchParams = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: {"Content-Type": 'application/json'}
        };

        if(password !== passwordRepetida) {
            alert('As senhas devem ser iguais!');
        } else {

            fetch(url, fetchParams)
                .then(response => {
                    if(response.ok) {
                        alert('Usuário cadastrado com sucesso, você será redirecionado.')
                        this.setState({redirect: true})
                    }
                    else {
                        throw new Error(response.text());
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }        
        //console.log(username, email, password, passwordRepetida);
    }

    render() {

        const {username, email, password, passwordRepetida, redirect} = this.state;

        if(localStorage.getItem("auth-token") !== null || redirect === true) {            
            return(<Redirect to="/contas/lista"/>)
        } 
        return(

            <div>
                <h5>Cadastrar novo usuário</h5>

                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="usuario">Usuário/ID</label>
                            <input placeholder="Identificador utilizado para entrar no sistema, não pode conter espaços" type="text" name="username" id="username" className="form-control" value={username} onChange={this.handleChange}/>                        
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" className="form-control" value={email} onChange={this.handleChange}/>                        
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={this.handleChange}/>
                        </div>                    
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="passwordRepetida">Confirmar senha</label>
                            <input type="password" name="passwordRepetida" id="passwordRepetida" className="form-control" value={passwordRepetida} onChange={this.handleChange}/>
                        </div>                    
                    </div>
                    
                    <input type="button" name="login" id="login" className="btn btn-primary" value="Registrar" onClick={this.cadastrarUsuario}/>                    
                </form>
            </div>
        );
    }
}

export default Cadastrar;