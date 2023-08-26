import Api from "./Api"

export default {
    login(credenciales){
        return Api().post("/v1/auth/login", credenciales);
    },
    registro: function(datos){
        return Api().post("/v1/auth/register", datos);
    },
    perfil: () => {
        return Api().get("/v1/auth/profile");
    },
    logout: () => {
        return Api().post("/v1/auth/logout");
    },
    recuperarPassword: (datos) => {
        return Api().post("/reset-password", datos);
    },
    resetPassword: (datos) => {
        return Api().post("/cambio-password", datos);
    }
}