import {uploadGifo } from './getapi.js';


//constantes
const videoBtn = document.getElementById('videoBTN');
const videoBtnStart = document.getElementById('videoBTNstart');
const videoBtnStop = document.getElementById('videoBTNstop');
const videoS = document.getElementById('video');
const videoBox = document.getElementById('videoStep');
var recorder;

videoBtnStart.hidden = true;
videoBtnStop.hidden = true;
//Solicito los permisos
function captureCamera() {
    if (document.getElementById('video').classList.contains('video')) {
        document.getElementById('video').classList.toggle('videoShow');
    }
    //test- Revisar buttons
    videoBox.innerHTML = step2
    videoBtn.hidden = true;
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: true,
        //{  height: { max: 320 } } 
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
    //oculatar button comenzar
    videoBtnStart.hidden = false;
    })
    .catch(function(error) {
        console.error(error);
    });
}

//Grabar
const Rec = () =>{
    //para cambiar estado de los botones??
    //document.getElementById('btn-stop-recording').disabled = false;
    recorder.startRecording();
}

function stopRec() {
    recorder.stopRecording(function(){
        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));
        uploadGifo(form)
        .then( (res) =>{
            const {data } = res
            console.log('res: ', res)
            localStorage.setItem("myGif",data.id) 
        });
    })

}
//Markup
const step2 = `
    <div>    <h1 id="createTitle" class="mainTitle">¿Nos das acceso <br> a tu cámara?</h1>
            <p id="createText" class="createText">El acceso a tu camara será válido sólo
            por el tiempo en el que estés creando el GIFO.</p>
    </div>
    `

//Listeners
videoBtn.addEventListener('click', captureCamera)
videoBtnStart.addEventListener('click', Rec)
videoBtnStop.addEventListener('click', stopRec)