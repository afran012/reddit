
import { SEARCH_SECTION } from "../../configs/config.js"
import { $ } from "../../utils/domUtils.js";
import {createSearchSection} from '../../domain/gifcard/gifcard.js'

const autocompleteTemplate = (tags) => {
    const searchDiv = document.getElementById("search")
    const searchIn = document.getElementById("search-gif")
    const searchAuto = document.getElementById("autoContain")
    searchAuto.innerHTML = ""
    const  separator= document.createElement("div")
    separator.classList.add("separator")
    searchAuto.appendChild(separator) 

    tags.forEach(tag => {
        let  tagDiv = document.createElement("div")
        tagDiv.classList.add("autocomplete")

        let  tagDivText = document.createElement("div")
        tagDivText.classList.add("tagDivText")
        
        let imgSearch = document.createElement("img")
        imgSearch.src = `../src/assets/images/icon-search.svg`;
        imgSearch.classList.add("img-search-auto")
        
        tagDiv.appendChild(imgSearch)
        tagDiv.appendChild(tagDivText)
        searchAuto.appendChild(tagDiv)
        tagDivText.textContent = tag.name;
        tagDiv.addEventListener('click', async ()=>{
            $("#search-btn").htmlElement.style.gridArea = '1/3/2/4'
            $("#search-btn").htmlElement.style.display = 'inline'
            $("#img-close-search").htmlElement.style.display = 'none'
            SEARCH_SECTION.currentSearch = 0
            searchIn.value = tag.name
            $("#autoContain").htmlElement.innerHTML = ""
            $("#gifs-search-container").htmlElement.innerHTML = ""
            const pInputSearch = document.getElementById('search-gif')
            await createSearchSection(pInputSearch.value, SEARCH_SECTION.limitSearch , SEARCH_SECTION.offsetSearch)
            SEARCH_SECTION.inputSearchValue = pInputSearch.value
            pInputSearch.value = ""
        })    
    }); 
    return searchDiv.appendChild(searchAuto)
}

export {autocompleteTemplate}