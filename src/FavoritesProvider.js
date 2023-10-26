import React, {useContext, useEffect, useState} from "react";
import axiosFest from "./axiosfest";
import {useAuth} from "./AuthProvider";

const ContextoFavoritos = React.createContext({});

function ProviderFavoritos(props) {
    const [favoritos, setFavoritos] = useState({
        "evento": [],
        "artista": []
    });
    const [loadingFavs, setLoadingFavs] = useState(false)

    const {user} = useAuth();//TODO usar este email quando estiver a funcionar


    function isFavorite(tipo, id) {
        return favoritos[tipo].includes(id)
    }

    useEffect(() => {
        if (user?.email) {
            setLoadingFavs(true)
            //TODO listar favoritos da bd
            axiosFest.get("/participante/favoritos/listar", {
                params: {
                    participante: user.email,
                    apenas_ids: 1
                }
            }).then(res => {
                const favs = res.data.ids_favoritos;
                setFavoritos({
                    "evento": favs.eventos,
                    "artista": favs.artistas
                })
            }).finally(() => setLoadingFavs(false))
        }
    }, [user?.email]) //usar os apenas.ids ? se sim, é em substituicao disto certo? e uso onde?

    useEffect(() => {
        console.log("favoritos", favoritos)
    }, [favoritos.evento, favoritos.artista])

    function toggleFavorite(tipo, id) { //tipo => "evento" | "artista"
        if (!["evento", "artista"].includes(tipo)) return

        //fazer toggle
        axiosFest.post(`/participante/favoritos/toggle_${tipo}`, {
            participante: user.email,
            [tipo]: id
        }).then(res => {
            console.log("toggle favorito do", tipo, "com sucesso")

            if (!res.data.favorito) {
                //remover id da lista
                favoritos[tipo] = favoritos[tipo].filter((el) => {
                    return el !== id
                })
            } else {
                //não é favorito => adicionar
                favoritos[tipo].push(id);
            }

            setFavoritos({...favoritos});


        }).catch(res => {
            console.log("error")
        })
    }

    return <ContextoFavoritos.Provider value={{
        toggleFavorite,
        isFavorite,
        favoritos
    }}>
        {loadingFavs ? null : props.children}
    </ContextoFavoritos.Provider>
}

export default ProviderFavoritos;

function useFavorites() {
    const favoritesContext = useContext(ContextoFavoritos);
    if (!favoritesContext) {
        //tem que ser sempre usado dentro do provider
        throw new Error("AuthContext tem de ser usado dentro do AuthProvider")
    }
    return favoritesContext;
}

export {ContextoFavoritos, useFavorites};
