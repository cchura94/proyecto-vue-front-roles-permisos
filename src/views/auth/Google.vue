<template>
    <h1>Autenticando... </h1>
    <h1>Google</h1>
</template>
<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ability from "../../casl/ability";
import { redireccionPorRol } from "../../casl/utils";
import authService from "../../service/AuthService";

const route = useRoute()
const router = useRouter()

onMounted(() => {
    actualizar()
})

const actualizar = async () => {

    localStorage.setItem("token", route.query.access_token)

    const {data} = await authService.perfil();
    console.log(data);
    if(!data.permisos){
        data.permisos = [];
    }
    data.permisos.push({action: 'show', subject: 'auth'})
    localStorage.setItem("permisos", JSON.stringify(data.permisos))
    localStorage.setItem("userData", JSON.stringify(data))
    ability.update(data.permisos)
    router.push({name: 'perfil'})
}
</script>