import * as GifService from "../../services/giftService.js";
import * as AutoTempleate from "../autocomplete/autocompleteTemplate.js";

const createContainerAutocomplete = async (tag , limit , offset) =>{
    try{
        const searchAuto = document.getElementById("autoContain")
        const autocompleteTags = await GifService.gifAutocomplete(tag,limit,offset)

        if (autocompleteTags.length===0) {
            searchAuto.innerHTML = ""
            return
        }
        return await AutoTempleate.autocompleteTemplate(autocompleteTags)
    } catch (error){
        console.error(error);
    }   
}

export {createContainerAutocomplete}