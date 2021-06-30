import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask, getAll } from '../../actions/task';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            eliminado: false,
            idTarea: 0
        }
    }

    componentDidMount() {
        this.props.getAll();
    }

    eliminarTarea(id) {
        this.props
            .deleteTask(id)
            .then((res) => {
                alert('Se eliminó la tarea')
                this.props.getAll();
            })
            .catch((err) => {
                alert(err.response.message);
            })
    }

    render() {
        const { tasks } = this.props;

        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Identificador</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha de creación</th>
                        <th scope="col">Activo</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map((t, index) => {
                        return (
                            <tr key={t.idTarea}>
                                <td>{t.identificador}</td>
                                <td>{t.descripcion}</td>
                                <td>{t.fechaCreacion}</td>
                                {t.activo == true ? <td>Activo</td> : <td>Inactivo</td>}

                                <td><Link to={`/form/${t.idTarea}`} className="btn btn-primary btn-sm">Editar</Link></td>
                                <td>
                                    <button
                                        onClick={() => this.eliminarTarea(t.idTarea)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody >
            </table >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    }
}

export default connect(mapStateToProps, { getAll, deleteTask })(TaskList);