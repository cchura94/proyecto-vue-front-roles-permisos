<template>
  <h1>Layout Base</h1>

  <RouterLink to="/admin">ADMIN</RouterLink> |
  <RouterLink to="/admin/usuario">USUARIO</RouterLink>

  <RouterView />

   
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
