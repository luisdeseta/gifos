//constantes
const videoBtn = document.getElementById('videoBTN')
const videoBtnStart = document.getElementById('videoBTNstart')
const videoBtnStop = document.getElementById('videoBTNstop')
const videoS = document.getElementById('video')
var recorder;

//Solicito los permisos
function captureCamera() {
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: {
            height: { max: 480 }
         } 
    })
    .then(function(camera) {
        video.srcObject = camera;
        video.play()
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });
    }).catch(function(error) {
        console.error(error);
    });
}

//Grabar
const Rec = () =>{
//    this.disabled = true;

       
    //para cambiar estado de los botones??
    //document.getElementById('btn-stop-recording').disabled = false;
    recorder.startRecording();
}

function stopRec() {
    recorder.stopRecording(function(){
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'))
    })

}

//Listeners
videoBtn.addEventListener('click', captureCamera)
videoBtnStart.addEventListener('click', Rec)
videoBtnStop.addEventListener('click', stopRec)