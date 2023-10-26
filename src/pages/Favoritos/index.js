import {useEffect, useState} from "react";
import axiosFest from "../../axiosfest";
import CardPagamento from "../../components/cardpagamento";
import {useAuth} from "../../AuthProvider";
import PendingPayments from "../../components/pendingpayments";
import ListItem from "../../components/listitem";
import "./index.scss"

function Favoritos(props) {
    const [pagamento, setPagamento] = useState([])
    const {user} = useAuth()
    const [favoritos, setFavoritos] = useState([])
    const [maxPag, setMaxPag] = useState(0)
    const [pagina, setPagina] = useState(0)

    useEffect(() => {

        axiosFest.get("/participante/pagamentos/listar", {
            params: {
                participante: user.email
            }
        }).then(res => {
            setPagamento(res.data.pagamentos)
        }).catch(err => {
            console.log("error getting payments", err)
        })
    }, [])

    const handlePageChange =  (next) => {
        setPagina(prev => {
            prev += (next ? 1 : -1)
            return prev;
        })
    }

    useEffect(() => {
        axiosFest.get("/participante/favoritos/listar", {
            params: {
                participante: user.email,
                pagina
            }
        }).then(res => {
            setFavoritos(res.data.favoritos)
            setPagina(res.data.paginacao.pagina)
            setMaxPag(res.data.paginacao.paginas)
        })
    }, [pagina])



    return (
        <div className={"favorites page-container"}>
            <PendingPayments/>
            <h2>Favoritos</h2>
            <div className={"list"}>
                {favoritos.map(f => <ListItem {...f} cardType={f.tipo === "artista" ? "round" : f.tipo} />)}
            </div>
            <div className={"list-buttons"}>
                {pagina > 0 && <div className={"small-button round prev"} onClick={() => handlePageChange()}><img src={"/assets/icons/arrow_right.svg"}/></div>}
                {pagina < maxPag - 1 && <div className={"small-button round"} onClick={() => handlePageChange(true)}><img src={"/assets/icons/arrow_right.svg"}/></div>}
            </div>

            <h2>Pagamentos Pendentes</h2>
            {pagamento.filter(p => p.estado !== "PAGO").map(payment => <CardPagamento {...payment}/>)}
            <h2>Outros pagamentos</h2>
            <div className={"list"}>
                {pagamento.map(payment => <CardPagamento {...payment}/>)}
            </div>


        </div>
    )
}


export default Favoritos;