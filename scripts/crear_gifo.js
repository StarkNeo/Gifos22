
//VARIABLES PARA ESTILO DE BOTONES Y PASOS
let iniciar = document.getElementById('btncomenzar');
let grabar = document.getElementById('grabar');
let luzCamara = document.getElementById('luzCamara');
let cintaUno = document.getElementById('cintaChica');
let cintaDos = document.getElementById('cintaGrande');
let detener = document.getElementById('detener');
let subir = document.getElementById('subir');
let repetir = document.getElementById('rewind');
let pasos = document.getElementsByTagName('h3');//arreglo con los botones de pasos 1,2,3
let block = 0;//variable de control para estilo de pasos
let txtLineaUno = document.getElementById('txtLineaUno');
let txtLineaDos = document.getElementById('txtLineaDos');
let txtLineaTres = document.getElementById('txtLineaTres');
let txtLineaCuatro = document.getElementById('txtLineaCuatro');
let areacrono = document.getElementById('cronometro');
let areavideo = document.querySelector('video');
//OBJETO PARA CAPTURA DEL VIDEO
let mediaobject = {
  audio: false,
  video: {
    //width: { min: 640, ideal: 1280, max: 1920 },
    //height: { min: 480, ideal: 720, max: 1080 }
    width: 480,
    height: 320

  }
}

//VARIABLES PARA CONEXION CON LA API GIPHY

let api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H"
let uri = "http://upload.giphy.com/v1/gifs";


//FUNCION QUE RECIBE EL VIDEO Y LO PROCESA

function activarCamara() {

  navigator.mediaDevices.getUserMedia(mediaobject)
    .then(stream => {
      grabarVideo(stream);
      areavideo.srcObject = stream;
      areavideo.play();
      block = 1;

    })

    .then(pasoDos)

    .catch(err => {
      pasoNulo();
      console.error(err);

    })
}




function grabarVideo(mediaStream) {
  
  grabar.addEventListener('click', () => {
    alert('Presiona OK cuando estes listo!');
    areacrono.style.visibility = 'visible';
    cintaUno.classList = 'rodarChica';
    cintaDos.classList = 'rodarGrande';
    luzCamara.classList = 'blinkear';
    grabar.style.visibility = 'hidden';
    detener.style.visibility = 'visible';
    startcronos();

    block = 1;
    let recorder = RecordRTC(mediaStream, {
      type: 'gif'
    })
    recorder.startRecording();
    detenerVideo(recorder);
    repetirVideo(recorder);

  })
  //areavideo.srcObject = mediaStream;
  //areavideo.play();
  //areavideo.onloadedmetadata = function () { areavideo.play(); }

  //btngrabar(recorder);
  //return recorder;
}




//ESTILO DE BOTONES Y TEXTO QUE SE ACTIVA AL PRESIONAR COMENZAR
let pasoUno = () => {
  pasos[0].style.backgroundColor = 'blue';
  pasos[0].style.color = 'white';
  //let linea_uno = document.getElementsByClassName('titulos');
  //let txtDos=document.getElementById('txtLineaDos');
  txtLineaUno.textContent = "¿Nos das acceso";
  txtLineaDos.textContent = "a tu camara?";
  //let linea_dos = document.getElementsByClassName('subtit');
  txtLineaTres.textContent = "El acceso a tu camara será válido sólo";
  txtLineaCuatro.textContent = "por el tiempo en el que estés creando el GIFO";
  activarCamara();
}

//ESTILO DE LOS BOTONES Y TEXTO QUE SE APLICA SI EL USUARIO NO PERMITE ACCESO O BLOQUEA LA CAMARA
let pasoNulo = () => {
  pasos[0].style.backgroundColor = 'white';
  pasos[0].style.color = 'blue';
  //let linea_uno = document.getElementsByClassName('titulos');

  txtLineaUno.textContent = "Aquí podrás";
  txtLineaDos.textContent = "crear tus propios GIFOS";
  //let linea_dos = document.getElementsByClassName('subtit');
  txtLineaTres.textContent = "¡Crea tu GIFO en sólo 3 pasos!";
  txtLineaCuatro.textContent = "(sólo necesitas una cámara para grabar un video)";
  alert('se necesita acceso a tu camara');
}

