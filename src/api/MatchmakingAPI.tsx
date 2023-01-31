import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const GameAPI = {
    getAllGames: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-games`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getAllGames_c: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-games_c`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getGameDetailsAndBetAmountByID: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-game-details/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    searchTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/search-team`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    searchOpponentTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/search-opponent-team`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getTeamsParticipants: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-my-team/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    readyToOppoSearchTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/ready-to-opponent-search`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    leaveRoomOrTeam: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/leave-team-and-match`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    cancelSearchTeamOrMatch: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/cancel-search-team-match`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    acceptOppoMatch: async (data: any) => {

        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/opponent-accept`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getMatchOrLobby: async (match_id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-match/${match_id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    readyToGamePlay: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/ready-to-game-play`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    readyToGamePlaycsgo: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/ready-to-game-playcsgo`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    create_Match: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/ready-to-game-play`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    createTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/create-team`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getCreatedTeam: async (id: number) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/create-team/my-team/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    getBetAmounts: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-game-bet-amounts`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    updateBetAmountToTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-bet-amount`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    joinMatch: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/create-team/join-game`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    notReadyToSearchOppoTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/not-ready-to-opponent-search`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    leaveCreatedTeamMatch: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/leave-created-team-match`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    searchOpponentCreatedTeam: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/search-opponent-created-team`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getJoinTeamPlayerCount: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/join-player-count/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    checkTeamAcceptedFoundMatchAPI: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/checkTeamAcceptedFoundMatch/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    getBonusDetailsAndAmountAPI: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/getBonusAmountAndDetails`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    }
}

export default GameAPI;