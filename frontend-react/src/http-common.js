import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8090/apiux-prueba/api/tareas",
    headers: {
        "Content-type": "application/json"
    }
});