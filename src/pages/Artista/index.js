import "./index.scss"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import ListItem from "../../components/listitem";
import Favbutton from "../../components/favbutton";


function Artista(props) {
    const {id_artista} = useParams()

    const [artist, setArtist] = useState({})
    const [nextConcert, setNextConcert] = useState([])

    useEffect(() => {
        axiosFest.get(`/artistas/${id_artista}/detalhes`, {}).then(res => {
            setArtist(res.data.artista)
        }).catch(err => {
            console.error("Error getting bought tickets", err)
        })
        axiosFest.get(`/artistas/${id_artista}/concertos`, {}).then(res => {
            setNextConcert(res.data.concertos)
        }).catch(err => {
            console.error("Error getting next concerts", err)
        })


    }, [])

    if (!artist.nome) {
        return <div className={"Artist"}>
            <p>Não tem artista</p>
        </div> }



    return (
        <div className={"Artist page-container"}>
            <div className={"artist-image-container"}>
                <div className={"artist-image"}>
                    <div className={"artist-background"} style={{backgroundImage: `linear-gradient(98deg, rgba(24, 24, 24, 0.98) 11.29%, rgba(24, 24, 24, 0.35) 98.25%), url(https://upfest.site/public/${artist.imagem})`}} />
                    <div className={"artist-info"}>
                        <p className={"name"}>{artist.nome.toUpperCase()}</p>
                        <p className={"profession"}>{artist.estilo}</p>
                    </div>
                    <Favbutton tipo={"artista"} id={Number(id_artista)}/>
                    <div className={"artist-photo"}>
                        <img src={`https://upfest.site/public/${artist.imagem}`} />
                    </div>
                </div>
             </div>

            <h2>Próximos concertos</h2>
            <div className={"list"}>
                {nextConcert.map(concerto => <ListItem {...concerto} tipo={"evento"} id={concerto.evento_id} link={`/festival/${concerto.evento_id}`}/>)}
            </div>
            <h2>Sobre</h2>
            <p className={"informacoes"}>{artist.biografia}</p>


        </div>
    )

}


export default Artista;