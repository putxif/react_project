import "./index.scss"
import CardFest from "../../components/cardfest";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import {useAuth} from "../../AuthProvider";
import ListItem from "../../components/listitem";
import PendingPayments from "../../components/pendingpayments";

function Bilhetes(props) {
    const {user} = useAuth()
    const [atual, setAtual] = useState([])
    const [passado, setPassado] = useState([])
    const [futuro, setFuturo] = useState([])

    useEffect(() => {
        axiosFest.get("/participante/bilhetes/listar", {
            params: {
                participante: user.email
            }
        }).then(res => {
            setAtual(res.data.atuais)
            setPassado(res.data.passados)
            setFuturo(res.data.futuros)
        }).catch(err => {
            console.error("Error getting bought tickets")
        })


    }, [])


    return (
        <div className={"Tickets page-container"}>
            <PendingPayments/>
            <h2>A decorrer</h2>
            <div className={"ticket"}>
                {atual.map(atuais => <CardFest comprado {...atuais} tipo={"evento"} link={`/festival/${atuais.id_evento}`}/>)}
            </div>
            <h2>Em breve</h2>
            <div className={"list"}>
            {futuro.map(futuros => <ListItem cardType={"bilhetefuturo"}{...futuros} tipo={"evento"} link={`/festival/${futuros.id_evento}`}/>)}
            </div>
            <h2>Festivais passados</h2>
            <div className={"list"}>
            {passado.map(passados => <ListItem cardType={"bilhetepassado"}{...passados} tipo={"evento"} link={`/festival/${passados.id_evento}`}/>)}
            </div>
        </div>
    )

}


export default Bilhetes;