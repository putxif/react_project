import "./index.scss";
import {Link} from "react-router-dom"
import Favbutton from "../favbutton";
import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import {useAuth} from "../../AuthProvider";


const CardFest = (props) => {

    const {user} = useAuth();

    const [saldo, setSaldo] = useState(0);
    let background = `url(https://upfest.site/public/${props.imagem})`;

    useEffect(() => {
        if (!!props.comprado) {
            axiosFest.get("/cashless/" + props.id + "/saldo", {
                params: {
                    participante: user.email
                }
            }).then(res => {
                //console.log("saldo do festival", res)
                setSaldo(res.data.saldo)
            }).catch((e) => {
                console.error("Erro getting saldo for festival" + props.id, e)
            })
        }
    }, [props.comprado])


    return <>
        <Link className={"card-festival" + (!!props.comprado ? " comprado" : "")} //ajuda aqui com o link *.*
                style={{backgroundImage: background}} to={"/festival/" + props.id}>
        <div className="info">
            {!!props.comprado && <div className={"status"}>a acontecer</div>}
            <p className={"title"}>{props.designacao}</p>
            <p className={"date"}>{new Date(props.data || props.data_evento).toLocaleDateString("pt-PT", {
                weekday: "long",
                day: "numeric",
                month: "long"
            })}</p>
            <p className={"location"}>{props.local}</p>
            {!props.comprado && <div className={"price"}>43,00€</div>}
        </div>
        {!!props.comprado && <div className={"dashed-line"}/>}
        <div className={"card-icon"}>{!props.comprado ? <Favbutton tipo={"evento"} id={props.id}/> //aquiiiii
            :
            <img src="/assets/icons/ticket.svg"/>}</div>
    </Link>
        {!!props.comprado && <div className={"d-flex space-between align-center background-dark"} style={{marginBottom: "15px"}}>
            <div className={"d-flex align-center"}><img className={"mr-1"} src="/assets/icons/ticket.svg"/><p>{props.serie || "Venda Final"}</p></div>
            <img src="/assets/icons/qr.svg"/>
        </div>}
        {!!props.comprado && <div className={"d-flex space-between align-center background-dark"} style={{marginBottom: "15px"}}>
            <div className={"d-flex align-center"}><img className={"mr-1"} src="/assets/icons/cash.svg"/><p>Saldo Cashless</p></div>
            {saldo}€
        </div>}
        </>
}


export default CardFest;