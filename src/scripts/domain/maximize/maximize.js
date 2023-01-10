import { $ } from "./../../utils/domUtils.js";
import { GIFMAX } from "../../configs/config.js";
import {Favorite} from "../../models/favorites.js";
import { addImgFavSource } from "../favorites/favorites.js"

const closeMaximize = async () => {
    let close = $("#full-size-gif").htmlElement
    close.style.display = "none"
}

const openMaximize = async (urlGif) => {
    let close = $("#full-size-gif").htmlElement
    $("#img-full-size-mode").attr("src", urlGif)
    close.style.display = "grid" 
    addImgFavSource(1, GIFMAX.gifMax.gifId , $("#favorite-full-size-mode").htmlElement , GIFMAX.pathPage)
}

$("#close-full-size-mode").on("click", closeMaximize)

let download = $("#download-full-size-mode").htmlElement
download.addEventListener("click", async (event) => {
    try{
        let a = document.createElement('a');
        let response = await fetch(GIFMAX.gifMax.urlGifOriginal)
        let file = await response.blob();
        a.download = GIFMAX.gifMax.gifTitle
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click(); 

    }
    catch (error) { console.log(error) }
       
});


let favorite = $("#favorite-full-size-mode").htmlElement


favorite.addEventListener("click", async (event) => {        
    let favLocal = JSON.parse(localStorage.getItem('favorites'))
    if ( !favLocal ) {
        localStorage.setItem( 'favorites' , JSON.stringify([]))
    }
    let favoriteGif = new Favorite(GIFMAX.gifMax.gifId, GIFMAX.gifMax.urlGifOriginal, GIFMAX.gifMax.urlGifSmall, GIFMAX.gifMax.urlGifBig)

    let favLocalStorage = JSON.parse(localStorage.getItem('favorites'))
    let found = favLocalStorage.find( (gifo) => gifo._gifId == favoriteGif.gifId);
    let arrayIndex = favLocalStorage.indexOf(found)
    if ( !found ) {
        favLocalStorage.push(favoriteGif)
    }
    else {
        favLocalStorage.splice(arrayIndex,1)
    }
    localStorage.setItem( 'favorites' , JSON.stringify(favLocalStorage))
})

$("#favorite-full-size-mode").on( "mouseover" , async (changeFavIcon) => {
    try {
        addImgFavSource(0, GIFMAX.gifMax.gifId , $("#favorite-full-size-mode").htmlElement , GIFMAX.pathPage)
    }
    catch (error) {
        console.log(error)
    }
})

$("#favorite-full-size-mode").on( "mouseout" , async (changeFavIcon) => {
    try {
        addImgFavSource(1, GIFMAX.gifMax.gifId , $("#favorite-full-size-mode").htmlElement , GIFMAX.pathPage)
    }
    catch (error) {
        console.log(error)
    }
})

$("#download-full-size-mode").on( "mouseover" , async (changeFavIcon) => {
    try {
        await $("#download-full-size-mode").attr( "src" , `../src/assets/images/icon-download-hover.svg` )
    }
    catch (error) {
        console.log(error)
    }
})

$("#download-full-size-mode").on( "mouseout" , async (changeFavIcon) => {
    try {
        await $("#download-full-size-mode").attr( "src" , `../src/assets/images/icon-download.svg` )
    }
    catch (error) {
        console.log(error)
    }
})

$("#close-full-size-mode").on( "mouseover" , async (changeFavIcon) => {
    try {
        await $("#close-full-size-mode").attr( "src" , `../src/assets/images/Button-close-hover-modo-noc.svg` )
    }
    catch (error) {
        console.log(error)
    }
})

$("#close-full-size-mode").on( "mouseout" , async (changeFavIcon) => {
    try {
        await $("#close-full-size-mode").attr( "src" , `../src/assets/images/close.svg` )
    }
    catch (error) {
        console.log(error)
    }
})

$("#favorite-full-size-mode").on( "click" , async (changeFavIcon) => {
    addImgFavSource(0, GIFMAX.gifMax.gifId , $("#favorite-full-size-mode").htmlElement , GIFMAX.pathPage)
})

export {closeMaximize, openMaximize}
