//constantes
const videoBtn = document.getElementById('videoBTN')
const videoBtnStart = document.getElementById('videoBTNstart')
const videoBtnStop = document.getElementById('videoBTNstop')
const videoS = document.getElementById('video')
console.log("videoS:  ", videoS)
//Solicito los permisos
function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 480 }
    }
 })
 .then(function(stream) {
    videoS.srcObject = stream;
    videoS.play();
})
.catch(function(err){
    console.log("Error Stream video: ", err)
})
}

//Objeto Recorder.
//Llamar a los metodos dentro del objeto para iniciar y detener grabacion
const recorder = RecordRTC(videoS, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function() {
     console.log('started')
   },
  });

 

//Listeners
videoBtn.addEventListener('click', getStreamAndRecord)
videoBtnStart.addEventListener('click', recorder.startRecording)
videoBtnStop.addEventListener('click', recorder.stopRecording)
