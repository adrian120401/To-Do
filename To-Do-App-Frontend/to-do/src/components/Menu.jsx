import { useEffect, useState , useContext } from "react";
import "./style.css";
import { UserAuth } from "../context/AuthContext";
import { getListsByUser, getDefaultLists } from "../api/getData";
import { SelectedOptionContext } from "../context/OptionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addNewList } from "../api/addData";

const Menu = ({ isOpen, url , isMenuOpen}) => {
    const [defaultLists , setDefaultLists] = useState([])
    const [userLists , setUserLists] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [newList, setNewList] = useState("")

    const {user} = UserAuth()
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext)


    useEffect(() => {
        if(user && Object.keys(user).length !== 0){
            getDefaultLists(user,url).then((data) => {
               setDefaultLists(data)
               setIsLoading(false)})
            getListsByUser(user,url).then((data)=>{
              setUserLists(data)
              setIsLoading(false)
            })
        }
    },[user, url])

    const saveNewList = () => {
      addNewList(user,url,newList).then((data) => {
        if(data.ok){
          const value = {
            "id": userLists.length + 1,
            "name" : newList
          }
          setUserLists([...userLists, value])
          setNewList("")
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
                <li key={index} onClick={() => handleOptionSelect(list)}>{list}</li>
            )
        })
    }

    const getUserListsItems = () => {
      return userLists.map((list) => {
        return(
          <li key={list.id} onClick={() => handleOptionSelect(list.name)}>
            <div>
              {list.name}
                <button className="btn btn-primary-secondary rounded-circle" type="button"><FontAwesomeIcon icon={faTrash} /></button>
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
              <input type="text" class="form-control p-0" placeholder="Create a new list" value={newList} onChange={(event) => setNewList(event.target.value)}
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
