import * as myGifsTemplate from "../myGifs/myGifsTemplate.js";


const createMyGifsSection = async (favoritos=[]) => {
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
                let cardGif = myGifsTemplate.myGifTemplate(gif)
                gifsFavoritesDiv.appendChild(cardGif)
            })
            gifsFavoriteSection.appendChild(gifsFavoritesDiv)
        }
    }
    catch (error) {
        console.error(error);
    }
}

export {createMyGifsSection}