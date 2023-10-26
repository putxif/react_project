import React, {useContext, useState} from "react";

const AuthContext = React.createContext({});

export default function AuthProvider(props) {
    const [user, setUser] = useState({});


    const logout = () => {
        setUser({})
    }

    return <AuthContext.Provider value={{user, setUser, logout}}>
        {props.children}
    </AuthContext.Provider>
}


export function useAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        //tem que ser sempre usado dentro do provider
        throw new Error("AuthContext tem de ser usado dentro do AuthProvider")
    }
    return authContext;
}
