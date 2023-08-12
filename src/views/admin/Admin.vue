<template>
  <h1>Administrador</h1>

  <button type="button" @click="salir">Salir</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const salir = () => {
  localStorage.removeItem("token");
  router.push({name: 'Login'})
}
</script>