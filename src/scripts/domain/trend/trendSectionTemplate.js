import {Favorite} from "../../models/favorites.js";
import {openMaximize} from './../maximize/maximize.js';
import { GIFMAX } from "../../configs/config.js";
import { $ } from "../../utils/domUtils.js";
import { addImgFavSource } from "../favorites/favorites.js"

const gifcardTrendTemplate = ( patho ,{urlGifSmall, urlGifBig, urlGifOriginal, gifId , gifUser , gifTitle}) => {

    let card = document.createElement( "div" ) 
    card.classList.add("favorite-gifo")   

    let imgGif = document.createElement("img")
    imgGif.src = urlGifSmall;
    imgGif.setAttribute("alt", "gif-item");
    imgGif.classList.add("img-gif")

    let  icons= document.createElement("div")
    icons.classList.add("div-icons-gifo")
    icons.style.display = "none"

    let imgFav = document.createElement("img")
    imgFav.src = `${patho}assets/images/icon-fav.svg`;
    imgFav.classList.add("img-fav")
    imgGif.setAttribute("gifId", gifId);

    addImgFavSource(1, gifId , imgFav , patho)
    imgFav.addEventListener("click", async (event) => {        
        let favLocal = JSON.parse(localStorage.getItem('favorites'))
        if ( !favLocal ) {
            localStorage.setItem( 'favorites' , JSON.stringify([]))
        }
        let favoriteGif = new Favorite(gifId, urlGifOriginal, urlGifSmall, urlGifBig , gifId)
        let favLocalStorage = JSON.parse(localStorage.getItem('favorites'))
        let found = favLocalStorage.find( (gifo) => gifo._gifId == favoriteGif.gifId);
        let arrayIndex = favLocalStorage.indexOf(found)
        if ( !found ) {
            favLocalStorage.push(favoriteGif)
            imgFav.src = `${patho}assets/images/icon-fav-active.svg`
        }
        else {
            favLocalStorage.splice(arrayIndex,1)
            imgFav.src = `${patho}assets/images/icon-fav-hover.svg`
        }
        localStorage.setItem( 'favorites' , JSON.stringify(favLocalStorage))
    })
    
    let imgDown = document.createElement("img")
    imgDown.src = `${patho}assets/images/icon-download.svg`;
    imgDown.setAttribute("alt", "icon-download");
    imgDown.classList.add("icon-download");

    imgDown.addEventListener("click", async (event) => {
        let a = document.createElement('a');
        let response = await fetch(urlGifOriginal)
        let file = await response.blob();
        a.download = gifId
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();        
    })
    
    let imgFull = document.createElement("img")
    imgFull.src = `${patho}assets/images/icon-max-normal.svg`
    imgFull.setAttribute("alt", "icon-max-normal");
    imgFull.classList.add("icon-max-normal")
    imgFull.addEventListener("click", async (event) => {
        let urlWrapper = {
            gifId: gifId,
            urlGifSmall: urlGifSmall,
            urlGifBig: urlGifBig,
            urlGifOriginal: urlGifOriginal,
            gifUser: gifUser,
            gifTitle: gifTitle
        }
        
        $("#user-title").htmlElement.innerHTML = gifTitle
        $("#gif-title").htmlElement.innerHTML = gifUser
        
        GIFMAX.gifMax = urlWrapper
        openMaximize(urlGifBig)
    })


    card.appendChild(imgGif)  
    icons.appendChild(imgFav)  
    icons.appendChild(imgDown)
    icons.appendChild(imgFull)
    card.appendChild(icons)

    let cardHover = document.createElement("div")
    let userText = document.createElement("div")
    let tittleText = document.createElement("div")
    userText.classList.add("user-text")
    tittleText.classList.add("tittle-text")

    userText.innerHTML = gifUser
    tittleText.innerHTML = gifTitle
    userText.style.display = "none"
    tittleText.style.display = "none"

    card.appendChild(userText)
    card.appendChild(tittleText)

    card.appendChild(cardHover)
    cardHover.classList.add("hover-gif")
    cardHover.style.display = "none"

    let elementsListHover = [imgGif,cardHover , icons , tittleText , userText]

    elementsListHover.forEach((element) => {
        element.addEventListener("mouseover", e =>{
            icons.style.display = "grid"  
            cardHover.style.display = "inline"  
            userText.style.display = "inline"  
            tittleText.style.display = "inline"
        });
        element.addEventListener("mouseout", e =>{
            icons.style.display = "none"
            cardHover.style.display = "none" 
            userText.style.display = "none"  
            tittleText.style.display = "none"
        });
    })

    let elementsListImgHover = [imgGif,cardHover ]

    elementsListImgHover.forEach((element) => {
        element.addEventListener("mouseover", e =>{
            addImgFavSource(1, gifId , imgFav , patho)
        });
        element.addEventListener("mouseout", e =>{
            addImgFavSource(1, gifId , imgFav , patho)
        });
    })

    imgFav.addEventListener("mouseover", e => {
        addImgFavSource(0, gifId , imgFav , patho)
    });
    imgFav.addEventListener("mouseout", e =>{
        addImgFavSource(1, gifId , imgFav , patho)
    });

    imgDown.addEventListener("mouseover", e => {
        imgDown.src = `${patho}assets/images/icon-download-hover.svg`;
    });
    imgDown.addEventListener("mouseout", e =>{
        imgDown.src = `${patho}assets/images/icon-download.svg`;
    });

    imgFull.addEventListener("mouseover", e => {
        imgFull.src = `${patho}assets/images/icon-max-hover.svg`;
    });
    imgFull.addEventListener("mouseout", e =>{
        imgFull.src = `${patho}assets/images/icon-max-normal.svg`;
    });

    return card
}

export {gifcardTrendTemplate}
