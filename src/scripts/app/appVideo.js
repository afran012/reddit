import {darkMode} from '../domain/darkMode/darkMode.js'
import {openVideo , recordVideo , stopVideo , uploadGif , pauseVideo} from '../domain/createvideo/createVideo.js';
import { $ } from "../utils/domUtils.js";
import {CREATEGIF} from "../configs/config.js"

$("#dark-mode").on("click", ()=>{
   let darkLocal = JSON.parse(localStorage.getItem('darkLocal'))
   
   if (darkLocal=="light" ) {
       $("#dark-mode").htmlElement.innerHTML = "MODO NOCTURNO"     
       
   } else {
       $("#dark-mode").htmlElement.innerHTML = "MODO DIURNO"       
   }
})

const btnVideo = document.getElementById ("btn-create-begin");
CREATEGIF.action = "openVideo";

const step1 = document.getElementById ("button-step1")
const step2 = document.getElementById ("button-step2")
const step3 = document.getElementById ("button-step3")
//$("#msg-step-1").htmlElement.style.display = "grid"
$("#msg-step-1").htmlElement.classList.add("msg-active");
$("#msg-step-1").htmlElement.classList.remove("msg-inactive");




 btnVideo.addEventListener("click" , async (event) => {
     if ( CREATEGIF.action === "openVideo") {
      CREATEGIF.action = "recordVideo"  
      await openVideo();
        
     }

     else if ( CREATEGIF.action === "recordVideo") {
         CREATEGIF.action = "stopVideo"
         await recordVideo();
      }

     else if ( CREATEGIF.action === "stopVideo") {
        //await pauseVideo();
        CREATEGIF.action = "uploadVideo"
        await stopVideo();
        
     }

     else if ( CREATEGIF.action === "uploadVideo") {
      CREATEGIF.action = "openVideo"
      await uploadGif();
   }
})