<template>
    <div class="card">
        <h3>Nombre Rol: <InputText type="text" v-model="role.nombre" /></h3>
        <h4>Detalle: <InputText type="text" v-model="role.detalle" /></h4>        

        <div class="card flex flex-wrap justify-content-center gap-3">
            <div class="flex align-items-center" v-for="permiso in permisos" :key="permiso.id">
                <Checkbox v-model="seleccionados" :value="permiso.id" />
                <label class="ml-2"> {{ permiso.nombre }} </label>
            </div>
        </div>
        <hr>
        <Button type="button" label="Guardar Cambios" @click="guardarCambios" />
        {{ seleccionados }}
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import RoleService from "../../../service/RoleService";
import permisoService from "../../../service/PermisoService";


    const route = useRoute()
    const role_id = route.params.id
    const role = ref({})
    const permisos = ref([])
    const seleccionados = ref([])

    onMounted(() => {
        getRole()
        getPermisos()
    })

    const getRole = async () => {
        const {data} = await RoleService.mostrar(role_id);
        role.value = data

        // cargar los permisos seleccionados
        data.permisos.forEach(per => {
            seleccionados.value.push(per.id)
        });
    }
    const getPermisos = async () => {
        const {data} = await permisoService.listar();
        permisos.value = data
    }

    const guardarCambios = async () => {
        if(confirm("¿Está seguro de modificar los permisos?")){
            role.value.nuevos_permisos = seleccionados.value
            const {data} = await RoleService.modificar(role_id, role.value)
            alert("Datos Actualizado");
        }

    }
</script>