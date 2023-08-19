<template>
    <!--div>
        <h1>Ingresar</h1>
        {{ usuario }}
        <form @submit="funIngresar">
            <label for="">Ingrese Correo:</label>
            <input type="email" v-model="usuario.email">
            {{ errores.email }}
            <br>
            <label for="">Ingrese Contraseña:</label>
            <input type="password" v-model="usuario.password">
            {{ errores.password }}
            <br>
            <input type="submit">
        </form>
    </div-->
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Ingresar</span>
                    </div>

                    <div>
                    <form @submit="funIngresar">

                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Ingrese Correo</label>
                        <InputText id="email1" type="text" placeholder="Correo electronico" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="usuario.email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="usuario.password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button type="submit" label="Ingresar" class="w-full p-3 text-xl"></Button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue'
import authService from "./../../service/AuthService"
import { useRouter } from 'vue-router'
import ability from "../../casl/ability"

import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();

const checked = ref(false);

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

// const titulo = ref('Hola Mundo con Composition API 2');
const router = useRouter()
const usuario = ref({email: "", password: ""})
const errores = ref({})

const funIngresar = async (e) => {
    e.preventDefault();
    errores.value = {}
    try {
        const {data} = await authService.login(usuario.value)

        console.log(data);
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("permisos", JSON.stringify(data.user.permisos))

// controlar el tiempo de expiracion de token desde el front (cookies)
// recuperar contraseña via correo
// refresh token

        ability.update(data.user.permisos)

        router.push({name: 'admin'})

        // alert("Bienvenido...")
        
    } catch (error) {
        console.log("ERROR EN COMPONENTE LOGIN", error.response.data)
        if(error.response.data.errors){
            errores.value = error.response.data.errors
        }else{
            alert(error.response.data.message)
        }
    }
}

</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
