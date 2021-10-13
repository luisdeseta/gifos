<!-- 1. Incluye botones de acción reproducir / detener -->
<button id="btn-start-recording">Start Recording</button>
<button id="btn-stop-recording" disabled="disabled">Stop Recording</button>

<!--
    2. Incluir un elemento de video que mostrará la transmisión de video actual
    y también para mostrar el video grabado al final.
 -->
<hr>
<video id="my-preview" controls autoplay></video>

<!-- 
3. Incluya la biblioteca RecordRTC y el último adaptador.
Tenga en cuenta que es posible que desee alojar estos scripts en su propio servidor
-->
<script src="https://cdn.webrtc-experiment.com/RecordRTC.js"></script>
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>

<!-- 4. Inicializar y preparar la lógica de la grabadora de video-->
<script>
    // Almacene una referencia del elemento de video de vista previa y una referencia global a la instancia de la grabadora
    var video = document.getElementById('my-preview');
    var recorder;

    // Cuando el usuario hace clic en iniciar la grabación de video
    document.getElementById('btn-start-recording').addEventListener("click", function(){
        // Desactivar el botón de inicio de grabación
        this.disabled = true;

        // Solicitar acceso a los dispositivos multimedia
        navigator.mediaDevices.getUserMedia({
            audio: true, 
            video: true
        }).then(function(stream) {
            // Mostrar una vista previa en vivo en el elemento de video de la página
            setSrcObject(stream, video);

            // Comience a mostrar la vista previa en el elemento de video
            // y silencia el video para desactivar el problema del eco.
            video.play();
            video.muted = true;

            // Inicializar la grabadora
            recorder = new RecordRTCPromisesHandler(stream, {
                mimeType: 'video/webm',
                bitsPerSecond: 128000
            });

            // Empiece a grabar el video
            recorder.startRecording().then(function() {
                console.info('Recording video ...');
            }).catch(function(error) {
                console.error('Cannot start video recording: ', error);
            });

            // liberar stream al detener la grabación
            recorder.stream = stream;

            // Habilitar el botón para detener la grabación
            document.getElementById('btn-stop-recording').disabled = false;
        }).catch(function(error) {
            console.error("Cannot access media devices: ", error);
        });
    }, false);

    // Cuando el usuario hace clic en Detener grabación de video
    document.getElementById('btn-stop-recording').addEventListener("click", function(){
        this.disabled = true;

        recorder.stopRecording().then(function() {
            console.info('stopRecording success');

            // Recuperar video grabado como blob y mostrarlo en el elemento de vista previa
            var videoBlob = recorder.getBlob();
            video.src = URL.createObjectURL(videoBlob);
            video.play();

            // Dejar de silenciar el video en la vista previa
            video.muted = false;

            // Detener la transmisión del dispositivo
            recorder.stream.stop();

            // ¡Habilite el botón de grabación de nuevo!
            document.getElementById('btn-start-recording').disabled = false;
        }).catch(function(error) {
            console.error('stopRecording failure', error);
        });
    }, false);
</script>



// la grabación completada por el usuario y la transmisión están disponibles
player.on('finishRecord', function() {
    // el objeto blob contiene los datos registrados que
    // puede ser descargado por el usuario, almacenado en el servidor, etc.
    console.log('finished recording: ', player.recordedData);

    // Cree una instancia de FormData y agregue el parámetro de video que
    // será interpretado en el servidor como un archivo
    var formData = new FormData();
    formData.append('video', player.recordedData.video);
    
    // Ejecuta la solicitud ajax, en este caso tenemos un script PHP muy simple
    // que acepta y guarda el archivo "video" subido
    xhr('./upload-video.php', formData, function (fName) {
        console.log("Video succesfully uploaded !");
    });

    // Función auxiliar para enviar
    function xhr(url, data, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(location.href + request.responseText);
            }
        };
        request.open('POST', url);
        request.send(data);
    }
});