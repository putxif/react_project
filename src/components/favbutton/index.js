import {useFavorites} from "../../FavoritesProvider";
import {useState} from "react";

const FavButton = ({tipo, id}) => {
    const {toggleFavorite, isFavorite} = useFavorites();

    const handleToggle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(tipo, id);
    }

    return(
        <div className={"icon-container"} onClick={handleToggle}>
            <img src={`/assets/icons/heart_${isFavorite(tipo, id) ? "full" : "open"}.svg`}/>
    </div>)
}

export default FavButton;