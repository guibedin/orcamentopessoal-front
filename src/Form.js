import React, {Component} from 'react';
import $ from 'jquery';

class Form extends Component {

    constructor(props) {

        super(props);

        this.initialState = {            
            descricao: '',
            valor: 0,
            data: '',
            duracao: 0,
            isEntrada: false,
            isFixa: false,
        }

        this.state = this.initialState;
    }
    
    handleChange = event => {

        const {name, value} = event.target;        
        
        if(name === "duracao" || name === "valor") {
            //console.log(name, value);
            this.setState({
                [name]: parseInt(value, 10)
            });
        } if(name === "isEntrada" || name === "isFixa") {
            this.setState({
                [name]: (value === "true")
            })
        } else {
            this.setState({
                [name]: value
            });
        }            
    }

    handleSubmit = conta => {
        
        //console.log(conta);

        const url = new URL("https://orcamentopessoal.tech:8443/contas/nova");
        //const url = "http://localhost:8080/contas/nova";
        const fetchHeader = new Headers({
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("auth-token")
        });
        
        var fetchParams = {
            method: 'POST', 
            body: JSON.stringify(conta), 
            headers: fetchHeader
        };
        
        fetch(url, fetchParams)
            .then(response => {
                //console.log(response);
                if(response.ok) {
                    alert('Conta adicionada com sucesso!');
                    this.setState(this.initialState);
                    $("#isEntrada").val("false");
                    $("#isFixa").val("false");               
                }
                else {
                    alert('Erro ao adicionar conta!');
                    //console.log(response.statusText)                
                }
            })
            .catch(error => {
                console.log("Error: " + error.message)                
            });                    
    }

    renderDuracao() {

        const {data, duracao, isFixa} = this.state;

        if(isFixa) {

            return(
                <div className="form-row">                       
                    <div className="form-group col-md-6">
                        <label htmlFor="data">Data inicial</label>
                        <input 
                            type="date" 
                            name="data" 
                            id="data"
                            value={data} 
                            onChange={this.handleChange}
                            className="form-control"   
                        />
                    </div>
            
                    <div className="form-group col-md-6">
                        <label htmlFor="duracao">Duração, em meses (>= 2)</label>
                        <input 
                            type="text" 
                            name="duracao" 
                            id="duracao"
                            value={duracao} 
                            onChange={this.handleChange}
                            className="form-control"   
                        />
                    </div>
                </div>
            )
        } else {

            return(
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="data">Data</label>
                        <input 
                            type="date" 
                            name="data" 
                            id="data"
                            value={data} 
                            onChange={this.handleChange}
                            className="form-control"   
                        />
                    </div>
                </div>
            );
        }          
    }

    submitForm = () => {
        this.handleSubmit(this.state);
    }

    render() {

        const {descricao, valor} = this.state;

        return (
            <div>
                
                <h5>Adicionar nova conta</h5> 
                         
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="descricao">Descrição</label>
                            <input 
                                type="text" 
                                name="descricao"
                                id="descricao"
                                value={descricao} 
                                onChange={this.handleChange}
                                className="form-control"                        
                            />
                        </div>
                        
                        <div className="form-group col-md-6">
                            <label htmlFor="valor">Valor</label>
                            <input 
                                type="text" 
                                name="valor"
                                id="valor"
                                value={valor} 
                                onChange={this.handleChange}
                                className="form-control"   
                            />
                        </div>                    
                    </div>                    
                    
                    { this.renderDuracao() }

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="isFixa">Fixa/Variável</label>
                            <select className="custom-select" name="isFixa" id="isFixa" onChange={this.handleChange}> 
                                <option value="false">Variável</option>
                                <option value="true">Fixa</option>
                            </select> 
                        </div>
                    
                        <div className="form-group col-md-6">
                            <label htmlFor="isEntrada">Entrada/Saida</label>
                            <select className="custom-select" name="isEntrada" id="isEntrada" onChange={this.handleChange}> 
                                <option value="false">Saida</option>
                                <option value="true">Entrada</option>
                            </select> 
                        </div>
                    </div>
                    
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.submitForm} />
                </form>
            </div>
        );
    }
}

export default Form;