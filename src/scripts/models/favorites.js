class Favorite {
    constructor(gifId, urlGifBig, urlOrig , _urlSmall , gifName , gifUser , gifTitle) {
        this._gifId = gifId;
        this._urlGifBig = urlGifBig;
        this._urlOrig = urlOrig;
        this._urlSmall = _urlSmall;
        this._addedToFavorites = false;
        this._gifName = gifName;
        this._gifUser = gifUser;
        this._gifTitle = gifTitle;
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
    
    get gifName(){
        return this._gifName
    }

    get gifUser(){
        return this._gifUser
    }

    get gifTitle(){
        return this._gifTitle
    }

    set addedToFavorites(addedToFavorites){
        this._addedToFavorites = addedToFavorites
    }
}

export {Favorite} ;



