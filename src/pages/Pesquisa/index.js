import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import ListItem from "../../components/listitem";
import "./index.scss"

function Pesquisa(props) {
    const [filtro, setFiltro] = useState("")
    const [festival, setFestival] = useState([])
    const [artist, setArtist] = useState([])


    useEffect(() => {
        axiosFest.get("/evento/listar", {
            params: {
                pesquisa:filtro
            }
        }).then(res => {
            setFestival(res.data.eventos)
        }).catch(err => {
            console.error("Error getting festivals", err)
        })
        axiosFest.get(`/artistas/listar`, {
            params: {
                pesquisa: filtro,
                numero_resultados: 1000
            }
        }).then(res => {
            setArtist(res.data.artistas)
        }).catch(err => {
            console.error("Error getting artists", err)
        })
    }, [filtro])



    return (
        <div className={"Search page-container"}>
            <input className={"small-bar"} placeholder={"Encontrar um festival ou artista"} onChange={function (e) {
                setFiltro(e.target.value);
            }}/>
            <h2>Festivais</h2>
            <div className={"list"}>
                {festival.map(evento => <ListItem tipo={"evento"}{...evento} link={`/festival/${evento.id}`}/>)}
            </div>
            <h2>Artistas</h2>
            <div className={"list"}>
                {artist.map(artista => <ListItem cardType={"round"} tipo={"artista"} {...artista} link={`/artista/${artista.id}`}/>)}
            </div>

        </div>
    )
}


export default Pesquisa;