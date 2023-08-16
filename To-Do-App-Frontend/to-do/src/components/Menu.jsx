import { useEffect, useState , useContext } from "react";
import "./style.css";
import { UserAuth } from "../context/AuthContext";
import { getListsByUser, getDefaultLists } from "../api/getData";
import { ListsContext } from "../context/ListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addNewList } from "../api/addData";
import { deleteList } from "../api/deleteData";

const Menu = ({ isOpen, url , isMenuOpen}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [newList, setNewList] = useState("")

    const {user} = UserAuth()
    const { selectedOption, setSelectedOption,
        listUser, setListUser,
       defaultLists, setDefaultLists } = useContext(ListsContext)

    const saveNewList = () => {
      if(newList !== ""){
        addNewList(user,url,newList).then((data) => {
        if(data.ok){
          const value = {
            "id": listUser.length + 1,
            "name" : newList
          }
          setListUser([...listUser, value])
          setNewList("")
        }
      })
      }
    }
    const deleteItem = (e,id, list) => {
      e.stopPropagation()
      deleteList(user, url, id, list).then((data) => {
        if(data.ok){
          const newList = listUser.filter((list) => list.id !== id)
          setListUser(newList)
        }
      })
    }

    const handleOptionSelect = (newOption) => {
      setSelectedOption(newOption)
      isMenuOpen(false)
    }

    const getDefaultListsItems = () =>{
        return defaultLists.map((list,index) =>{
            return(
                <li key={index} onClick={() => handleOptionSelect(list)}
                className="list-group-item d-flex justify-content-between align-items-center">{list}</li>
            )
        })
    }

    const getUserListsItems = () => {
      return listUser.map((list) => {
        return(
          <li key={list.id} onClick={() => handleOptionSelect(list.name)}
           className="list-group-item d-flex justify-content-between align-items-center">
            {list.name}
            <div>
                <button className="btn btn-primary-secondary rounded-circle" type="button" onClick={(e) => deleteItem(e,list.id, list.name)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </li>
        )
      })
    }
  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        backgroundColor: "#f8f9fa",
        transition: "top 0.3s ease",
        display: isOpen ? "block" : "none",
        zIndex: 2,
      }}
    >
      <ul>
        {isLoading ? <p>Loading...</p> : 
        <ul>
          <li onClick={() => handleOptionSelect("")}>All</li> 
          {getDefaultListsItems()}
          <div style={{ borderBottom: '1px solid #333' }}></div>
          {getUserListsItems()}
          <li>
            <div className="input-group">
              <input type="text" className="form-control p-0" placeholder="Create a new list" value={newList} onChange={(event) => setNewList(event.target.value)}
              aria-label="Create a new list" aria-describedby="basic-addon2" />
              <div className="input-group-append m-">
                <button className="btn btn-primary-secondary rounded-circle" type="button" onClick={saveNewList}><FontAwesomeIcon icon={faAdd} /></button>
              </div>
            </div> 
          </li>
        </ul>}
      </ul>
    </div>
  );
};

export { Menu };
