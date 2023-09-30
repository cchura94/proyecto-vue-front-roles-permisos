<template>
  <div class="card">

    <Toolbar class="mb-1">
        <template #start>
            <Button label="Nuevo Rol" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        </template>
        <template #end>
          
        </template>
    </Toolbar>

    <DataTable :value="roles" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="nombre" header="NOMBRE"></Column>
      <Column field="detalle" header="DETALLE"></Column>
      <Column headerStyle="min-width:10rem;">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editarRole(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning mt-2"
            @click="confirmDeleteRole(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="permisoDialog" :style="{width: '450px'}" header="Detalles Rol" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="role.nombre" required="true" autofocus :class="{'p-invalid': submitted && !role.nombre}" />
                <small class="p-error" v-if="submitted && !role.nombre">Nombre es obligatorio.</small>
            </div>
            <div class="field">
                <label for="det">Detalle</label>
                <InputText id="det" v-model.trim="role.detalle" required="true" autofocus :class="{'p-invalid': submitted && !role.detalle}" />
                <small class="p-error" v-if="submitted && !role.detalle">Detalle es obligatorio.</small>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Guardar" icon="pi pi-check" text @click="guardarRol" />
            </template>
    </Dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import RoleService from "../../../service/RoleService";

const roles = ref([]);
const permisoDialog = ref(false);
const role = ref({})

const router = useRouter()

onMounted(() => {
  getRoles();
});

const getRoles = async () => {
  const { data } = await RoleService.listar();
  roles.value = data;
};

const editarRole = (r) => {
    router.push(`/admin/role/${r.id}`)
}
const openNew = () => {
    permisoDialog.value = true
}
const guardarRol = async () => {
  await RoleService.guardar(role.value);
  permisoDialog.value = false

  getRoles()
}
</script>
