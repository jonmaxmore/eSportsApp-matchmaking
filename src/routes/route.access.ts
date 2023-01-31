import DefaultLayout from "@Layout/DefaultLayout";
import FormUser from "@Views/Settings/User/FormUser";
import HomePage from "@Views/pages/HomePage";
import LoginPage from "@Views/pages/LoginPage";
import Logout from "@Views/DummyPage/Logout";
import OTP from "@Views/pages/LoginPage/OTP";
import Register from "@Views/pages/Register";
import Matchmaking from "@Views/pages/Matchmaking";
import SelectGame from "@Components/Page/MatchMaking/Selectgame";
import SelectCustomGame from "@Components/Page/CustomGame/Selectgame";
import SelectAmount from "@Components/Page/MatchMaking/SelectAmountAndmode";
import LookingMatch from "@Components/Page/MatchMaking/LookingMatch";
import LobbyMyTeam from "@Components/Page/MatchMaking/LobbyMyTeam";
import MatachLobby from "@Components/Page/MatchMaking/MatachLobby";
import SingleTeam from "@Components/Page/MatchMaking/SingleTeam";
import CustomGame from "@Views/pages/CustomGame";
import SelectRoom from "@Components/Page/CustomGame/SelectRoom";
import RoomMember from "@Components/Page/CustomGame/RoomMember";
import RoomHost from "@Components/Page/CustomGame/RoomHost";
import CreatLobby from "@Components/Page/CustomGame/CreatLobby";
import NoneLayout from "@Layout/NoneLayout";
import Page404 from "@Views/pages/error/Page404";
import Page500 from "@Views/pages/error/Page500";
import Profile from "@Views/pages/Profile";
import { RouteCustom } from "@Routes/route.interface";
import Settings from "@Views/Settings";
import User from "@Views/Settings/User";
import { FileUploader } from '../views/DummyPage/FileUploader';
import ProfileDetail from "@Views/pages/Profile/ProfileDetail";
import ProfileTrophy from "@Views/pages/Profile/ProfileTrophy";
import ProfileBadge from "@Views/pages/Profile/ProfileBadge";
import DummyCustomGame from "@Views/DummyPage/CustomGame";
import Marketplace from "@Views/pages/Market/Marketplace";
import ItemMall from "@Views/pages/Market/ItemMall";



export const _routesDefault: RouteCustom[] = [
  {
    path: "/error",
    element: NoneLayout,
    children: [
      { path: "/error/404", element: Page404 },
      { path: "/error/500", element: Page500 },
      { path: "*", navigateElement: { to: "/error/404" } },
      { index: true, navigateElement: { to: "/error/500" } },
    ],
  },
  { path: "/login", element: LoginPage, requireAuth: false },
  { path: "/register", element: Register, requireAuth: false },
  { path: "/verify-otp", element: OTP, requireAuth: false },
  { path: "*", navigateElement: { to: "/error/404" }, requireAuth: false },
];

export const _requirePermission: RouteCustom[] = [
  {
    path: "/",
    element: DefaultLayout,
    children: [
      { index: true, navigateElement: { to: "/login" } },
      {
        path: "/home",
        // keyName: "home",
        // requireAuth: false,
        keyName: "dashboard",
        requireAuth: true,
        element: HomePage,
      },
      {
        path: "/matchmaking",
        keyName: "matchmaking",
        requireAuth: false,
        element: Matchmaking,
        children: [
          { index: true, navigateElement: { to: "/matchmaking/selectgame" } },
          {
            path: "/matchmaking/selectgame",
            keyName: "selectgame",
            requireAuth: false,
            element: SelectGame,
          },
          {
            path: "/matchmaking/selectamount",
            keyName: "selectamount",
            requireAuth: false,
            element: SelectAmount
          },{
            path: "/matchmaking/lookingmatch",
            keyName: "lookingmatch",
            requireAuth: false,
            element: LookingMatch
          },{
            path: "/matchmaking/lobbymyteam",
            keyName: "lobbymyteam",
            requireAuth: false,
            element: LobbyMyTeam
          },{
            path: "/matchmaking/matachlobby",
            keyName: "matachlobby",
            requireAuth: false,
            element: MatachLobby
          },{
            path: "/matchmaking/singleteam",
            keyName: "singleteam",
            requireAuth: false,
            element: SingleTeam
          }
        ],
      },
      {
        path: "/customgame",
        keyName: "customgame",
        requireAuth: false,
        element: CustomGame,
        children: [
          { index: true, navigateElement: { to: "/customgame/selectroom" } },
          {
            path: "/customgame/selectroom",
            keyName: "selectroom",
            requireAuth: false,
            element: SelectRoom,
          },{
            path: "/customgame/selectgame",
            keyName: "selectgame",
            requireAuth: false,
            element: SelectCustomGame,
          }
          ,{
            path: "/customgame/roommember",
            keyName: "roommember",
            requireAuth: false,
            element: RoomMember,
          },{
            path: "/customgame/roomhost",
            keyName: "roomhost",
            requireAuth: false,
            element: RoomHost,
          },{
            path: "/customgame/creatlobby",
            keyName: "creatlobby",
            requireAuth: false,
            element: CreatLobby,
          }
        ],
      },
      {
        path: "/profile",
        keyName: "profile",
        requireAuth: false,
        element: Profile,
      },
      {
        path: "/profile-detail",
        keyName: "profile-detail",
        requireAuth: false,
        element: ProfileDetail,
      },
      {
        path: "/profile-trophy",
        keyName: "profile-trophy",
        requireAuth: false,
        element: ProfileTrophy,
      },
      {
        path: "/profile-badge",
        keyName: "profile-badge",
        requireAuth: false,
        element: ProfileBadge,
      },
      {
        path: "/market",
        keyName: "market",
        requireAuth: false,
        element: Marketplace,
      },
      {
        path: "/market-itemmall",
        keyName: "market-itemmall",
        requireAuth: false,
        element: ItemMall,
      },
      {
        path: "/settings",
        element: Settings,
        keyName: "settings",
        requireAuth: false,
        children: [
          { index: true, navigateElement: { to: "/settings/user" } },
          {
            path: "/settings/user",
            element: User,
            children: [
              // { index: true, element: Settings },
              { path: "/settings/user/create", element: FormUser },
              { path: "/settings/user/edit/:userId", element: FormUser },
              {
                path: "*",
                keyName: "error",
                navigateElement: { to: "/error/404" },
              },
            ],
          },
          {
            path: "*",
            keyName: "error",
            navigateElement: { to: "/error/404" },
          },
        ],
      },
      { path: "*", keyName: "error", navigateElement: { to: "/error/404" } },
      {
        path: "/logout",
        keyName: "logout",
        requireAuth: false,
        element: Logout,
      },
      {
        path: "/test-file",
        keyName: "testFileUploader",
        requireAuth: false,
        element: FileUploader,
      },
      // {
      //   path: "/customgame",
      //   keyName: "customegame",
      //   requireAuth: false,
      //   element: CustomGame,
      // },
      {
        path: "/market",
        keyName: "market",
        requireAuth: false,
        element: CustomGame,
      },
      
    ],
  },
];

export const routes: RouteCustom[] = [..._requirePermission, ..._routesDefault];

export const getRoutes = () => {};
