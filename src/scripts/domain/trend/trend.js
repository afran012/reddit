import * as GifService from "../../services/giftService.js";
import * as TrendTempleate from "../trend/trendtemplate.js";

const createTrendSection = async (limit , offset) =>{
    try{
        const trendTags = await GifService.getGifTrend(limit,offset)
        return await TrendTempleate.trendTemplate(trendTags)
    } catch (error){
        console.error(error);
    }   
}

export {createTrendSection}
