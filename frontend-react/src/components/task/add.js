import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask, getFindById } from '../../actions/task';
import TaskDataService from '../../services/task.service';


class AddTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeIdentificador = this.onChangeIdentificador.bind(this);
        this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
        this.onChangeActivo = this.onChangeActivo.bind(this);
        this.guardarTarea = this.guardarTarea.bind(this);
        this.nuevaTarea = this.nuevaTarea.bind(this);
        this.obtenerTarea = this.obtenerTarea.bind(this);

        this.state = {
            currentTask: {
                idTarea: 0,
                identificador: null,
                descripcion: null,
                activo: true,
            },
            message: "",
        }
    }

    componentDidMount() {
        if (this.props.match.params.id !== 0 && this.props.match.params.id !== undefined) {
            this.obtenerTarea(this.props.match.params.id)
        }
    }

    onChangeIdentificador(e) {
        const identificador = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTask: {
                    ...prevState.currentTask,
                    identificador: identificador
                }
            }
        })
    }

    onChangeDescripcion(e) {
        const descripcion = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTask: {
                    ...prevState.currentTask,
                    descripcion: descripcion
                }
            }
        })
    }

    onChangeActivo(e) {
        const activo = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTask: {
                    ...prevState.currentTask,
                    activo: activo
                }
            }
        })
    }

    obtenerTarea(id) {
        TaskDataService.getById(id)
            .then((res) => {
                this.setState({
                    currentTask: res.data
                })
            })
            .catch((err) => {
                alert(err.response.message);
            })
    }

    guardarTarea() {
        const { identificador, descripcion, activo, idTarea } = this.state.currentTask;

        this.props
            .createTask(identificador, descripcion, activo, idTarea)
            .then((res) => {
                this.setState({
                    id: res.data.idTarea,
                    identificador: res.data.identificador,
                    descripcion: res.data.descripcion,
                    activo: res.data.activo
                })
                alert(res.message)
                this.props.history.push('/home')
            })
            .catch((error) => {
                alert(error.response.data.message);
            })
    }

    nuevaTarea() {
        this.setState({
            id: null,
            identificador: null,
            descripcion: "",
            activo: true,
            published: false,
            submitted: false
        })
    }

    render() {
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label>Identificador</label>
                        <input
                            type="number"
                            className="form-control"
                            id="identificador"
                            placeholder="Identificador"
                            required
                            value={this.state.currentTask.identificador}
                            onChange={this.onChangeIdentificador}
                            name="identificador"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripción"
                            id="descripcion"
                            required
                            value={this.state.currentTask.descripcion}
                            onChange={this.onChangeDescripcion}
                            name="descripcion"
                        />
                    </div>
                    <div className="form-group">
                        <label>Activo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Activo"
                            id="activo"
                            required
                            value={this.state.currentTask.activo}
                            onChange={this.onChangeActivo}
                            name="activo"
                        />
                    </div>
                    <button
                        onClick={this.guardarTarea}
                        className="btn btn-primary btn-block"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, { createTask, getFindById })(AddTask);