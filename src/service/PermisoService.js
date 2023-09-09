import Api from "./Api"

export default {
    listar(q=''){
        return Api().get("/permiso");
    },
    listarPaginacion(page=1, limite=10, q=''){
        return Api().get(`/permiso/paginacion?page=${page}&limit=${limite}&q=${q}`);
    },
    guardar(datos){
        return Api().post("/permiso", datos);
    },
    mostrar(id){
        return Api().get(`/permiso/${id}`);
    },
    modificar(id, datos){
        return Api().put(`/permiso/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/permiso/${id}`);
    },
}