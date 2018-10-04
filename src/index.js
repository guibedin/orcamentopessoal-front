import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Table from './Table';
import Form from './Form';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import Cadastrar from './Cadastrar';


ReactDOM.render(
    <BrowserRouter>
        <div className="container">
            <div className="bg-primary h-100 row">
                <h1 className="text-light  mx-auto">Controle de Orçamento Pessoal</h1>
            </div>
            
            <nav className="navbar navbar-light bg-light row">                    
                <Link className="navbar-brand" to="/contas/adiciona">Adicionar conta</Link>                    
                <Link className="navbar-brand" to="/contas/lista">Listar contas</Link>                    
                <Link className="navbar-brand" to="/login">Login</Link>                    
                <Link className="navbar-brand" to="/logout">Logout</Link>
                <Link className="navbar-brand" to="/cadastrar">Cadastrar</Link>
            </nav>
        
            <Switch>
                <PrivateRoute path="/contas/adiciona" componente={Form}></PrivateRoute>
                <PrivateRoute path="/contas/lista" componente={Table}></PrivateRoute>
                <PrivateRoute path="/logout" componente={Logout}></PrivateRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastrar" component={Cadastrar}></Route>
            </Switch>
        </div>
    </BrowserRouter>, document.getElementById('root')
);

registerServiceWorker();
