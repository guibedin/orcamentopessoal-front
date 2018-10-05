import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';
import Login from './Login';
import {Route, Link, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import Cadastrar from './Cadastrar';


class App extends Component {

    isLogado = () => {

        if(localStorage.getItem("auth-token") !== null) {
            return true;
        }
        return false;
    }
    
    renderLogado = () => {
    
        console.log("Logado");
        return (
            <nav className="navbar navbar-light bg-light row"> 
                <Link className="navbar-brand" to="/contas/lista">Listar contas</Link>
                <Link className="navbar-brand" to="/contas/adiciona">Adicionar conta</Link>                
                <Link className="navbar-brand" to="/logout">Logout</Link>
            </nav>
        );
    }
    
    renderNaoLogado = () => {
        
        console.log("NaoLogado");
        return (
            <nav className="navbar navbar-light bg-light row"> 
                <Link className="navbar-brand" to="/login">Login</Link>                                    
                <Link className="navbar-brand" to="/cadastrar">Cadastrar</Link>
            </nav>
        );
    }
    
    render() {
        
        
        return (
            <div className="container">
                <div className="bg-primary h-100 row">
                    <h1 className="text-light  mx-auto">Controle de Orçamento Pessoal</h1>
                </div>

                { this.isLogado() ? (this.renderLogado()) : (this.renderNaoLogado()) }
            
                <Switch>
                    <PrivateRoute path="/contas/adiciona" componente={Form}></PrivateRoute>
                    <PrivateRoute path="/contas/lista" componente={Table}></PrivateRoute>
                    <PrivateRoute path="/logout" componente={Logout}></PrivateRoute>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/cadastrar" component={Cadastrar}></Route>
                </Switch>
            </div>
        );
    }
}

export default App;