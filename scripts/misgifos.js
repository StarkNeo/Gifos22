let paginado = 12; // variable de control maximo de paginado de gifs, asociada al boton ver mas
let paginadoMin = 0; //variable de control minimo de paginado de gifs
gifBid = 'https://api.giphy.com/v1/gifs'; //OBTENER GIFS BY ENDPOINTS
api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";




let misGifos = JSON.parse(localStorage.getItem('misGifos'));
let gifosCreados = misGifos.length;
console.log(misGifos);
console.log(gifosCreados);
let areaMisGifos = document.getElementById('muestraMisGifos');
let puntoInicial = 0;
let punto = 0;
let longitud = 12;

if (gifosCreados === 0) {
    //areaMisGifos.innerHTML='AUN NO CREAS GIFOS';
    let mensajeSinGifos = document.createElement('div');
    mensajeSinGifos.setAttribute('id', 'areaSinGifos');
    let sinGifos = document.createElement('img');
    sinGifos.setAttribute('id', 'imgSinGifos');
    sinGifos.src = "/images/icon-mis-gifos.svg";
    mensajeSinGifos.appendChild(sinGifos);
    let mensaje = document.createElement('p');
    mensaje.innerHTML = '¡Anímate a crear tu primer GIFO!';
    mensajeSinGifos.appendChild(mensaje);
    areaMisGifos.appendChild(mensajeSinGifos);

}

if (gifosCreados < 12) {
    misGifos.forEach(element => {
        fechalo(element);
    });
}

if (gifosCreados > 12) {
    document.getElementById('mas').style.visibility = 'visible';
   for (punto; punto < longitud; punto++) {
        fechalo(misGifos[punto]);
    }
    
    //puntoFinal += 12;
}

document.getElementById('mas').addEventListener('click',()=>{
    if ((gifosCreados-punto)>12) {
        
        longitud+=12;    
    }
    else{
        
        longitud+=gifosCreados-punto;
        document.getElementById('mas').style.visibility='hidden';
    }

    for (punto; punto < longitud; punto++) {
        fechalo(misGifos[punto]);
        
    }
    
    
})







function fechalo(element) {
    fetch(gifBid + '?ids=' + element + '&api_key=' + api_key)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            console.log(json.data[0].images.original.url)
            let miGif = document.createElement('div');
            miGif.innerHTML = `
            <div class='frameFav'>

            <img class='giFav' src="${json.data[0].images.downsized_medium.url}" alt="">

            <div class='iconsFav'>
            <div class='favActive'><img id='${json.data[0].id}' class='eliminar btnMisGifos' src='/images/icon-trash-normal.svg' alt=""></div>
            <div class='favActive'><img id='${json.data[0].id}' class='descargar btnMisGifos' src='/images/icon-download.svg' alt=""></div>
            <div class='favActive'><img id='${json.data[0].images.downsized_medium.url}' class='expandir btnMisGifos' src='/images/icon-max-normal.svg' alt=""></div>
            </div>

                <div class='dataFav'>
                    <p>${json.data[0].username}<br>
                    <span>${json.data[0].title}</span>
                    </p>
                </div>
            
             </div>
        </div>
                `
            areaMisGifos.appendChild(miGif);

        })
        .catch(err => console.error(err));


}





//----SECCION CON LAS FUNCIONES DE COMPORTAMIENTO DE BOTONES----


//ALGORITMO PARA BOTON DE AMPLIAR IMAGENES

document.addEventListener('click', e => {
    if (e.target.classList.contains('expandir')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        //let idown = trending.find(gifo => gifo.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.getElementById('popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";

        popUpBox.innerHTML =
            `
            <button id='cerrarPop'>X</button>
            <img id='imgpop' src="${imagen}" alt="">

            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt="">
                    <img id='${imagen}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>


        `;

    }

});

document.addEventListener('click', (e) => {
    if (e.target.id === 'cerrarPop') {
        let popUpBox = document.getElementById('popUpBox');

        popUpBox.style.visibility = "hidden";
        document.body.style.visibility = 'visible';
    }
})



//ALGORITMO PARA BOTON DE DESCARGA DE GIFS

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


//ALGORITMO PARA BOTON ELIMINAR GIFO DEL STORAGE DE FAVORITOS

document.addEventListener('click', e => {
    //actua sobre el div que contiene al corazon
    if (e.target.classList.contains('eliminar')) {
        console.log('el elemento es sujeto de estraccion')
        let hijo = e.target;
        let hijoevaluado = hijo.id;
        let hijoBorrado = misGifos.findIndex(gifo => gifo.id === hijoevaluado);
        console.log(hijoBorrado);
        misGifos.splice(hijoBorrado, 1);
        localStorage.setItem('misGifos', JSON.stringify(misGifos));
        console.log(localStorage);
        location.reload();
        


    }
    //actua sobre la imagen del corazon
    if (e.target.classList.contains('locfav')) {
        console.log('eres todo un pro');
        let evaluado = e.target.id;
        let gifoBorrado = misGifos.findIndex(gifo => gifo.id === evaluado);
        console.log(gifoBorrado);
        misGifos.splice(gifoBorrado, 1);
        localStorage.setItem('misGifos', JSON.stringify(misGifos));
        console.log(localStorage);
        location.reload();

    }

});

document.getElementById('logo').addEventListener('click',()=> open('/index.html','_self'));
document.getElementById('boton_gifo').addEventListener('click',()=>open('/crearGifo.html','_self'));