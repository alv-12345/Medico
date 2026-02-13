import { createContext } from "react";
import { doctors } from "../assets/assets"; /* AppContext is used to store and share data globally across the app
so components can access info (like appointments, user details, etc.)without passing props through every level.*/

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'

    const value = {
        doctors,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider