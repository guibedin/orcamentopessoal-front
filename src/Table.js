import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Moment from 'moment';

class Table extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            usuario: {},
            totais: [{totalEntradaFixa: 0, 
                totalEntradaVariavel: 0, 
                totalEntradaGeral: 0, 
                totalSaidaFixa: 0, 
                totalSaidaVariavel: 0, 
                totalSaidaGeral: 0, 
                saldo: 0}],
            mes: 0,
            ano: 0,            
            mesInicial: 0,
            anoInicial: 0,
            mesFinal: 0,
            anoFinal: 0,
            filtro: "tudo",
            redirect: false
        }
        this.state = this.initialState;        
    }

    componentDidMount() {

        this.getContasTodas();
    }

    getContasTodas = () => {

        var url = new URL("http://localhost:8080/usuario/")
        this.fetchContas(url);        
    }

    getContasMesAno = (mes, ano) => {
       
        var url = new URL(`http://localhost:8080/usuario/saldo/mes-ano/?mes=${mes}&ano=${ano}`);
        this.fetchContas(url);
    }

    getContasPeriodo = (mesInicial, anoInicial, mesFinal, anoFinal) => {

        var url = new URL(`http://localhost:8080/usuario/saldo/periodo/?mesInicial=${mesInicial}&anoInicial=${anoInicial}&mesFinal=${mesFinal}&anoFinal=${anoFinal}`);
        this.fetchContas(url);
    }

    fetchContas = (url) => {
        
        const fetchHeader = new Headers({'Authorization': 'Bearer ' + localStorage.getItem("auth-token")});
        //const fetchHeader = new Headers({'Authorization': 'Bearer guibedin'});
        //console.log(fetchHeader.get("Authorization"));

        fetch(url, {headers: fetchHeader})
            .then(response => {            
                return response.json();   
            })
            .then(response => {
                if(typeof response.error === 'undefined') {
                    this.setState({
                        usuario: response,                        
                        totais: [{
                            totalEntradaFixa: response.totalEntradaFixa, 
                            totalEntradaVariavel: response.totalEntradaVariavel, 
                            totalEntradaGeral: response.totalEntradaGeral, 
                            totalSaidaFixa: response.totalSaidaFixa, 
                            totalSaidaVariavel: response.totalSaidaVariavel, 
                            totalSaidaGeral: response.totalSaidaGeral, 
                            saldo: response.saldo
                        }]
                    });   
                } else if(response.status === 401){
                    alert('Por favor, faça login novamente!');
                    localStorage.removeItem("auth-token");
                    this.setState({redirect: true});
                }
            })
            .catch(error => {
                console.log(error);
            });
    }               

    onChangeSelecionaData = event => {

        let mesAno = event.target.value;        
        let arr = mesAno.split("-");
        const {filtro} = this.state;

        if(filtro === "mesAno") {
            this.setState({mes: parseInt(arr[1], 10), ano: parseInt(arr[0], 10)});
        } else {    
            if(event.target.name === "mesFinal") {
                
                this.setState({mesFinal: parseInt(arr[1], 10), anoFinal: parseInt(arr[0], 10)});            
            } else {
                this.setState({mesInicial: parseInt(arr[1], 10), anoInicial: parseInt(arr[0], 10)}); 
            } 
        }
    }

    onChangeFiltro = event => {

        this.setState({filtro: event.target.value});        
    }

    removeConta = id => {

        const fetchHeader = new Headers({
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("auth-token")
        });

        let contaRemovida;
        
        const url = "http://localhost:8080/contas/remove/" + id;
        var fetchParams = {
            method: 'DELETE', 
            body: JSON.stringify(contaRemovida), 
            headers: fetchHeader
        };

        fetch(url, fetchParams)
            .then(response => {
                if(response.ok) {
                    alert('Conta removida com sucesso!')
                    this.getContasTodas();
                } else {
                    alert('Erro ao remover conta!');
                }
            })
            .catch(response => {
                console.log("Error: " + response)
            })
        
    }

    formataData = (data) => {

        var d = Moment(data);        
        return d.format("DD/MM/YYYY");        
    }

    filtraOnClick = (event) => {

        const {mes, ano, mesInicial, anoInicial, mesFinal, anoFinal, filtro} = this.state;
        if(filtro === "tudo") {
            this.getContasTodas();
        } else {
            if(filtro === "mesAno") {
                this.getContasMesAno(mes, ano);
            } else {
                this.getContasPeriodo(mesInicial, anoInicial, mesFinal, anoFinal);
            }
        }
    }

    isDisabled = () => {

        if(this.state.filtro === "mesAno") {
            if(this.state.mes !== 0 && this.state.ano !== 0) {
                return false;
            } else {
                return true;
            }
        } else {
            if(this.state.mesInicial !== 0 && this.state.mesFinal !== 0) {
                return false;
            } else {
                return true;
            }
        }
        
    }

    renderBotaoFiltroTodas = () => {

        if(this.state.filtro === "tudo") {
            return  (
                <div className="form-group row">
                    <div className="col-md-6">
                        <input type="button" id="filtraConta" onClick={this.filtraOnClick} value="Filtrar" className="btn btn-primary"></input>
                    </div>                    
                </div>
                
            );
        }
    }

    renderFiltro = () => {

        const {filtro} = this.state;

        if(filtro === "mesAno") {
            return (
                <div className="form-group row">
                    <div className="col-sm-2">
                        <label htmlFor="mes" className="font-weight-bold">Mês/Ano</label>
                    </div>
                    <div className="col-sm-7">
                        <input id="mes" name="mes" type="month" className="form-control" onChange={this.onChangeSelecionaData}></input>
                    </div>
                    
                    <div className="col-sm-3">
                        <input type="button" id="filtraConta" onClick={this.filtraOnClick} disabled={this.isDisabled()} value="Filtrar" className="btn btn-primary"></input>
                    </div>
                </div> 
            );
        }
        if(filtro === "periodo") {
            return (
                <div className="form-group row">
                    <div className="col-sm-1">
                        <label htmlFor="mesInicial" className="font-weight-bold">Inicio</label>                        
                    </div>                    
                    <div className="col-sm-4">
                        <input id="mesInicial" name="mesInicial" type="month" className="form-control" onChange={this.onChangeSelecionaData}></input>                        
                    </div>
                    
                    <div className="col-sm-1">
                        <label htmlFor="mesFinal" className="font-weight-bold">Fim</label>
                    </div>
                    <div className="col-sm-4">
                        <input id="mesFinal" name="mesFinal" type="month" className="form-control" onChange={this.onChangeSelecionaData}></input>
                    </div>
                    
                    <div className="col-sm-1">
                        <input type="button" id="filtraConta" onClick={this.filtraOnClick} disabled={this.isDisabled()} value="Filtrar" className="btn btn-primary"></input>
                    </div>
                    
                </div>                
            );
        }
        
    }

    render() {
        const {usuario, totais, redirect} = this.state;
        //console.log(usuario);

        if(redirect === true) {            
            return(<Redirect to="/login"/>)
        } 
        return (
            <div className="container-fluid">
                <div className="row">
                    <h5 htmlFor="filtroMesPeriodo">Filtrar por:</h5>
                    <div className="col-sm-3">
                        <select id="filtroMesPeriodo" name="filtroMesPeriodo" className="form-control" onChange={this.onChangeFiltro}>
                            <option value="tudo">Todas as contas</option>
                            <option value="mesAno">Mês/Ano</option>
                            <option value="periodo">Período</option>
                        </select>                        
                    </div>
                    {this.renderBotaoFiltroTodas()}
                    {this.renderFiltro()}     
                </div>
                
                <ReactTable 
                    data={usuario.contas}
                    filterable
                    columns={[
                        {
                            Header: "Descrição",
                            accessor: "descricao"
                        },
                        {
                            Header: "Valor",
                            accessor: "valor",
                            Cell: (row) => {
                                if(row.original.isEntrada) {
                                    return <span className="text-success">(+) {row.original.valor}</span>
                                } else {
                                    return <span className="text-danger">(-) {row.original.valor}</span>
                                }
                            }
                        },
                        {
                            Header: "Data",
                            accessor: "data",
                            Cell: (row) => {
                                return this.formataData(row.original.data);
                            }
                        },
                        {
                            Header: "Data Final",
                            accessor: "dataFinal",
                            Cell: (row) => {
                                return row.original.isFixa ? this.formataData(row.original.dataFinal) : "-";
                            }
                        },
                        {
                            Header: "Entrada/Saída",
                            accessor: "isEntrada",
                            Cell: (row) => {
                                if(row.original.isEntrada) {
                                    return <span className="text-success">Entrada</span>
                                } else {
                                    return <span className="text-danger">Saída</span>
                                }                                                                
                            },
                            filterMethod: (filter, row) => {
                                if(filter.value === "ambos") {
                                    return true;
                                }
                                if(filter.value === "true") {
                                    return row[filter.id] === true;
                                }
                                return row[filter.id] === false;
                                
                            },
                            Filter: ({filter, onChange}) => {
                                
                                return (
                                <select
                                    onChange={event => onChange(event.target.value)}
                                    style={{ width: "100%" }}
                                    value={filter ? filter.value : "all"}
                                >
                                    <option value="ambos">Ambos</option>
                                    <option value="true">Entrada</option>
                                    <option value="false">Saída</option>
                                </select>);
                            }
                        },
                        {
                            Header: "Fixa/Variável",
                            accessor: "isFixa",
                            Cell: row => {
                                //console.log(row.original.isFixa);
                                return row.original.isFixa ? "Fixa" : "Variável";
                            },
                            filterMethod: (filter, row) => {
                                if(filter.value === "ambos") {
                                    return true;
                                }
                                if(filter.value === "true") {
                                    return row[filter.id] === true;
                                }
                                return row[filter.id] === false;
                                
                            },
                            Filter: ({filter, onChange}) => {                                
                                return (
                                    <select
                                        onChange={event => onChange(event.target.value)}
                                        style={{ width: "100%" }}
                                        value={filter ? filter.value : "all"}
                                    >
                                        <option value="ambos">Ambos</option>
                                        <option value="true">Fixa</option>
                                        <option value="false">Variável</option>
                                    </select>
                                );
                            }
                        },
                        {
                            Header: "Remover",
                            filterable: false,
                            Cell: row => (<button className="btn btn-primary" onClick={() => {this.removeConta(row.original.id)}}>Remover</button>)
                        }
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    noDataText="Não existem contas!"
                />
                

                <br/>
                <p className="font-weight-bold">Total do periodo:</p>
                
                <ReactTable 
                    data={totais}
                    columns={[
                        {
                            Header: "Entrada",
                            columns: [
                                {
                                    Header: "Fixa",
                                    accessor: "totalEntradaFixa",
                                    Cell: (row) => <span className="text-success">(+) {row.original.totalEntradaFixa}</span>                                                                
                                },
                                {
                                    Header: "Variável",
                                    accessor: "totalEntradaVariavel",
                                    Cell: (row) => <span className="text-success">(+) {row.original.totalEntradaVariavel}</span>
                                },
                                {
                                    Header: "Geral",
                                    accessor: "totalEntradaGeral",
                                    Cell: (row) => <span className="text-success">(+) {row.original.totalEntradaGeral}</span>                                   
                                }
                            ]
                        },
                        {
                            Header: "Saída",
                            columns: [
                                {
                                    Header: "Fixa",
                                    accessor: "totalSaidaFixa",
                                    Cell: (row) => <span className="text-danger">(-) {row.original.totalSaidaFixa}</span>
                                },
                                {
                                    Header: "Variável",
                                    accessor: "totalSaidaVariavel",
                                    Cell: (row) => <span className="text-danger">(-) {row.original.totalSaidaVariavel}</span>
                                },
                                {
                                    Header: "Geral",
                                    accessor: "totalSaidaGeral",
                                    Cell: (row) => <span className="text-danger">(-) {row.original.totalSaidaGeral}</span>
                                }
                            ]                            
                        },
                        {
                            Header: "Saldo",
                            accessor: "saldo",
                            Cell: (row) => {
                                if(row.original.saldo >= 0) {
                                    return <span className="text-success">(+) {row.original.saldo}</span>
                                } else {
                                    return <span className="text-danger">(-) {-row.original.saldo}</span>
                                }
                            }
                            
                        }
                    ]}
                    defaultPageSize={1}
                    noDataText="Não existem contas!"
                />                        
            </div>            
        );
    }
}

export default Table;