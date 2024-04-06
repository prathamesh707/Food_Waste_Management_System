import { useContext, useState } from "react";
import { AuthContext } from "./authContext";

const AuthContextProvider = ({children})=>{


    const [isAuthenticated, setIsAuthenticated] = useState(true)
     const logout = () => {
        // Perform any necessary logout actions, such as clearing local storage, etc.
        setIsAuthenticated(false);
        console.log('logout from auth')
    };

    return ( 
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, logout}}>
        {children}
    </AuthContext.Provider>
    );
}


export const useAuthContext =  ()=>{
    return useContext(AuthContext)
}

export default AuthContextProvider