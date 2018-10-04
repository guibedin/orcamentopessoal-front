import React, {Component} from 'react';

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

        const url = "http://localhost:8080/login";
        var fetchParams = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: {"Content-Type": 'application/json'}
        };
        
        console.log(url, fetchParams);
    }

    render() {

        const {usuario, senha} = this.state;
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

export default Login;