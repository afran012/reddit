class FormDataMyGif {
    constructor(gifId, urlGifBig, urlOrig , _urlSmall) {
        this._gifId = gifId;
        this._urlGifBig = urlGifBig;
        this._urlOrig = urlOrig;
        this._urlSmall = _urlSmall;
        this._addedToFavorites = false
    }

    get urlGifBig(){
        return this._urlGifBig
    }

    get urlOrig(){
        return this._urlOrig
    }

    get urlSmall(){
        return this._urlSmall
    }

    get gifId(){
        return this._gifId
    }

    get addedToFavorites(){
        return this._addedToFavorites
    }

    set addedToFavorites(addedToFavorites){
        this._addedToFavorites = addedToFavorites
    }
}

class MyGif {
    constructor(gifId) {
        this._gifId = gifId;
    }

    get gifId(){
        return this._gifId
    }

}


export {FormDataMyGif , MyGif} ;