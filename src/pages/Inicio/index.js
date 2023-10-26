import "./index.scss"
import CardFest from "../../components/cardfest";
import {useAuth} from "../../AuthProvider";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";


function Inicio(props) {
    const {user} = useAuth()
    const [comprado, setComprado] = useState([])

    const [sugestoes, setSugestoes] = useState([])

    useEffect(() => {
        axiosFest.get("/participante/bilhetes/listar", {
            params: {
                participante: user.email
            }
        }).then(res => {
            setComprado(res.data.atuais)
            //ja tenho os atuais

        }).catch(err => {
            console.error("Error getting bought tickets")
        })
        axiosFest.get("/evento/listar", {}).then(res => {
            setSugestoes(res.data.eventos)
        }).catch(err => {
            console.error("Error getting suggestions")
        })
        //nao tenho os atuais
    }, [])

    return (
        <div className={"Home page-container"}>
            <p className={"greetings"}>Bom dia, {user.nome}!</p>
            {comprado.map(atuais => <CardFest comprado tipo={"evento"} id={atuais.id_evento}{...atuais}/>)}
            <h2>Sugestões</h2>
            {sugestoes.map(evento => <CardFest  tipo={"evento"} id={evento.id}  {...evento}/>)}

        </div>
    )
}


export default Inicio;