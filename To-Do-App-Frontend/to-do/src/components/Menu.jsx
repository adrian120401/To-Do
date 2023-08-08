import { useEffect, useState , useContext } from "react";
import "./style.css";
import { UserAuth } from "../context/AuthContext";
import { getListsByUser } from "../api/getData";
import { SelectedOptionContext } from "../context/OptionsContext";

const Menu = ({ isOpen, url , isMenuOpen}) => {
    const [lists , setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const {user} = UserAuth()
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext)


    useEffect(() => {
        if(user && Object.keys(user).length !== 0){
            getListsByUser(user,url).then((data) => {
               data.unshift("All")
               setLists(data);
               setIsLoading(false)})
        }
    },[user, url])


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
        zIndex: 1,
      }}
    >
      <ul>
        {isLoading ? <p>Loading...</p> : <ul>{getLists()}</ul>}
      </ul>
    </div>
  );
};

export { Menu };
