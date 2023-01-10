import {getMyGifs} from '../../services/giftService.js'
import {Favorite} from "../../models/favorites.js";

const localStorageCreatedGif = async (myGifId) => {
    try {
        let myGifData = await getMyGifs(myGifId)
        let _gifId = myGifData.id
        let _urlGifSmall = myGifData.images.original_still.url
        let _urlGifBig = myGifData.images.fixed_width.url
        let _urlGifOriginal = myGifData.images.original.url
        let _gifName = myGifData.slug
        let _gifUser = myGifData.username
        let _gifTitle =  myGifData.title

        let myGif = new Favorite( _gifId , _urlGifSmall , _urlGifBig , _urlGifOriginal , _gifName , _gifUser , _gifTitle)

        let myGifLocal = JSON.parse(localStorage.getItem('myGifs'))
        if ( !myGifLocal ) {
            localStorage.setItem( 'myGifs' , JSON.stringify([]))
        }
        let myGifLocalStorage = JSON.parse(localStorage.getItem('myGifs'))
        let found = myGifLocalStorage.find( (gifo) => gifo._gifId == myGifId);
        if ( !found ) {
            myGifLocalStorage.push(myGif)
        }
        else {
            myGifLocalStorage.pop( (gifo) => gifo.gifId === myGif.gifId)     
        }
        localStorage.setItem( 'myGifs' , JSON.stringify(myGifLocalStorage))
    }
    catch (error) {
        console.error(error);
    }
}

export {localStorageCreatedGif  }