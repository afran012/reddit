const fillArrayById = (gifos, gif) =>{
    let found = gifos.find( (gifo) => gifo.gifId === gif.gifId);
    console.log( "found" , found )
    if ( !found ) {
        gifos.push(gif)
    }
    else {
        gifos.pop( (gifo) => gifo.gifId === gif.id)     
    }
    return gifos
}

export {fillArrayById}
