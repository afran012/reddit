import {trendSection} from '../../services/giftService.js';
import * as gifTemplate from "../trend/trendSectionTemplate.js";

const trendGifsSection = async ( patho = './', limit = 3 ,offset = 0) => {
    
    const gifsTrendSectios= document.getElementById('div-trend-gif');    
    try {
        const gifs = await trendSection( limit ,offset )
        gifs.forEach(gif => {
            let urlWrapper = {
                gifId: gif.id,
                urlGifSmall: gif.images.preview_webp.url,
                urlGifBig: gif.images.fixed_width.url,
                urlGifOriginal: gif.images.original.url,
                gifName: gif.slug,
                gifUser: gif.username,
                gifTitle: gif.title
            }
            let cardGif = gifTemplate.gifcardTrendTemplate(patho,urlWrapper)
            cardGif.classList.add("trendgif-section")
            gifsTrendSectios.appendChild(cardGif)
        })
    }
    catch (error) {
        console.error(error);
    }
}

export {trendGifsSection}