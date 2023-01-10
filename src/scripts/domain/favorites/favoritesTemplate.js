import {Favorite} from "../../models/favorites.js";
import {openMaximize} from './../maximize/maximize.js'
import { GIFMAX } from "../../configs/config.js";
import { $ } from "../../utils/domUtils.js";
import { addImgFavSource } from "../favorites/favorites.js"
let patho = "./"
GIFMAX.pathPage = "../"

const favoriteTemplate = ( {_urlSmall, _urlOrig, _gifId, _gifName , _urlGifBig  , _gifUser , _gifTitle}) => {

    let card = document.createElement("div")
    card.classList.add("favorite-gifo")   

    let imgGif = document.createElement("img")
    imgGif.src = _urlSmall;
    imgGif.setAttribute("alt", "gif-item");
    imgGif.classList.add("img-gif")    

    let  icons= document.createElement("div")
    icons.classList.add("div-icons-gifo")
    icons.style.display = "none"

    let imgFav = document.createElement("img")
    imgFav.src = "../assets/images/icon-trash-normal.svg";
    imgFav.classList.add("img-fav")
    imgGif.setAttribute("gifId", _gifId);
    imgFav.addEventListener("click", (event) => {
        
        let favLocal = JSON.parse(localStorage.getItem('favorites'))
        if ( !favLocal ) {
            localStorage.setItem( 'favorites' , JSON.stringify([]))
        }
        let favoriteGif = new Favorite(_gifId, _urlOrig, _urlSmall, _gifName , _urlGifBig  , _gifUser , _gifTitle)
        let favLocalStorage = JSON.parse(localStorage.getItem('favorites'))
        let found = favLocalStorage.find( (gifo) => gifo._gifId == favoriteGif._gifId);
        let arrayIndex = favLocalStorage.indexOf(found)
        if ( !found ) {
            favLocalStorage.push(favoriteGif)
        }
        else {
            favLocalStorage.splice(arrayIndex,1)
            card.style.display = 'none'
            card.innerHTML = ""
        }
        localStorage.setItem( 'favorites' , JSON.stringify(favLocalStorage))      
    })    

    let imgDown = document.createElement("img")
    imgDown.src = "../assets/images/icon-download.svg";
    imgDown.setAttribute("alt", "icon-download");
    imgDown.classList.add("icon-download");
    imgDown.addEventListener("click", async (event) => {
        let a = document.createElement('a');
        let response = await fetch(_urlOrig)
        let file = await response.blob();
        a.download = _gifName
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();        
    })    

    let imgFull = document.createElement("img")
    imgFull.src = "../assets/images/icon-max-normal.svg"
    imgFull.setAttribute("alt", "icon-max-normal");
    imgFull.classList.add("icon-max-normal")
    imgFull.addEventListener("click", async (event) => {
        let urlWrapper = {
            gifId: _gifId,
            urlGifSmall: _urlSmall,
            urlGifBig: _urlGifBig,
            urlGifOriginal: _urlOrig,
            gifUser: _gifUser,
            gifTitle: _gifTitle
        }
        
        $("#user-title").htmlElement.innerHTML = _gifTitle
        $("#gif-title").htmlElement.innerHTML = _gifUser
        
        GIFMAX.gifMax = urlWrapper
        openMaximize(_urlGifBig)
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

    userText.innerHTML = _gifUser
    tittleText.innerHTML = _gifTitle
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
            imgFav.src = "../assets/images/icon-trash-normal.svg";
        });
        element.addEventListener("mouseout", e =>{
            imgFav.src = "../assets/images/icon-trash-normal.svg";
        });
    })

    imgFav.addEventListener("mouseover", e => {
        imgFav.src = "../assets/images/icon-trash-hover.svg";
    });
    imgFav.addEventListener("mouseout", e =>{
        imgFav.src = "../assets/images/icon-trash-normal.svg";
    });
    imgDown.addEventListener("mouseover", e => {
        imgDown.src = `../assets/images/icon-download-hover.svg`;
    });
    imgDown.addEventListener("mouseout", e =>{
        imgDown.src = `../assets/images/icon-download.svg`;
    });
    imgFull.addEventListener("mouseover", e => {
        imgFull.src = `../assets/images/icon-max-hover.svg`;
    });
    imgFull.addEventListener("mouseout", e =>{
        imgFull.src = `../assets/images/icon-max-normal.svg`;
    });
    return card
}

export {favoriteTemplate}
