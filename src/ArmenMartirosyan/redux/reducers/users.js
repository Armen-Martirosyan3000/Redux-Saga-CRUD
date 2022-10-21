const initialState = {
    players: [],
};

const getPlayer = (state = initialState, { type, payload }) => {
    switch (type) {

        //READ
        case "SET_DATA":
            return { ...state, players: payload }
        //DELETE
        case "DELETE_DATA":
            return { ...state, players: payload }
        //CREATE
        case "CREATE_DATA":
            return { ...state, players: payload }

        default:
            return state;
    }
}

export default getPlayer;