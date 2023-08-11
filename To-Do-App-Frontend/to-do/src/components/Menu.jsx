import { useEffect, useState , useContext } from "react";
import "./style.css";
import { UserAuth } from "../context/AuthContext";
import { getListsByUser } from "../api/getData";
import { SelectedOptionContext } from "../context/OptionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { addNewList } from "../api/addData";

const Menu = ({ isOpen, url , isMenuOpen}) => {
    const [lists , setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [newList, setNewList] = useState("")

    const {user} = UserAuth()
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext)


    useEffect(() => {
        if(user && Object.keys(user).length !== 0){
            getListsByUser(user,url).then((data) => {
               setLists(data);
               setIsLoading(false)})
        }
    },[user, url])

    const saveNewList = () => {
      addNewList(user,url,newList).then((data) => {
        if(data.ok){
          setLists([...lists, newList])
          setNewList("")
        }
      })
    }

    const handleOptionSelect = (newOption) => {
      setSelectedOption(newOption)
      isMenuOpen(false)
    }

    const getLists = () =>{
        return lists.map((list,index) =>{
            return(
                <li key={index} onClick={() => handleOptionSelect(list)}>{list}</li>
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
          {getLists()} 
          <li>
            <div class="input-group">
              <input type="text" class="form-control p-0" placeholder="Create a new list" value={newList} onChange={(event) => setNewList(event.target.value)}
              aria-label="Create a new list" aria-describedby="basic-addon2" />
              <div class="input-group-append m-">
                <button class="btn btn-primary-secondary rounded-circle" type="button" onClick={saveNewList}><FontAwesomeIcon icon={faAdd} /></button>
              </div>
            </div> 
          </li>
        </ul>}
      </ul>
    </div>
  );
};

export { Menu };
