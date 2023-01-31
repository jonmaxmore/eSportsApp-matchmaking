
export type CreateContext = {
  dispatch?: () => void;
  items: {
    team_id: 0,
    team_room_id: "", 
    is_team_fulfilled: false,
    betAmount: 0,
    amountToBlc: 0,
    game_id: "",
    gameName: "",
    imageUrl: "",
    gameIcon: "",
    numberOfPlayerPerTeam: 0,
  },
  _addSearchMatchDetails: (item: any) => void;
};