let pasoDos = () => {
  //let titulos = document.getElementsByClassName('titulos');
  //let subtitulos = document.getElementsByClassName('subtit');

  luzCamara.style.visibility = 'visible';
  txtLineaUno.style.visibility = 'hidden';
  txtLineaDos.style.visibility = 'hidden';
  txtLineaTres.style.visibility = 'hidden';
  txtLineaCuatro.style.visibility = 'hidden';


  if (block === 1) {
    pasos[1].style.backgroundColor = 'blue';
    pasos[1].style.color = 'white';
    pasos[0].style.background = 'white';
    pasos[0].style.color = 'blue';
    iniciar.style.visibility = 'hidden';
    grabar.style.visibility = 'visible';
    grabar.style.cursor = 'pointer';



  } else {
    pasoNulo();
  }

}

let pasoTres = () => {
  pasos[0].style.backgroundColor = 'white';
  pasos[0].style.color = 'blue';
  pasos[1].style.background = 'white';
  pasos[1].style.color = 'blue';
  pasos[2].style.background = 'blue';
  pasos[2].style.color = 'white';
}

var btndetenido = 0;


function repetirVideo(recorder) {

  
  repetir.addEventListener('click', () => {
    recorder.startRecording();
    //grabarVideo(mediaStream);
    let contador = '00:00:00';
    areacrono.innerHTML = contador;
    repetir.style.visibility = 'hidden';
    areacrono.style.visibility = 'visible';
    luzCamara.style.visibility = 'visible';
    //luzCamara.classList='blinkear';
    subir.style.visibility = 'hidden';
    grabar.style.visibility = 'visible';
    btndetenido = 0;


  });

}

let gifosGrabados = [0];
let blob;

function detenerVideo(recorder) {
  detener.addEventListener('click', () => {
  
    cintaUno.classList.remove('rodarChica');
    cintaDos.classList.remove('rodarGrande');
    luzCamara.classList.remove('blinkear');
    luzCamara.style.visibility = 'hidden';

    detener.style.visibility = 'hidden';
    subir.style.visibility = 'visible';
    areacrono.style.visibility = 'hidden';
    repetir.style.visibility = 'visible';
    //rewind();
    //alert('el video se detuvo');
    btndetenido = 1;
    console.log(btndetenido);
    //rewind();
    recorder.stopRecording(() => {
      blob = recorder.getBlob();
      gifosGrabados[0] = blob;
      
      console.log(blob);
      console.log(gifosGrabados);
      //subirGifo(gifosGrabados[0]);
    })
    

  })
  
}



iniciar.addEventListener('click', pasoUno);

if (!localStorage.getItem('misGifos')) {
  localStorage.setItem('misGifos', '[]');

}
let misGifos = JSON.parse(localStorage.getItem('misGifos'));
console.log(misGifos);



let esperando = document.querySelector('#esperando');
let mensaje = document.querySelector('#msjespera');
let loader = document.querySelector('#check');
let botonDescargar = document.querySelector('.descargar');
let botonVinculo = document.querySelector('.link');

//FUNCION QUE SUBIRA GIFO A LA API
//function subirGifo(blob) {
subir.addEventListener('click', () => {
  alert('subiendo gifo a la api');
  console.log('se subira este gifo: ' + gifosGrabados[0]);
  subir.style.visibility = 'hidden';
  repetir.style.visibility = 'hidden';
  pasoTres();


  esperando.style.visibility = 'visible';
  let form = new FormData();
  //form.append('file', blob, 'mygif.gif');
  form.append('file', gifosGrabados[0], 'mygif.gif');
  console.log(form.get('file'));


  //areavideo.style.opacity='0.5';
  fetch((uri + "?api_key=" + api_key), {
    method: 'POST',
    body: form

  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      let idGifoSubido = json.data.id;
      botonDescargar.id = json.data.id;
      misGifos.push(idGifoSubido);
      mensaje.innerHTML = 'GIFO subido con exito';
      vinculo(json.data.id);
      loader.classList.remove('loader');
      loader.src = '/images/check.svg';
      alert('Felicidades tu gifo se subio con exito!, ahora puedes consultarlo en la seccion MISGIFOS!');
      //console.log(idGifoSubido);
      localStorage.setItem('misGifos', JSON.stringify(misGifos));
      //console.log(localStorage.misGifos);
      /*
     setTimeout(()=>{
       location.reload();

     },5000)
     */
    }

    )
    
    .catch(err => console.error(err));

})





