import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';
import Login from './Login';
import {Route, Link} from 'react-router-dom';


class App extends Component {

    render() {
        
        
        return (
            <div className="container">
                <div className="bg-primary h-100 row">
                    <h1 className="text-light  mx-auto">Controle de Orçamento Pessoal</h1>
                </div>
                
                <nav className="navbar navbar-light bg-light row">                    
                    <Link className="navbar-brand" to="/contas/adiciona">Adicionar conta</Link>                    
                    <Link className="navbar-brand" to="/contas/lista">Listar contas</Link>                    
                    <Link className="navbar-brand" to="/login">Login</Link>                    
                </nav>
                
                <div>
                    <Route path="/contas/adiciona" render={() => <Form />}></Route>
                    <Route path="/contas/lista" render={() => <Table />}></Route>
                    <Route path="/login" render={() => <Login />}></Route>
                </div>
            </div>
        );
    }
}

export default App;