import React, {Component} from 'react';

class Form extends Component {

    constructor(props) {

        super(props);

        this.initialState = {            
            descricao: '',
            valor: 0,
            data: '',
            tipo: 0            
        }

        this.state = this.initialState;
    }

    handleChange = event => {

        const {name, value} = event.target;
        
        this.setState({
            [name]: value
        });
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {

        const {descricao, valor, data, tipo} = this.state;

        return (
            <form>
                <div className="form-group">
                    <label for="descricao">Descrição</label>
                    <input 
                        type="text" 
                        name="descricao"
                        id="descricao"
                        value={descricao} 
                        onChange={this.handleChange}
                        className="form-control"                        
                    />
                </div>

                <div className="form-group">
                    <label for="valor">Valor</label>
                    <input 
                        type="text" 
                        name="valor"
                        id="valor"
                        value={valor} 
                        onChange={this.handleChange}
                        className="form-control"   
                    />
                </div>

                <div className="form-group">
                    <label for="data">Data</label>
                    <input 
                        type="date" 
                        name="data" 
                        id="data"
                        value={data} 
                        onChange={this.handleChange}
                        className="form-control"   
                    />
                </div>

                <div className="form-group">
                    <label for="tipo">Tipo</label>
                    <select className="custom-select" name="tipo" id="tipo" onChange={this.handleChange}> 
                        <option value="1">Fixa</option>
                        <option value="2">Variável</option>
                    </select> 
                </div>
                <input type="button" className="btn btn-primary" value="Submit" onClick={this.submitForm} />
            </form>
        );
    }
}

export default Form;