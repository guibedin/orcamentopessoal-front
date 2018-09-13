import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
    
    state = {
        contas: [
            {
                'descricao': 'Conta 1',
                'valor': 150,
                'data': '11/09/2018',
                'tipo': 1
            },
            {
                'descricao': 'Conta 2',
                'valor': 200,
                'data': '12/09/2018',
                'tipo': 1
            }
        ]
    };

    componentDidMount() {

        const url = "http://localhost:8080/contas/todas"

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({contas: result})
            });
    }

    handleSubmit = conta => {

        this.setState({contas: [...this.state.contas, conta]})
    }

    removeConta = index => {

        const {contas} = this.state;

        this.setState({
            contas: contas.filter((conta, i) => {
                return index !== i;
            })
        })
    }

    render() {
        
        

        return (
            <div className="container">
                <Table 
                    contas={this.state.contas}
                    removeConta={this.removeConta}
                />
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default App;