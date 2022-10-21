//READ
export const getDataPlayer = () => ({
    type: "FETCH_DATA"
});

export const setDataPlayer = (payload) => ({
    type: "SET_DATA",
    payload,
});


//DELETE
export const deleteDataPlayer = (payload) => ({
    type: "DELETE_DATA",
    id: payload,
});


//CREATE
export const postDataPlayer = (payload) => ({
    type: "CREATE_DATA",
    userData: payload,
});

