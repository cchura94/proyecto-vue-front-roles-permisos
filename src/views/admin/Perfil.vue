<template>
  <div class="card" v-if="user">
    <h4>NOMBRE: {{ user.name }}</h4>
    <h4>CORREO: {{ user.email }}</h4>
    <h4>ROL:</h4>
    <ul>
      <li v-for="rol in user.roles" :key="rol.id">{{ rol.nombre }}</li>
    </ul>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import authService from "../../service/AuthService";

const user = ref(null)

onMounted(() => {
  getPerfil()
});

const getPerfil = async () => {
  const {data} = await authService.perfil();
  user.value = data
}
</script>
