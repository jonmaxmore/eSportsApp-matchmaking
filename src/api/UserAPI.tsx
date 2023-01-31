import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const UserAPI = {
    getProfile: async (uid: number) => {
        
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/profile/${uid}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    getUserProfile: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/user-profile`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },

    create_wallet: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/create-wallet-account`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    getFriendRequestAPI: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/v1/fetch-friend-request`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    getFavouriteFriendAPI: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/v1/fetchFavouriteFriend`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    getOnlineFriendAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/onlineFriends`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getOfflineFriendAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/offlineFriends`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getUserDetail: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/details`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    acceptRejectRequestAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/acceptRejectRequest`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getUserTrophies: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-trophies`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getUserBadges: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-badges`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getNftCategories: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-nft-categories`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getNftItems: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-nft-items`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getFollowers: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-follwers`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getFollowing: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-follwing`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getPostHistory: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-post-history`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getMatchHistory: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-matches-history`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getRakingList: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-ranking-list`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    removeFollowers: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/remove-followers`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    removeFollowing: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/remove-following`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    updateUserAvatarName: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-avtar-name`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    updateUserEmail: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-email`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    updateUserPassword: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-password`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    updateUserLanguage: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-language`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    updateUserMobileTabLoginStatus: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-mobile-tab-login-status`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    deleteUserAccount: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/delete-user-account`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    searchFriendAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/searchFriend`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    sendFriendRequestAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/send-friend-request`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    removeFriendRequestAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/remove-friend-request`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    getUserLinkGames: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/link-user-games`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    linkGameAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/link-game`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    getInviteFriendListAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/v1/fetchInviteFriend`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getFriendListAPI: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/friendList`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    getBlockedUsers: async (data: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-blocked-users`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getBlockedUserAPI: async (data: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/blockedUsers`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    updateBlockedUserStatus: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-blocked-user-status`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    blockUnblockUserAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/blockUnblockUser`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    generateSpriteImage: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-generate-sprite-image`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    getRanking: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-game-ranking-list`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return await axios(resData);
    },
    getAllGameList: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-all-games`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    getAllusers: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/getAllusers`,
            headers: {
                'Content-Type': 'application/json'
            },
            
            
        };

        return await axios(resData);
    },

    updateuser_m: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/updateuser_m`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);



    },
    fetchWalletBalance: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-wallet-balance`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    walletPasswordVerification: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-wallet-private-verify`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    getFriendListToCreateSocketRoomAPI: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-friend-list`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    generateOTPAPI: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/generateOTP`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return await axios(resData);
    },
    validateOTPAPI: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/validateOTP`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    getNickNameOfFriendAPI: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/getNickNameOfFriend/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    addNickNameToFriendAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/addNickName`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    makeFavouriteUnFavouriteAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/favourite`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    removeFriendAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/removeFriend`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    followUnfollowAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/followunfollow`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
}

export default UserAPI;