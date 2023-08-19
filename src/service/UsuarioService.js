import Api from "./Api"

export default {
    listar(q=''){
        return Api().get("/users?q="+q);
    },
    guardar(datos){
        return Api().post("/users", datos);
    },
    mostrar(id){
        return Api().get(`/users/${id}`);
    },
    modificar(id, datos){
        return Api().put(`/users/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/users/${id}`);
    },
}