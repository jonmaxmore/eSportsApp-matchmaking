export const Token = {
    saveToken: (user: any, token: any) => {
        setToken(token);
        // setUserID(user.id);
        // storeName(user.name);
        // storeEmail(user.email);
        // storeProfilePhoto(user.profile_photo);
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
    // storeName: (name: any) => {
    //     return storeName(name);
    // },
    getEmail: () => {
        return getEmail()
    },
    // storeEmail: (email: any) => {
    //     return storeEmail(email);
    // },
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

export const setToken = (token: any) => {
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

// const setUserID = (user_id: any) => {
//     localStorage.setItem('user_id', user_id);
// }

export const getUserID = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.id : userInfo;
}

// export const storeName = (name: any) => {
//     localStorage.setItem('name', name);
// }

export const getName = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.name : userInfo;
    // return localStorage.getItem('name');
}

export const getUserAvatarName = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.avatar_unique_name : userInfo;
}

// export const storeEmail = (email: any) => {
//     localStorage.setItem('email', email);
// }

export const getEmail = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.email : userInfo;
    // return localStorage.getItem('email');
}

export const getWalletAmout = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.wallet_balance : userInfo;
    // return localStorage.getItem('email');
}
// export const storeProfilePhoto = (profile_photo: any) => {
//     localStorage.setItem('profile_photo', profile_photo ? profile_photo : '');
// }

export const getProfilePhoto = () => {
    let userInfo: any = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return userInfo ? userInfo.avatar_image : userInfo;
    // return localStorage.getItem('profile_photo');
}