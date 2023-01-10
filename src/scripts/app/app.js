// Import
import {darkMode} from '../domain/darkMode/darkMode.js'
import {closeMaximize} from '../domain/maximize/maximize.js'
import {searchGifs , searchThemes} from '../domain/search/search.js'
import { GIFMAX } from "../configs/config.js";
import { $ } from "../utils/domUtils.js";

await searchThemes();



$("#dark-mode").on("click", ()=>{
    let darkLocal = JSON.parse(localStorage.getItem('darkLocal'))
    
    if (darkLocal=="light" ) {
        $("#dark-mode").htmlElement.innerHTML = "MODO NOCTURNO"     
        
    } else {
        $("#dark-mode").htmlElement.innerHTML = "MODO DIURNO"       
    }
})

/////  
GIFMAX.pathPage = "./"
let patho = GIFMAX.pathPage
