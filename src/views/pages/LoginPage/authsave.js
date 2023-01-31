export const authenticate = (res, next) => {
    if (window !== "undefiend") {
        sessionStorage.setItem("token", JSON.stringify(res.token))
        sessionStorage.setItem("user", JSON.stringify(res.user))
    }
   // next()
}

export const getToken=()=>{
    if (window !== "undefiend") {
       if(sessionStorage.getItem("token")) {
        return JSON.parse(sessionStorage.getItem("token"))
       }else{
        return false
       }
    }
}

export const getUser=()=>{
    if (window !== "undefiend") {
       if(sessionStorage.getItem("user")) {
        return JSON.parse(sessionStorage.getItem("user"))
       }else{
        return false
       }
    }
}
export const getUser_info=()=>{
    if (window !== "undefiend") {
       if(localStorage.getItem("userInfo")) {
        return JSON.parse(localStorage.getItem("userInfo"))
       }else{
        return false
       }
    }
}
export const logout=()=>{
    if (window !== "undefiend") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
   // next()
}
// /