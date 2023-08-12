import Api from "./Api"

export default {
    listar(){
        return Api().get("/users");
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