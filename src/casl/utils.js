export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

export const redireccionPorRol = role => {
    if(role == 'super-admin') return {name: 'admin'}
    if(role == 'cajero') return {name: 'perfil'}
    if(role == 'gerente') return {name: 'usuario'}
    if(role == 'ventas') return {name: 'perfil'}
    return {name: 'Login'}
    
}
