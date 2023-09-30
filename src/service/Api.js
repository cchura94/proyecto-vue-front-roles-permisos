import axios from "axios"

export const urlBase = "http://localhost:8000/api";

const App = () => {
    let token = localStorage.getItem("token");

    const api = axios.create({
        baseURL: urlBase,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+token
        },
        timeout: 30000
    });

    // error
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error)
            if(error.response.status === 401){
                console.log("INTERCEPTOR:  401 *******")
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
            if(error.response.status === 403){
                console.log("INTERCEPTOR:  403 *******")
            }

            return Promise.reject(error)
        }
    )
    return api;
}

export default App;