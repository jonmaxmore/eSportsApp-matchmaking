import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";
// https://lichess.org/game/export/{gameId}
// setAuthorizationToken();
const LichAPI = {

    // GET 
    // Export one game 
    // @@ /game/export/{gameId}
    exportOneGame: async (gameId: string) => {

        const resData: any = {
            method: 'get',
            url: `${config.apiUrlLich}/get-game/${gameId}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },

    // Export ongoing game of a user
    // @@ /api/user/{username}/current-game
    exportOngoingGameUser: async (username: string) => {

        const resData: any = {
            method: 'get',
            url: `${config.apiUrlLich}/api/user/${username}/current-game`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },

    // Export games of a user
    // @@ /api/games/user/{username}
    exportGamesUserOfUser: async (username: string) => {

        const resData: any = {
            method: 'get',
            url: `${config.apiUrlLich}/api/games/user/${username}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },

    // Post
    
    // Stream games by IDs 
    // @@ /api/games/export/_ids
    StreamGamesByIDs: async (ids: []) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/games/export/${ids}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data: ids
        };

        return await axios(resData);
    },

    // Stream games of users
    // @@ api/stream/games-by-users
    StreamGamesOfUsers: async (ids: []) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/stream/games-by-users`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.lichKey,
            },
            data: ids
        };

        return await axios(resData);
    },

    // Stream games By IDS
    // @@ /api/stream/games/{streamId}
    StreamGamesByIds: async (streamId: []) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/stream/games/{streamId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data: streamId
        };

        return await axios(resData);
    },

    // Add game IDs to stream
    // @@ /api/stream/games/{streamId}/add
    addGameIdsToStream: async (streamId: []) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/stream/games/{streamId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data: streamId
        };

        return await axios(resData);
    },

    // Get my ongoing games
    // @@ /api/account/playing
    getMyOngoingGames: async (playing: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/account/playing`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data: playing
        };

        return await axios(resData);
    },

    // Stream moves of a game
    // @@ /api/stream/game/{id}
    streamMovesOfGame: async (id: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/api/stream/game/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data: id
        };

        return await axios(resData);
    },

    // Import one game
    // @@
    importOneGame: async (pgn: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiUrlLich}/importgame`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + config.lichKey,
            },
            data:pgn
        };

        return await axios(resData);
    },
}
export default LichAPI;