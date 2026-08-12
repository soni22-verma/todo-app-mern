const Base_url = import.meta.env.VITE_BASE_URL?.trim() || "http://localhost:5050"

const api={
    auth:{
        register:Base_url+"/api/auth/register",
        login:Base_url+"/api/auth/login"
    },
    todo:{
        createtodo:Base_url+"/api/tasks",
        getTodo:Base_url+"/api/tasks",
        updatetodo:Base_url+"/api/tasks",
        deletetodo:Base_url+"/api/tasks"
    }
}

export default api;
