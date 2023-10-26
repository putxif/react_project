import {useParams} from "react-router-dom";
import ListItem from "../../components/listitem";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import "./index.scss"
import Favbutton from "../../components/favbutton";


function Festival(props) {
    const {id_festival} = useParams();
    const [concertos, setConcertos] = useState([])
    const [detalhes, setDetalhes] = useState([])
    const [bilhetes, setBilhetes] = useState([])

    useEffect(() => {
        axiosFest.get(`/evento/${id_festival}/concertos/listar`, {}).then(res => {
            setConcertos(res.data.concertos)
        }).catch(err => {
            console.error("Error getting bought tickets", err)
        })
        axiosFest.get(`/evento/${id_festival}/detalhes`, {}).then(res => {
            setDetalhes(res.data.evento)
        }).catch(err => {
            console.error("Error getting bought tickets")
        })
        axiosFest.get(`/evento/${id_festival}/series_bilhetes/listar`, {}).then(res => {
            setBilhetes(res.data.series)
        }).catch(err => {
            console.error("Error listing festival tickets", err)
        })

    }, [])

    //bugs nos favbutton. favbutton no sitio certo?
    return (
        <div className={"Festival page-container"}>
            <div className={"festival-image"} style={{backgroundImage: `url(https://upfest.site/public/${detalhes.imagem}`}}>
                <Favbutton tipo={"evento"} id={Number(id_festival)}/>
            </div>
            <h2>Concertos</h2>
            <div className={"list"}>
                {concertos.map(concerto => <ListItem cardType={"round"} {...concerto} tipo={"artista"} id={concerto.artista_id} link={`/artista/${concerto.artista_id}`}/>)}
            </div>
            <h2>Informaçoes</h2>
            <p className={"informacoes"}>{detalhes.descricao}</p>
            <h2>Bilhetes</h2>
            <div className={"list"}>
                {bilhetes.map(evento => <ListItem cardType={"bilhete"}{...evento}/> )}
            </div>



        </div>
    )
}


export default Festival;