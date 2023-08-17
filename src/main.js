// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin } from '@casl/vue';
import ability from './casl/ability';

import App from './App.vue'
import router from './router'

const app = createApp(App)
// CASL.js
app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
})

app.use(createPinia())
app.use(router)

app.mount('#app')
