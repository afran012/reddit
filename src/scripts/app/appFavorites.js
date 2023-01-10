import {darkMode} from '../domain/darkMode/darkMode.js'
import {closeMaximize} from '../domain/maximize/maximize.js'
import {createFavoritesSection} from '../domain/favorites/favorites.js'
import {trendGifsSection} from '../domain/trend/trendSection.js'
import { $ } from "../utils/domUtils.js";

$("#dark-mode").on("click", ()=>{
    let darkLocal = JSON.parse(localStorage.getItem('darkLocal'))
    
    if (darkLocal=="light" ) {
        $("#dark-mode").htmlElement.innerHTML = "MODO NOCTURNO"     
        
    } else {
        $("#dark-mode").htmlElement.innerHTML = "MODO DIURNO"       
    }
})

let patho

await trendGifsSection( patho = './../');


let favLocal = JSON.parse(localStorage.getItem('favorites'))
const iconFavoritos = document.getElementById("icon-favoritos")

if (!favLocal || favLocal.length == 0){
    iconFavoritos.style.display = 'inline'
}


createFavoritesSection(favLocal)
