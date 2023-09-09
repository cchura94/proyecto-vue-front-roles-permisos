<template>
  <div class="card" v-if="$can('index', 'user')">
    <h1>Gestion Usuarios</h1>
    <Button
      v-if="$can('store', 'user')"
      label="Gestión Usuarios"
      icon="pi pi-external-link"
      @click="visible = true"
    />
    <input type="text" @keyup.enter="buscarUsuarios()" v-model="q" />
    <DataTable :value="usuarios" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Nombre"></Column>
      <Column field="email" header="Correo electronico"></Column>
      <Column header="Roles">
        <template #body="slotProps">
          <ul>
            <li v-for="rol in slotProps.data.roles" :key="rol.id">
              {{ rol.nombre }}
            </li>
          </ul>
        </template>
      </Column>
      <Column field="created_at" header="Creado En"></Column>

      <Column headerStyle="min-width:10rem;">
        <template #body="slotProps">
          <Button
            v-if="$can('update', 'user')"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editarUsuario(slotProps.data)"
          />
          <Button
            v-if="$can('delete', 'user')"
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning mt-2"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <!--
    <table border="1" v-if="$can('index', 'user')">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>CORREO</th>
          <th>CREADO EN</th>
          <th>GESTIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usuarios" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.created_at }}</td>
          <td>
            <button
              type="button"
              @click="editarUsuario(u)"
              v-if="$can('update', 'user')"
            >
              editar
            </button>
            <button
              type="button"
              @click="eliminarUsuario(u)"
              v-if="$can('delete', 'user')"
            >
              eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    -->
  </div>
  <div v-else>
    <h1>No tienes permiso para ver esta página</h1>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Usuarios"
    :style="{ width: '50vw' }"
    class="p-fluid"
  >
    <div v-if="$can('store', 'user') || $can('update', 'user')">
      <div class="field">
        <label for="name">Ingrese Nombre</label>
        <InputText
          id="name"
          v-model.trim="usuario.name"
          required="true"
          autofocus
        />
      </div>
      <br />

      <div class="field">
        <label for="email">Ingresar Correo:</label>
        <InputText
          id="email"
          v-model.trim="usuario.email"
          required="true"
          autofocus
        />
      </div>
      <br />
      <div class="field">
        <label for="pass">Ingresar Contraseña:</label>
        <InputText
          id="pass"
          v-model.trim="usuario.password"
          required="true"
          autofocus
        />
      </div>

      <br />
      <div class="field" v-if="$can('index', 'role')">

        <MultiSelect v-model="selectedRol" display="chip" :options="roles" optionLabel="nombre" placeholder="Seleccionar Rol"
    :maxSelectedLabels="5" class="w-full md:w-20rem" />

      </div>

      <br />
      <button type="button" @click="guardarUsuario()">Guardar Usuario</button>
    </div>
  </Dialog>
</template>

<script setup>
// importaciones
import { ref, onMounted } from "vue";
import UsuarioService from "./../../../service/UsuarioService.js";
import usuarioService from "./../../../service/UsuarioService.js";
import roleService from "./../../../service/RoleService.js";

const visible = ref(false);
const q = ref("");
const roles = ref([]);
const selectedRol = ref([])

// import ability from "../../../casl/ability"

//import { useAbility } from '@casl/vue';
//const { can } = useAbility();

// declaracion de variables o estados
const usuarios = ref([]);
const usuario = ref({ name: "", email: "", password: "" });

// ciclo de vida de un componente
onMounted(() => {
  getUsuarios();
  getRoles();
});
// metodos o funciones
const getUsuarios = async () => {
  const { data } = await usuarioService.listar();
  usuarios.value = data.data;
};

const getRoles = async () => {
  const { data } = await roleService.listar();
  roles.value = data;
};

const guardarUsuario = async () => {
  if (usuario.value.id) {
    await usuarioService.modificar(usuario.value.id, usuario.value, selectedRol.value );
  } else {
    await usuarioService.guardar(usuario.value);
  }
  usuario.value = { name: "", email: "", password: "" };
  visible.value = false;
  getUsuarios();
};

const editarUsuario = (us) => {
  selectedRol.value = [];
  usuario.value = us;
  visible.value = true;
// console.log(JSON.stringify(us.roles[0]))
  us.roles.forEach(ro => {
    const {pivot, ...rest} = ro
    selectedRol.value.push(rest)
  });
};

const eliminarUsuario = async (us) => {
  if (confirm("¿Esta seguro de eliminar al usuario?")) {
    try {
      await usuarioService.eliminar(us.id);
      getUsuarios();
    } catch (error) {
      console.log(error);
    }
  }
};

const buscarUsuarios = async () => {
  const { data } = await usuarioService.listar(q.value);
  usuarios.value = data.data;
};
</script>
