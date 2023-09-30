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
    },
    loginConGoogleURL: () => {
        return Api().get(`/google-auth/redirect`);
    },
    /*loginConGoogle: (datos) => {
        return Api().post(`/google-auth/callback?code=${datos.code}&scope=${datos.scope}&authuser=${datos.authuser}&prompt=${datos.prompt}`)
    }*/
}