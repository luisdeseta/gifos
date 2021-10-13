import {uploadGifo, setMyGifosLS, myGifosLS } from './getapi.js';


//constantes
const videoBtn = document.getElementById('videoBTN');
const videoBtnStart = document.getElementById('videoBTNstart');
const videoBtnStop = document.getElementById('videoBTNstop');
const videoBtnUp = document.getElementById('videoBTNupload');
const videoS = document.getElementById('video');
const videoBox = document.getElementById('videoStep');
const upLoadHover = document.getElementById('upLoadHover');
const upLoadContainer = document.getElementById('upLoadContainer');
//const createButtom = document.getElementById('id="createButtom"')

var recorder;
//Otro metodo para ocultar o mostrar elementos:
videoBtnStart.hidden = true;
videoBtnStop.hidden = true;
videoBtnUp.hidden = true;



/**
 * @description Paso 1 solicito permisos para la camara
 */
function captureCamera() {
    if (document.getElementById('video').classList.contains('video')) {
        document.getElementById('video').classList.toggle('videoShow');
    }
    //test- Revisar buttons
    videoBox.innerHTML = accesMedia;
    videoBtn.hidden = true;
    navigator.mediaDevices.getUserMedia({ 
        audio: false, 
        video: true,
        //{  height: { max: 320 } } 
    })
    .then(function(camera) {
        videoS.srcObject = camera;
        videoS.play();
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 8,
            width: 360,
            hidden: 240,
        })
    })

    //ocultar button comenzar
    videoBtnStart.hidden = false;
    videoBox.innerHTML ='';
    //cambio status del paso 1
    if (document.getElementById('step1').classList.contains('step1')) {
        document.getElementById('step1').classList.add('step1Active');
    }    
    
}

/**
 * @description inicia la grabacion
 */
function Rec() {
    document.getElementById('step1').classList.remove('step1Active');
    recorder.startRecording();
    videoBtnStart.hidden = true;
    videoBtnStop.hidden = false;
    //cambio status del paso 1 y 2
    document.getElementById('step2').classList.add('step2Active');
    
}

// Guardo un objeto null para pasarlo luego a upload()
let form = null

/**
 * @description Detiene la grabación y devuelve un archivo
 * 
 */
function stopRec() {
    recorder.stopRecording(function(){
    form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));

    })
    videoBtnStop.hidden = true;
    videoBtnUp.hidden = false; 
}
/**
 * @description subo la grabacion
 * @param {*} f Objeto generado con stopRecording 
 * TODO poner el cargador de "subiendo gifo"
 * carga antes de la promesa y se borra cuando subio  
 */
function upload (f) {
    //subiendo gifo
    upLoadHover.style.display = "block"
    uploadGifo(f)
    //boton 3
        .then( (res) =>{
            const {data } = res
            setMyGifosLS(data.id); 
            console.log('res ==> ', res);
            //gif subido
            upLoadContainer.innerHTML = upLoadOK;
        }).catch(function(error) {
            console.error('Error en la grabacion. StopRecording', error);
        })
}
/**
 * @description Elimina el ID del LS para repetir grabacion
 */

//Markup
const accesMedia = `
    <div>    <h1 id="createTitle" class="mainTitle">¿Nos das acceso <br> a tu cámara?</h1>
            <p id="createText" class="createText">El acceso a tu camara será válido sólo
            por el tiempo en el que estés creando el GIFO.</p>
    </div>
    `
const upLoadOK = `
<div>
<img src="../img/check.svg" alt="cargando gifo">
<p id="upLoadOK" class="createGifo">GIFO subido con éxito</p>
</div>
`
//Listeners
videoBtn.addEventListener('click', captureCamera);
videoBtnStart.addEventListener('click', Rec);
videoBtnStop.addEventListener('click', stopRec);
videoBtnUp.addEventListener('click', ()=>  {upload(form)})