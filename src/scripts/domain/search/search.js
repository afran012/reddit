
import {createContainerAutocomplete} from '../../domain/autocomplete/autocomplete.js'
import {createTrendSection} from '../../domain/trend/trend.js'
import {createSearchSection} from '../../domain/gifcard/gifcard.js'
import {trendGifsSection} from '../../domain/trend/trendSection.js'
import { $ } from "../../utils/domUtils.js";
import { SEARCH_SECTION } from "../../configs/config.js"
/////// Trend 
// await trendGifsSection();
// createTrendSection(4 , 0);

/////////////////  DOM  ///////////////////////////////////

const searchBtn = document.getElementById('search-btn')
const pInputSearch = document.getElementById('search-gif')
const viewMoreBtn = document.getElementById('search-more')

///////////////////////////////////////////////////////////

// $("#img-close-search").on("click", (event)=>{
//     $("#search-btn").htmlElement.style.gridArea = '1/3/2/4'
//     $("#search-gif").htmlElement.value = ""
//     $("#autoContain").htmlElement.innerHTML = ""
//     $("#search-btn").htmlElement.style.display = 'inline'
//     $("#img-close-search").htmlElement.style.display = 'none'
// })


const searchGifs = async () => {
    // $("#search-btn").htmlElement.style.gridArea = '1/3/2/4'
    // $("#img-close-search").htmlElement.style.display = 'none'
    SEARCH_SECTION.currentSearch = 0
    // $("#autoContain").htmlElement.innerHTML = ""
    $("#gifs-search-container").htmlElement.innerHTML = "" 
    await createSearchSection()
    // SEARCH_SECTION.inputSearchValue = value
    // $("#search-gif").htmlElement.value = ""
}

// pInputSearch.addEventListener('keypress', async e => {
//     if(e.keyCode == 13) {
//         $("#search-btn").htmlElement.style.display = 'inline'
//         $("#img-close-search").htmlElement.style.display = 'none'
//         e.preventDefault();
//         await searchGifs(pInputSearch.value, SEARCH_SECTION.limitSearch , SEARCH_SECTION.offsetSearch)
//         $("#autoContain").htmlElement.innerHTML = ""
//     }
// }) 


const searchThemes =  async (event) => {
    console.log("here");
    await searchGifs()
}

// searchBtn.addEventListener('click', async (event) => {
//     await searchGifs(pInputSearch.value, SEARCH_SECTION.limitSearch , SEARCH_SECTION.offsetSearch)
// })

// pInputSearch.addEventListener('input', async (event) => {
//     await createContainerAutocomplete(pInputSearch.value, SEARCH_SECTION.limitAutocomplete , SEARCH_SECTION.offsetAutocomplete )
//     if ( pInputSearch.value != "") {
//         $("#search-btn").htmlElement.style.gridArea = '1/1/2/2'
//         $("#img-close-search").htmlElement.style.display = 'inline'
//     }
//     if (pInputSearch.value == ""){
//         $("#search-btn").htmlElement.style.display = 'inline'
//         $("#search-btn").htmlElement.style.gridArea = '1/3/2/4'
//         $("#img-close-search").htmlElement.style.display = 'none'        
//     }
// })

// viewMoreBtn.addEventListener('click', async (event) => {
//     SEARCH_SECTION.currentSearch += 12
//     const  searchSection = await createSearchSection(SEARCH_SECTION.inputSearchValue, SEARCH_SECTION.limitSearch, SEARCH_SECTION.currentSearch)
// })

// viewMoreBtn.addEventListener('mouseover', async (event) => {
//     viewMoreBtn.src = "./assets/images/CTA-ver-mas-hover.svg"
// })

// viewMoreBtn.addEventListener('mouseout', async (event) => {
//     viewMoreBtn.src = "./assets/images/CTA-ver-mas.svg"
// })

export {searchGifs, searchThemes};
    