import * as favoritesTemplate from "../favorites/favoritesTemplate.js";
import { GIFMAX } from "../../configs/config.js";

const createFavoritesSection = async (favoritos=[]) => {
    const gifsFavoriteSection= document.getElementById('favorites-container');
    
    try {
        let gifsFavoritesDiv = document.getElementById('favorites-section')
        if (!gifsFavoritesDiv) {
            gifsFavoritesDiv =  document.createElement("div") 
            gifsFavoritesDiv.classList.add("favorites-section")
            gifsFavoritesDiv.setAttribute("id", "favorites-section")  
        }
        if (favoritos) {
            favoritos.forEach(gif => {
                let cardGif = favoritesTemplate.favoriteTemplate(gif)
                gifsFavoritesDiv.appendChild(cardGif)
            })
            gifsFavoriteSection.appendChild(gifsFavoritesDiv)
        }
    }
    catch (error) {
        console.error(error);
    }
}

const addImgFavSource = (flag=0, gifId , imgFav , patho = GIFMAX.pathPage) => {
    let favLocal = JSON.parse(localStorage.getItem('favorites'))
    if ( !favLocal  ) {
        localStorage.setItem( 'favorites' , JSON.stringify([]))
    }     
    let favLocalStorage = JSON.parse(localStorage.getItem('favorites'))
    let found = favLocalStorage.find( (gifo) => gifo._gifId == gifId);
    if (found && flag == 0) {
        imgFav.src = `../src/assets/images/icon-fav-active.svg`
    }
    else if (!found && flag == 0) {
        imgFav.src = `../src/assets/images/icon-fav-hover.svg`
    }
    else if (found && flag == 1) {
        imgFav.src = `../src/assets/images/icon-fav-active.svg`
    }
    else if (!found && flag == 1) {
        imgFav.src = `../src/assets/images/icon-fav.svg`

    }
}

export {createFavoritesSection , addImgFavSource }
