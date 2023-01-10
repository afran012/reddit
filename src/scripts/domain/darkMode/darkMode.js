import { $ } from "./../../utils/domUtils.js";

// verify Dark Mode in Local Storage
let darkLocal = JSON.parse(localStorage.getItem('darkLocal'))

if ( !darkLocal ) {
    localStorage.setItem( 'darkLocal' , JSON.stringify("light"))
}
const darkMode = async () =>{
    try{
        let darkLocal = JSON.parse(localStorage.getItem('darkLocal'))
        if (darkLocal == "light") { 
            darkLocal = "dark"
        }
        else {
            darkLocal = "light"
        }
        await changeColors(darkLocal)
        return localStorage.setItem( 'darkLocal' , JSON.stringify(darkLocal))
    } catch (error) { console.log(error) }
}

const changeColors = async (valueMode) => {
    try{
        if (  valueMode == "dark") {
            await changeClassElement( "light-mode-1" , "dark-mode-1" )
            await changeClassElement( "light-mode-2" , "dark-mode-2" )
            await changeClassElement( "light-mode-3" , "dark-mode-3" )
            await changeClassElement( "light-mode-4" , "dark-mode-4" )
            await changeClassElement( "light-mode-5" , "dark-mode-5" )
            $("#search-btn").attr("src", "../src/assets/images/icon-search-mod-noc.svg")
            $("#search-btn").attr("src", "../src/assets/images/icon-search-mod-noc.svg")
        }
        else {
            await changeClassElement( "dark-mode-1" , "light-mode-1" )
            await changeClassElement( "dark-mode-2" , "light-mode-2" )
            await changeClassElement( "dark-mode-3" , "light-mode-3" )
            await changeClassElement( "dark-mode-4" , "light-mode-4" )
            await changeClassElement( "dark-mode-5" , "light-mode-5" )
            $("#search-btn").attr("src", "../src/assets/images/icon-search.svg")
            $("#search-btn").attr("src", "../src/assets/images/icon-search.svg")
        }
    } catch(error) { console.log(error)}
}

const changeClassElement = async ( elementToRemove , elementToAdd ) => {
    try {
        $( `.${elementToRemove}` ).htmlAllElements.forEach(element => {
            element.classList.add( `${elementToAdd}` )    
            element.classList.remove( `${elementToRemove}` )
        })
    }catch (error) { console.log(error) }
}

changeColors(darkLocal)

$("#dark-mode").on("click", darkMode)

export {darkMode};