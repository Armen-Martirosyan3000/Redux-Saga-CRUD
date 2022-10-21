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






