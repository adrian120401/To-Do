import { createContext, useState } from "react";


export const ListsContext = createContext()


export function ListsProvider({ children }) {
    const [listUser, setListUser] = useState([])
    const [defaultLists, setDefaultLists] = useState([])
    const [selectedOption, setSelectedOption] = useState("")

    return (
        <ListsContext.Provider value={{ listUser, setListUser, defaultLists,
         setDefaultLists ,selectedOption,setSelectedOption }}>
          {children}
        </ListsContext.Provider>
      );
}