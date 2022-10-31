import axios from "axios";

//READ
export const fetchData = async () => {
    const data = await fetch("http://localhost:3200/workers")
    return await data.json()
};

//DELETE
export const deleteData = async ({ id }) => {
    await axios.delete(`http://localhost:3200/workers/${id}`)
    console.log(id);
}

//CREATE

export const createData = async ({ userData }) => {
    console.log(userData, 1111);
    await axios.post(`http://localhost:3200/workers`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            userData1: userData
        }
    )
}

//UPDATE

export const putData = async (id5) => {//այստեղ id5-ի փոխարեն կարող էր ցանկացած այլ անուն լինել
    console.log(id5, 1111);
    await axios.put(`http://localhost:3200/workers/${id5.editedData.id}`,//`http://localhost:3200/workers/${editedData[editTableUserData.userIndex].id}`
        {
            headers: {
                "Content-Type": "application/json"
            },
            userData: id5.editedData.userData2
        }
    )
}






