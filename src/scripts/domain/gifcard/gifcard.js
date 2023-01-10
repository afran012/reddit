import * as GifService from "../../services/giftService.js";
import { $ } from "../../utils/domUtils.js";
import * as gifTemplate from "../gifcard/gifcardtemplate.js";

let gifLocalStorage = window.localStorage;

const createSearchSection = async (tag , limit , offset) => {
    // $("#search-more").show()
    const gifsSearchSectios= document.getElementById('gifs-search-container');
    
    try {
        let gifsSearchDiv = document.getElementById('favorites-section')
        if (!gifsSearchDiv) {
            gifsSearchDiv =  document.createElement("div")  
            gifsSearchDiv.classList.add("favorites-section")
            gifsSearchDiv.setAttribute("id", "favorites-section")   
        }
        // const gifs = await GifService.getGifSearch(tag,limit,offset)
        const gifs = await GifService.getDataReddit()
        console.log(gifs.children);
        if (gifs.length==0) {
            // $("#search-more").hide()
            $("#trending").htmlElement.style.display = "grid"
            // $("#search-not-found").show()
            // $("#result-found").htmlElement.innerHTML = `"${tag}"`
            // $("#p-result-not-found").show()
        }
        else{
            // $("#trending").hide()
            // $("#search-more").show()
            // $("#search-not-found").hide()
            // $("#result-found").show()
            // $("#result-found").htmlElement.innerHTML = `"${tag}"`
            // $("#p-result-not-found ").hide()

        }
        // if (gifs.length<limit) {
        //     $("#search-more").hide()
        // }
        gifs.children.forEach(gif => {
            let urlWrapper = {
                gifId: gif.data.id,
                urlGifSmall: gif.data.icon_img,
                urlGifBig: gif.data.icon_img,
                urlGifOriginal: gif.data.icon_img,
                gifName: gif.slug,
                gifUser: gif.data.name,
                gifTitle: gif.data.title
            }
            let cardGif = gifTemplate.gifcardTemplate(urlWrapper)
            gifsSearchDiv.appendChild(cardGif)
        })
        gifsSearchSectios.appendChild(gifsSearchDiv)
    }
    catch (error) {
        console.error(error);
    }
}
export {createSearchSection , gifLocalStorage}