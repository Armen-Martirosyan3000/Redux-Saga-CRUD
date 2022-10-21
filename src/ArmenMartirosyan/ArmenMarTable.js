// import React from "react";
import React, { useEffect, useState } from "react";
import "./ArmenMarTable.css";
import { Link } from "react-router-dom";
import { getDataPlayer, deleteDataPlayer, postDataPlayer } from "./redux/actions/getApi";
import { useSelector, useDispatch } from 'react-redux'

// initial state-սկզբնական վիճակն է
const initialValues = {
  name: "",
  surname: "",
  salary: ""
}

function ArmenMarTable() {
  const [userData, setUserData] = useState(initialValues)
  const [users, setUsers] = useState([])
  const [editTableUserData, setEditTableUseData] = useState({
    isEdit: false,
    userIndex: null
  });

  //READ(GET)-backend-ի հետ կապ
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataPlayer())
  }, []);

  const users1 = useSelector(store => store.getPlayer.players);
  console.log(users1)

  //filling in all Inputs and only then activating the add button-բոլոր Input-ների լրացում և միայն այդ դեպքում add կոճակի ակտիվացում 
  const isFilledFields = userData.name && userData.surname && userData.salary

  //Add operation
  const handleSubmitUser = (e) => {
    e.preventDefault()

    //inputs check that all fields are complete-input-ների բոլոր դաշտերը լրացվածության ստուգում
    if (isFilledFields) {

      //user check, is there an existing user or are we going to add a new use-user-ի ստուգում՝ առկա user է թե նոր user ենք ավելացնելու     
      if (editTableUserData.isEdit) {
        const editedData = users1;
        editedData.splice(editTableUserData.userIndex, 1, userData);
        setUsers(editedData);
        setEditTableUseData({
          isEdit: false,
          userIndex: null
        })
        //UPDATE-backend-ի հետ կապ
        fetch(`http://localhost:3200/workers/${editedData[editTableUserData.userIndex].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        })

        //CREATE-backend-ի հետ կապ
      } else {
        dispatch(postDataPlayer(userData))
      }
      setUserData(initialValues)
    }
  }

  // DELETE(remove) operation-backend-ի հետ կապ
  const handleRemoveClick = (id) => {
    dispatch(deleteDataPlayer(id))
  }

  // Clean operation
  const handleCleanClick = () => setUserData(initialValues);

  // Edit operation
  const handleEditСlick = (data, index) => {
    setUserData(data);
    setEditTableUseData({
      isEdit: true,
      userIndex: index
    })
  }
  return (
    <div className="body1">
      <div className="wrapper1">
        <div className="wrapper-content1">
          <div className="table-data1">
            <table className="table1">
              <th className="th1">#</th>
              <th className="th1">User Name</th>
              <th className="th1">User Surname</th>
              <th className="th1">User Salary</th>
              <th className="th1">Actions</th>
              <tbody>
                {users1?.map((user, index) => (
                  <tr key={index}>
                    <td className="td1">{index + 1}</td>
                    <td className="td1">{user.name}</td>
                    <td className="td1">{user.surname}</td>
                    <td className="td1">{user.salary}</td>
                    <td>
                      <div>
                        <button className="edit-action1" onClick={() => handleEditСlick(user, index)}>Edit</button>
                        <button className="remove-action1" onClick={() => handleRemoveClick(user.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <form className="form1" onSubmit={handleSubmitUser} onReset={handleCleanClick}>
              <input className="input1" placeholder="Write your name"
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  name: e.target.value
                }))}
                value={userData.name}
              />
              <input className="input1" placeholder="Write your surname"
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  surname: e.target.value
                }))}
                value={userData.surname}
              />
              <input className="input1" placeholder="Write your salary"
                onChange={(e) => setUserData((prevState) => ({
                  ...prevState,
                  salary: e.target.value
                }))}
                value={userData.salary}
              />
              <div className="buttons-wrapper1">
                {/* Clean button */}
                <button type="reset" className="butt1">Clean</button>
                {/*Edit and Add buttons*/}
                <button type="submit" className="butt2">{editTableUserData.isEdit ? "Edit" : "Add"}</button>
              </div>
            </form>
            <div>
              {/* Login button */}
              <Link to="/">
                <button className="home" type="button">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArmenMarTable