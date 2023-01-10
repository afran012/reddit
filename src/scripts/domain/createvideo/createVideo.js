import { createGif } from '../../services/giftService.js'
import { API_DETAILS , CREATE_GIF } from '../../configs/config.js'
import {localStorageCreatedGif} from '../createvideo/createVideoGifs.js'
import { $ } from "../../utils/domUtils.js";
import {CREATEGIF} from "../../configs/config.js"

const step1 = document.getElementById ("button-step1")
const step2 = document.getElementById ("button-step2")
const step3 = document.getElementById ("button-step3")
const btnVideo = document.getElementById ("btn-create-begin");
const msgStep1 = document.getElementById ("msg-step-1");
const msgStep2 = document.getElementById ("msg-step-2");
const msgStep3 = document.getElementById ("msg-step-3");
const msgStep4 = document.getElementById ("msg-step-4");

const api_key = CREATE_GIF.api_key
const username = CREATE_GIF.username 
const tags = CREATE_GIF.tags
let recorder

let video = document.querySelector('video');
let constraints = window.constraints = {
  audio: false,
  video: { width: 360 , height: 200 }
};


const defaultTemplate = async () => {

  btnVideo.style.display="grid";
  btnVideo.textContent = "Comenzar";
  CREATEGIF.action = "openVideo";
  window.alert("Se debe brindar permisos para acceder a la camara")
}

const controlError = async () => {
  try {
    CREATEGIF.action = "recordVideo"
    btnVideo.textContent = "Grabar"
  } catch (error) {
    console.log(error)    
  }
}

const controlErrorStop = async () => {
  try {
    CREATEGIF.action = "stopVideo"
    btnVideo.textContent = "Finalizar"    
  } catch (error) {
    console.log(error)    
  }
}


const openVideo =  async function getMedia() {
  let stream = null;
  try {
    msgStep4.classList.remove("msg-active");
    msgStep4.classList.add("msg-inactive");
    $("#msg-step-1").htmlElement.style.display = "none"
    btnVideo.style.display="none";
    msgStep1.classList.remove("msg-active");
    msgStep1.classList.add("msg-inactive");
    msgStep2.classList.remove("msg-inactive");
    msgStep2.classList.add("msg-active");
    step1.classList.remove("btnstep");
    step1.classList.add("btnstepActive");
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
    video.srcObject = stream;
    video.onloadedmetadata = function(e) {
      // Do something with the video here.
      video.play()
      btnVideo.textContent = "Grabar"
    }
    msgStep2.classList.remove("msg-active");
    msgStep2.classList.add("msg-inactive");
    btnVideo.style.display="grid";
    step2.classList.remove("btnstep");
    step2.classList.add("btnstepActive");
    step1.classList.remove("btnstepActive");
    step1.classList.add("btnstep");
  } 
  catch(err) {
    /* handle the error */
    console.log(err)
    defaultTemplate()
  }
}


const recordVideo = async () =>{ 
  btnVideo.style.display="none";  
    await navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
        // Do something with the video here.
          video.play()
        };
        recorder = RecordRTC(mediaStream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function() {
            console.log('started')
          }
        });
        recorder.startRecording();
        
        setTimeout(function() {
          btnVideo.style.display="grid";
          btnVideo.textContent = "Finalizar";
        }, 1000);

      }) 
    .catch(function(err) { 
      console.log(err); });
}

const pauseVideo = async () =>{
  btnVideo.style.display="none";
  await navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
    // Do something with the video here.
    console.log('paused')
    video.pause()
    btnVideo.textContent = "Detener"
    btnVideo.style.display="grid";
  };
}).catch(function(err) { 
  CREATEGIF.action = "recordVideo"
  console.log(err.name); 
}); // always check for errors at the end.
}

const stopVideo = async () =>{ 
  btnVideo.style.display="none";

  await navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play()
      console.log('stop recording')
      recorder.stopRecording();
      console.log('recorder', recorder)
      //video.pause()
      btnVideo.textContent = "Subir Gifo"
      btnVideo.style.display="grid";
      let recordFile = recorder.getBlob()

  };
}).catch(function(err) {
  console.log(err); 
  controlErrorStop()  
}); // always check for errors at the end.
}

const uploadGif = async () => {
  try {
    msgStep3.classList.remove("msg-inactive");
    msgStep3.classList.add("msg-active");
    btnVideo.style.display="none";
    step3.classList.remove("btnstep");
    step3.classList.add("btnstepActive");
    step2.classList.remove("btnstepActive");
    step2.classList.add("btnstep");
    let recordFile = recorder.getBlob();
    var form = new FormData();

    form.append('api_key', api_key);
    form.append('username', username);
    form.append('file', recordFile, 'myGif.gif');
    form.append('tags', tags);
    
    let gifoIdCreated = await createGif(form);
    await localStorageCreatedGif(gifoIdCreated);

    btnVideo.style.display="grid"; 
    recorder = null
    btnVideo.textContent = "Comenzar"

    msgStep3.classList.remove("msg-active");
    msgStep3.classList.add("msg-inactive");
    msgStep4.classList.remove("msg-inactive");
    msgStep4.classList.add("msg-active");

    btnVideo.style.display="grid";
    btnVideo.textContent = "Comenzar";
    CREATEGIF.action = "openVideo"
  }
  catch (error){
    console.error(error);
  }
}

export {openVideo , recordVideo , stopVideo , uploadGif, pauseVideo}