//}



function startcronos() {
  let cronoUno = new Date();
  let tiempoO = cronoUno.getTime();
  tempo(tiempoO);
}



function tempo(a) {
  let tempoOrigin = a;
  var interval = setInterval(() => {
    if (btndetenido === 0) {
      let cronoDos = new Date();
      let tempoFinal = cronoDos.getTime();
      calculaTempo(tempoFinal, tempoOrigin);
    }
    else {
      console.log('el video fue detenido');
      clearInterval(interval);

    }
  }, 1000);


}

function calculaTempo(tf, to) {
  let reloj = [];
  let milis = tf - to;
  let minutos = 0;
  let segundos = 0;
  let horas = '00';
  areacrono = document.getElementById('cronometro');


  if (milis < 180000) {
    minutos = parseInt(milis / 60000);
    segundos = parseInt((milis % 60000) / 1000);

    if (segundos < 10) {
      let sechar = '0' + segundos;
      reloj.push(sechar);
    }
    else {
      reloj.push(segundos);
    }

    if (minutos < 10) {
      let minchar = '0' + minutos + ':';
      reloj.push(minchar);
    }
    else {
      reloj.push(minutos + ':');
    }
    let contador = horas + ':' + reloj[1] + reloj[0];
    areacrono.innerHTML = contador;
  }
  else {
    alert('el tiempo del video excede los 10 minutos');
  }
}


document.getElementById('logo').addEventListener('click', () => open('/index.html', '_self'));
document.getElementById('boton_gifo').addEventListener('click', () => open('/crearGifo.html', '_self'));

//ALGORITMO PARA BOTON DE DESCARGA DE GIFS
let gifBid = 'https://api.giphy.com/v1/gifs'; //OBTENER GIFS BY ENDPOINTS
//let api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";

document.addEventListener('click', e => {
  if (e.target.classList.contains('descargar')) {
    console.log(e.target.id)
    fetch(gifBid + '?ids=' + e.target.id + '&api_key=' + api_key)
      .then(response => response.json())
      .then(blob => {
        let urlElemento = blob.data[0].images.original.url;
        imgDownload(urlElemento);
      })
      .catch(err => console.error(err));

  }
});


async function imgDownload(url) {
  let imgblob = await fetch(url)
    .then(res => res.blob())
  let enlace = document.createElement('a');
  enlace.href = window.URL.createObjectURL(imgblob);
  enlace.download = 'MyGifoCreado.gif';
  enlace.click();
}

function vinculo(element) {
  fetch(gifBid + '?ids=' + element + '&api_key=' + api_key)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.data[0].images.original.url)
      botonVinculo.id = json.data[0].images.original.url;
      console.log(botonVinculo);
      //areaMisGifos.appendChild(miGif);

    })
    .catch(err => console.error(err));


}

botonVinculo.addEventListener('click',e=>{  
  //let botonCopiar=document.getElementById('copiar');
  //console.log(e.target.id);  
  let cajaVinculo=document.getElementById('cajaVinculo');
  cajaVinculo.value=e.target.id;
  //let botonCopiar=document.getElementById('copiar');
  //cajaVinculo.style.visibility='visible';
  //botonCopiar.style.visibility='visible';
  let popUpBox = document.getElementById('emergente');
  
  //let capa=document.getElementById('capa');
  //capa.style.visibility='visible';
  //let secGrab=document.getElementById('grabacion').style.visibility='hidden';
  document.body.style.visibility='hidden';
  esperando.style.visibility='hidden';
  
  popUpBox.style.visibility = "visible";
  
  })

  document.addEventListener('click', (e) => {
    if (e.target.id === 'btnCerrar') {
      document.body.style.visibility='visible';
      esperando.style.visibility='visible';
      let popUpBox = document.getElementById('emergente');
      popUpBox.style.visibility = "hidden";
        
    }
})



function copiar() {
  //let botonCopiar=document.getElementById('copiar');
  let input=document.getElementById('cajaVinculo').value;
  console.log(input);
  console.log('aqui estoy sin ejecutar nada');
  navigator.clipboard.writeText(input)
    .then(()=>console.log("texto copiado"))
    .catch(err => console.error('algo fallo'));

}

