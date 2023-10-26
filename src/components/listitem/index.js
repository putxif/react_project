import "./index.scss";
import {Link} from "react-router-dom";
//import {useFavorites} from "../../FavoritesProvider";
import Favbutton from "../favbutton";


const ListItem = (props) => {

    let background = `url(${(props.cardType === "bilhete") ? "/assets/icons/ticket.svg" : "https://upfest.site/public/" + (props.imagem || props.imagem_evento)})`;
    //const {toggleFavorite, isFavorite} = useFavorites(); //???? preciso disto??


    return <div className={"ListItem " + props.cardType}>
        {props.link ? <Link className={"image"} style={{backgroundImage: background}} to={props.link}/> :
            <div className={"image"} style={{backgroundImage: background}}/>}
        <div className={"info-container"}>
            <p className={"title"}>{props.artista || props.designacao || props.evento || props.nome}</p>
            {(props.data_hora_inicio || props.limite_vendas || props.data || props.data_evento) ?
                <p className={"date"}>
                    {props.limite_vendas && "Até "}
                    {
                        new Date(props.data_hora_inicio || props.limite_vendas || props.data || props.data_evento).toLocaleDateString("pt-PT", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}</p> : <p className={"date"}>Artista</p>}
            {(props.palco || props.local) && <p className={"location"}>{props.palco || props.local}</p>}
        </div>
        {props.cardType === "bilhete" ?
            <div className={"value-container"}>{props.custo + "€"}</div>
            : (props.cardType === "bilhetepassado" ?
                <div className={"icon-container"}><img src="/assets/icons/info.svg"/></div>
                : (props.cardType === "bilhetefuturo" ?
                    <div className={"icon-container"}><img src="/assets/icons/ticket.svg"/></div> :
                    <Favbutton tipo={props.tipo} id={props.id}/>))
        }
    </div>
}

export default ListItem;