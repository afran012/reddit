import {API_DETAILS} from '../configs/config.js';

const checkStatusAndParse = async (res) => {  
    if (!res.ok) {
      throw new Error(`Status code error: ${res.status}`);
    }  
    return res.json()
}

// funcion fetch asincrona
async function getApiInfo ( url ) {
    const response = await fetch( url )
    const data = await checkStatusAndParse( response );
    return data.data ;
}

const trendSection = async (limit , offset) => {
    let response = getApiInfo(`${API_DETAILS.API_URL}/gifs/trending?api_key=${API_DETAILS.API_KEY}&limit=${limit}&offset=${offset}`);
    return response || {};
}

const getMyGifs = async (id) => {
    try {
        let urlMyGifs = `${API_DETAILS.API_URL}/gifs/${id}?api_key=${API_DETAILS.API_KEY}`
        let response = getApiInfo(urlMyGifs);
        return response || {};
    }
    catch (error){
        console.error(error);
    }    
}  

const getGifTrend = async () => {
    let response = getApiInfo(`${API_DETAILS.API_URL}/trending/searches?api_key=${API_DETAILS.API_KEY}`);
    return response || {};
}

const gifAutocomplete = async (q , limit , offset) => {
    let response = getApiInfo(`${API_DETAILS.API_URL}/gifs/search/tags?api_key=${API_DETAILS.API_KEY}&q=${q}&limit=${limit}&offset=${offset}`);
    return response || {};
}

const getGifSearch = async (q , limit , offset) => {
    let response = getApiInfo(`${API_DETAILS.API_URL}/gifs/search?api_key=${API_DETAILS.API_KEY}&q=${q}&limit=${limit}&offset=${offset}`);
    return response || {};
}

const createGif = async (formData) => {
    try {
        let responseData = await fetch(`https://upload.giphy.com/v1/gifs`, {
            method: 'POST' ,
            body: formData
        }).then(response => {
            return response.json()})
        responseData = responseData.data.id
        return responseData
    }
    catch (error){
        console.error(error);
    }
    
}

const getDataReddit = async () => {
    let response = getApiInfo(`${API_DETAILS.API_URLReddit}/reddits.json?limit=50`);
    return response || {};
}


export {getGifTrend , gifAutocomplete , getGifSearch , createGif , getMyGifs , trendSection , getDataReddit} ;