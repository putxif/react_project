import "./index.scss"

const CardPagamento = (props) => {


    const background = `url("/assets/icons/card.svg")`
    return <>
            <div className={"card-pagamento"}>
            <div className={"image"} style={{backgroundImage: background}}/>
            <div className={"infos"}>
                <p className={"title"}>{props.tipo}</p>
                <p className={"paym-status " + props.estado}>{(props.estado === "PAGO" ? "Completo" : "Pendente")}</p>
                <p className={"date"}>{new Date().toLocaleDateString("pt-PT", {
                    day: "numeric",
                    month: "long",
                    year:"numeric"
                })}</p>
            </div>
            <div className={"paym-value"}>{props.valor + "€"}  </div>
        </div>
        {props.estado !== "PAGO" && <div className={"payment-details"}>
            <div className={"d-flex space-between"}><p>Entidade</p><p>1234</p></div>
            <div><p>Referência</p><p>123 123 123</p></div>
            <div><p>Valor</p><p>20,00 €</p></div>
        </div>}
        </>
}


export default CardPagamento;