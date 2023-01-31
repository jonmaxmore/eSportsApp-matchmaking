export const Token = {
    saveToken: (user, token) => {
        setToken(token);
        setUserID(user.id);
        storeName(user.name);
        storeEmail(user.email);
        storeProfilePhoto(user.avatar_image);
    },
    getToken: () => {
        return getToken()
    },
    getUserID: () => {
        return getUserID()
    },
    getName: () => {
        return getName()
    },
    storeName: (name) => {
        return storeName(name);
    },
    getEmail: () => {
        return getEmail()
    },
    storeEmail: (email) => {
        return storeEmail(email);
    },
    getProfilePhoto: () => {
        return getProfilePhoto()
    },
    isLoggedIn: () => {
        if (getToken()) {
            return true;
        }
        return false;
    },
    clearStorage: () => {
        return localStorage.clear();
    }
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const isLoggedIn = () => {
    if (getToken()) {
        return true;
    }
    return false;
}

const setUserID = (user_id) => {
    localStorage.setItem('user_id', user_id);
}

export const getUserID = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.id : userInfo;
}

export const storeName = (name) => {
    localStorage.setItem('name', name);
}

export const getName = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.name : userInfo;
    // return localStorage.getItem('name');
}

export const storeEmail = (email) => {
    localStorage.setItem('email', email);
}

export const getEmail = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.email : userInfo;
    // return localStorage.getItem('email');
}

export const storeProfilePhoto = (profile_photo) => {
    localStorage.setItem('profile_photo', profile_photo ? profile_photo : '');
}

export const getProfilePhoto = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.avatar_image : userInfo;
    // return localStorage.getItem('profile_photo');
}