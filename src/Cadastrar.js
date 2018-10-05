import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Cadastrar extends Component {

    constructor() {
        super();

        this.initialState = {
            nome: '',
            senha: '',
            senhaRepetida: '',
            email: ''
        };

        this.state = this.initialState;
    }

    handleChange = evento => {
        this.setState({[evento.target.name]: evento.target.value})
    }

    cadastrarUsuario = evento => {

        evento.preventDefault();

        const {nome, email, senha, senhaRepetida} = this.state;
        const url = new URL("http://localhost:8080/usuario/cadastrar/");
        
        const fetchParams = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: {"Content-Type": 'application/json'}
        };

        if(senha !== senhaRepetida) {
            alert('As senhas devem ser iguais!');
        } else {

            fetch(url, fetchParams)
                .then(response => {
                    if(response.ok) {
                        alert('Usuário cadastrado com sucesso, por favor faça login')
                        console.log(response.text());
                    }
                    else {
                        throw new Error(response.text());
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        
        
        console.log(nome, email, senha, senhaRepetida);
    }

    render() {

        const {nome, email, senha, senhaRepetida} = this.state;

        if(localStorage.getItem("auth-token") !== null) {
            alert("Você já está logado!");

            return(<Redirect to="/contas/lista"/>)
        } 
        return(

            <div>
                <h5>Cadastrar novo usuário</h5>

                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="usuario">Usuário/ID</label>
                            <input placeholder="Identificador utilizado para entrar no sistema, não pode conter espaços" type="text" name="nome" id="nome" className="form-control" value={nome} onChange={this.handleChange}/>                        
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
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name="senha" id="senha" className="form-control" value={senha} onChange={this.handleChange}/>
                        </div>                    
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="senhaRepetida">Confirmar Senha</label>
                            <input type="password" name="senhaRepetida" id="senhaRepetida" className="form-control" value={senhaRepetida} onChange={this.handleChange}/>
                        </div>                    
                    </div>
                    
                    <input type="button" name="login" id="login" className="btn btn-primary" value="Registrar" onClick={this.cadastrarUsuario}/>                    
                </form>
            </div>
        );
    }
}

export default Cadastrar;