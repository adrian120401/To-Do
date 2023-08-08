import { createContext, useState } from "react";


export const SelectedOptionContext = createContext()


export function SelectedOptionsProvider({ children }) {
    const [selectedOption, setSelectedOption] = useState("")

    return (
        <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
          {children}
        </SelectedOptionContext.Provider>
      );
}