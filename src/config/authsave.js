export const authenticate = (res, next) => {
    if (window !== "undefiend") {
        sessionStorage.setItem("token", JSON.stringify(res.token))
        sessionStorage.setItem("user", JSON.stringify(res.username))
    }
   // next()
}

export const getTokenw=()=>{
    if (window !== "undefiend") {
       if(localStorage.getItem("accessToken")) {
        return JSON.parse(localStorage.getItem("accessToken"))
       }else{
        return false
       }
    }
}

export const getUser=()=>{
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