import { SEARCH_SECTION } from "../../configs/config.js"
import { searchGifs } from "./../search/search.js"

const searchIn = document.getElementById("search-gif")
const pTrendData = document.getElementById('p-trend-id')


const initTrend = 0;
const endTrend = 5;
let flagTrend = 1   ;
let dotOrComma = ","

const trendTemplate = (tags) => {
    let trends = tags.slice(initTrend,endTrend);
    trends.forEach ( trend => {
        if (flagTrend == endTrend) {        
            dotOrComma = `.`;}
        let wordTrend = document.createElement('span');
        wordTrend.textContent = ` ${trend} ${dotOrComma}`;
        pTrendData.appendChild(wordTrend)        
        wordTrend.addEventListener('click' , async ()=>{
            searchIn.value = trend
            await searchGifs( trend , SEARCH_SECTION.limitSearch , SEARCH_SECTION.offsetSearch)
        })
        flagTrend += 1
    })    
}

export {trendTemplate}
