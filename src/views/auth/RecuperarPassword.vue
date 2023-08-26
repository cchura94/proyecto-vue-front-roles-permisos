<template>
    <h1>Recuperar Contraseña</h1>
    <p>¿Olvidaste tu contraseña? Ningún problema. Simplemente háganos saber su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña que le permitirá elegir una nueva.</p>
    <label for="">Correo electrónico</label>
    <input type="email" v-model="email">
    <button @click="sendResetPassword()">Enviar link para restablecer la contraseña</button>
</template>

<script setup>
import { ref } from "vue"
import AuthService from "../../service/AuthService"

const email = ref("")

const sendResetPassword = async () => {
    const {data} = await AuthService.recuperarPassword({email: email.value})
    console.log(data);
}
</script>