import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Cadastrar extends Component {

    constructor() {
        super();

        this.initialState = {
            usuario: '',
            senha: '',
            senhaRepetida: '',
            email: ''
        };

        this.state = this.initialState;
    }

    handleChange = evento => {
        this.setState({[evento.target.name]: evento.target.value})
    }

    cadastrarUsuario = () => {

        const {usuario, email, senha, senhaRepetida} = this.state;

        if(senha !== senhaRepetida) {
            alert('As senhas devem ser iguais!');
        }
        console.log(usuario, email, senha, senhaRepetida);
    }

    render() {

        const {usuario, email, senha, senhaRepetida} = this.state;

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
                            <label htmlFor="usuario">Usuario</label>
                            <input type="text" name="usuario" id="usuario" className="form-control" value={usuario} onChange={this.handleChange}/>                        
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