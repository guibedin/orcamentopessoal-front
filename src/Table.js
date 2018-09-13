import React, {Component} from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Descricao</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Remover</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {

    const rows = props.contas.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.descricao}</td>
                <td>{row.valor}</td>
                <td>{row.data}</td>
                <td>{row.tipo}</td>
                <td><button className="btn btn-primary" onClick={() => {props.removeConta(index)}}>Remover</button></td>
            </tr>
        );
    })

    return (        
        <tbody>
           {rows}
        </tbody>
    );
}

class Table extends Component {

    render() {
        const {contas, removeConta} = this.props;

        return (
            <table className="table">
                <TableHeader />
                <TableBody 
                    contas={contas} 
                    removeConta={removeConta}
                />
            </table>
        );
    }
}

export default Table;