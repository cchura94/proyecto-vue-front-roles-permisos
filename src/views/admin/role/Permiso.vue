<template>
    <Toolbar class="mb-1">
        <template #start>
            <Button label="Nuevo Permiso" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        </template>
        <template #end>
            <InputText v-model="buscar" @keyup.enter="listar()" placeholder="buscar..." />
        </template>
    </Toolbar>
            
    <DataTable :value="permisos" lazy paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
        ref="dt" tableStyle="min-width: 50rem" :totalRecords="totalRecords" :loading="loading" @page="onPage($event)">
        <Column field="detalle" header="DETALLE"></Column>
        <Column field="nombre" header="NOMBRE" style="width: 25%"></Column>
        <Column field="action" header="ACCION" ></Column>
        <Column field="subject" header="SUBJECT"></Column>
        <Column header="ROLES" :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
            <ul>
                <li v-for="(rol, index) in slotProps.data.roles" :key="index">
                {{ rol.nombre }}
                </li>
            </ul>
            </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
        <template #body="slotProps">
          <Button
            v-if="$can('update', 'permiso')"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editarPermiso(slotProps.data)"
          />
          <Button
            v-if="$can('delete', 'permiso')"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning mt-2"
            @click="confirmDeletePermiso(slotProps.data)"
          />
        </template>
      </Column>
        
    </DataTable>

    <Dialog v-model:visible="permisoDialog" :style="{width: '450px'}" header="Detalles permiso" :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="permiso.nombre" required="true" autofocus :class="{'p-invalid': submitted && !permiso.nombre}" />
                <small class="p-error" v-if="submitted && !permiso.nombre">Nombre es obligatorio.</small>
            </div>
            <div class="field">
                <label for="ac">Acción</label>
                <InputText id="ac" v-model.trim="permiso.action" required="true" autofocus :class="{'p-invalid': submitted && !permiso.action}" />
                <small class="p-error" v-if="submitted && !permiso.action">Accion es obligatorio.</small>
            </div>
            <div class="field">
                <label for="sub">Subject</label>
                <InputText id="sub" v-model.trim="permiso.subject" required="true" autofocus :class="{'p-invalid': submitted && !permiso.subject}" />
                <small class="p-error" v-if="submitted && !permiso.subject">Subject es obligatorio.</small>
            </div>
            <div class="field">
                <label for="det">Detalle</label>
                <InputText id="det" v-model.trim="permiso.detalle" required="true" autofocus :class="{'p-invalid': submitted && !permiso.detalle}" />
                <small class="p-error" v-if="submitted && !permiso.detalle">Detalle es obligatorio.</small>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Guardar" icon="pi pi-check" text @click="guardarPermiso" />
            </template>
    </Dialog>

</template>
<script setup>
import {ref, onMounted} from 'vue'
import permisoService from '../../../service/PermisoService'

const permisos = ref([])
const totalRecords = ref(0)
const loading = ref(false)
const lazyParams = ref({});
const buscar = ref("")
const permisoDialog = ref(false);
const permiso = ref({})

const submitted = ref(false);

onMounted(() => {
    listar()
})

const listar = async () => {
    loading.value = true;

    let page = lazyParams.value.page + 1
    let limit = lazyParams.value.rows

    const {data} = await permisoService.listarPaginacion(page, limit, buscar.value);
    permisos.value = data.data;
    loading.value = false;
    totalRecords.value = data.total;
}

const onPage = (event) => {
    lazyParams.value = event;
    listar();
};

const openNew = () => {
    permisoDialog.value = true
}
const hideDialog = () => {
    permisoDialog.value = false;
    submitted.value = false;
}
const guardarPermiso = async () => {

    if(permiso.value.id){
        submitted.value = true;
        if (permiso.value.nombre.trim()) {
            const {data} = await permisoService.modificar(permiso.value.id, permiso.value)
        }
    }else{
        submitted.value = true;
        if (permiso.value.nombre.trim()) {
            const {data} = await permisoService.guardar(permiso.value)
        }

    }
    listar();
    hideDialog()
    permiso.value = {};
}
const editarPermiso = (per) => {
    permiso.value = per
    openNew()
}
const confirmDeletePermiso = (per) => {
    
}
</script>