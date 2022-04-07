//***SCRIPT GENERAL******/


document.getElementById('logo').addEventListener('click',()=> open('/index.html','_self'));
document.getElementById('boton_gifo').addEventListener('click',()=>open('/crearGifo.html','_self'));


let api_key = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
//let uri = "https://api.giphy.com/v1/gifs/trending";//ENDPOINT PARA GIF TRENDING
let uriauto = 'https://api.giphy.com/v1/gifs/search/tags';//ENDPOINT PARA AUTOCOMPLETADO
let urisug = 'https://api.giphy.com/v1/trending/searches';//ENDPOINT DE BUSQUEDA DE TRENDING TOPICS
let busqueda = 'https://api.giphy.com/v1/gifs/search';//ENDPOINT DE BUSQUEDA DE ELEMENTO SELECCIONADO
//let gifBid = 'https://api.giphy.com/v1/gifs'; //OBTENER GIFS BY ENDPOINTS






//window.onload = giphy();


//ALGORITMO DE LA BARRA DE PALABRAS TRENDING
let topicTren = document.getElementById('topicTren');


fetch(urisug + "?api_key=" + api_key)
    .then(response => response.json())
    .then(json => {
        let arrayTopic = json.data;
        console.log(json.data);
        console.log("las palabras trending son:"+arrayTopic);
        for (let o = 0; o < 5; o++) {
            if (o === 4) {
                
                //let wordStrong = document.createElement('strong');
                //wordStrong.setAttribute('class', 'wordStrong');
                //wordStrong.innerHTML = arrayTopic[o] + ' ';
                //topicTren.appendChild(wordStrong);
                //topicTren.innerHTML+=json.data[o]+ ' ';
                let gongon = document.createElement('span');
                gongon.setAttribute('class', 'wordStrong');
                gongon.innerHTML = arrayTopic[o] + ' ';
                topicTren.appendChild(gongon);

            }
            else {
                
                //let wordStrong = document.createElement('strong');
                //wordStrong.setAttribute('class', 'wordStrong');
                //wordStrong.innerHTML = arrayTopic[o] + ', ';
                //topicTren.appendChild(wordStrong);
                //console.log(wordStrong);
                //topicTren.innerHTML+=json.data[o]+ ', ';
                let gongon = document.createElement('span');
                gongon.setAttribute('class', 'wordStrong');
                gongon.innerHTML = arrayTopic[o] + ' ';
                topicTren.appendChild(gongon);
            }

        }

    })
    .catch(error => console.error(error));


//ALGORITMO BUSQUEDA DE RESULTADOS SOBRE PALABRAS TRENDING

document.addEventListener('click',e=>{
    let clasePalabra=e.target.classList.value;
    if (clasePalabra==='wordStrong') {
        console.log(e.target.innerHTML);
        searching(e.target.innerHTML);
    }
})

//FUNCION PARA ESTILOS DEL INPUT
let icon = document.getElementById('iconoClose'); //estos se repiten con nocturno depurar codigo
let iconDos = document.getElementById('iconoLupa');//estos se repiten con nocturno depurar codigo
document.addEventListener('click', (e) => {
    let evento = e.target.id;

    if (evento === 'buscar' & vista==='modoDiu') {
        let box = document.getElementById(evento);
        //icon.src = '/images/close.svg';
        icon.style.backgroundImage="url(/images/close.svg)";
        icon.style.backgroundRepeat='no-repeat';
        icon.style.width = '14px';
        icon.style.height = '14px';
        iconDos.style.visibility = 'visible';
        box.style.borderBottom = '1px solid #9CAFC3';
    }
    else if(evento==='buscar' & vista==='modoNoc'){
        let box = document.getElementById(evento);
        //icon.src = '/images/close-modo-noct.svg';
        icon.style.backgroundImage="url(/images/close-modo-noct.svg)";
        icon.style.backgroundRepeat='no-repeat';
        icon.style.width = '14px';
        icon.style.height = '14px';
        iconDos.style.visibility = 'visible';
        box.style.borderBottom = '1px solid #9CAFC3';
    }
    e.stopPropagation();
})




//ALGORITMO DE BUSQUEDA GIFO

let texto = document.getElementById('buscar');
let resultados = document.getElementById('listaResultados');
let container = document.querySelector('.container');
let pintar = document.getElementById('restopic');
let arreglo = [];


texto.addEventListener('input', () => {
    resultados.style.display = 'block';
    let txtinput = texto.value.toLowerCase();
    fetch(uriauto + '?api_key=' + api_key + '&q=' + txtinput)
        .then(response => response.json())
        .then((json) => {
            resultados.innerHTML = '';
            arreglo = json.data;
            console.log(arreglo);
            for (const i of arreglo) {
                let res = i.name;

                if (res.indexOf(txtinput) !== -1) {
                    resultados.innerHTML += `<li class='options' id='${res}'>${res}</li>`;
                }

            }

        })
        .catch(error => console.error(error));

})


//Funciones de busqueda

document.addEventListener('click', e => {
    let etarget = e.target;
    //SI EL CLICK ES EN BOTON CERRAR SE BORRA LA BUSQUEDA

    if (etarget.id === 'iconoClose' & vista==='modoDiu') {
        texto.value = '';
        resultados.innerHTML = '';
        
        searching(texto.value);
        let box = document.getElementById('buscar');
        btnmas.style.visibility = 'hidden';
        icon.style.backgroundImage ="url(/images/icon-search.svg)";
        icon.style.width = '20px';
        icon.style.height = '20px';
        iconDos.style.visibility = 'hidden';
        box.style.borderBottom = 'Transparent';
        
    }
    else if(etarget.id==='iconoClose' & vista==='modoNoc'){
        texto.value = '';
        resultados.innerHTML = '';
        
        searching(texto.value);
        let box = document.getElementById('buscar');
        btnmas.style.visibility = 'hidden';
        icon.style.backgroundImage = "url(/images/icon-search-modo-noct.svg)";
        icon.style.width = '20px';
        icon.style.height = '20px';
        iconDos.style.visibility = 'hidden';
        box.style.borderBottom = 'Transparent';
        

    }
    //SI EL CLICK ES EN ALGUNA DE LAS PALABRAS ENCONTRADAS APERECE LA BUSQUEDA

    else if (etarget.classList == 'options') {
        texto.value = etarget.id;
        searching(texto.value);
        resultados.style.display = 'none';

    }
    // SI EL CLICK ES EN EL BOTON LUPA BUSCA RESULTADOS PARA LA PALABRA
    else if (etarget.id == 'iconoLupa') {
        console.log(texto.value);
        searching(texto.value);
    }

})


let p = 12; // variable de control maximo de paginado de gifs, asociada al boton ver mas
let j = 0; //variable de control minimo de paginado de gifs
let btnmas = document.getElementById('mas');
let jsonE;
let gifosFound = [];
let titulo = document.getElementById('titResBusqueda');


function searching(elemento) {

    if (elemento === '') {
        console.log('no existen elementos para buscar');
    }
    console.log(elemento);
    gifosFound = [];
    fetch(busqueda + '?api_key=' + api_key + '&q=' + elemento + '&limit=50')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            pintar.innerHTML = '';

            titulo.textContent = elemento;

            //ciclo para guardar todos los elementos del resultado en un arreglo
            for (let e = 0; e < json.data.length; e++) {
                let gifodata = new Gifo();
                gifodata.id = json.data[e].id,
                    gifodata.urlOriginal = json.data[e].images.original.url,
                    gifodata.urlImagen = json.data[e].images.downsized_medium.url,
                    gifodata.title = json.data[e].title,
                    gifodata.usuario = json.data[e].username,
                    gifosFound.push(gifodata);

            }

            console.log(gifosFound);

            jsonE = gifosFound.length;
            console.log('el arreglo json contiene: ' + jsonE)



            if (jsonE < p) {
                console.log('todos los elementos caben en una grilla');
                for (j = 0; j < jsonE; j++) {

                    console.log(json.data[j]);
                    let imgres = document.createElement('div');
                    imgres.innerHTML =
                        `
                        <div class='framegif'>

                        <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                       
                        <div class='frameIcons'>
                        <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt=""> 
                        <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                        <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                        </div>
                        <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                        </div>
                    </div>
                    
                `

                    pintar.appendChild(imgres);


                }

            }
            else {

                console.log('los elementos exceden el espacio de una grilla');

                btnmas.textContent = 'Ver Mas';
                btnmas.style.visibility = 'visible';

                for (j = 0; j < p; j++) {
                    console.log(json.data[j]);
                    let imgres = document.createElement('div');
                    imgres.innerHTML =
                        `
                <div class='framegif'>

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                   
                    <div class='frameIcons'>
                    <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt="">
                    <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                    <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                        </div>
                </div>
                
                `
                    pintar.appendChild(imgres);


                }

                btnmas.addEventListener('click', () => {
                    let r = (jsonE - p) / 12;
                    if (r >= 1) {
                        p += 12;
                        for (j; j < p; j++) {
                            let imgres = document.createElement('div');
                            imgres.innerHTML =
                                `
                <div class='framegif'>

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                    
                    <div class='frameIcons'>
                    <img id='${gifosFound[j].id}' class='sfav found' src='/images/icon-fav.svg' alt=""> 
                    <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                    <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                        </div>    
                </div>
                
                `
                            pintar.appendChild(imgres);

                        }
                    }
                    else {
                        p += jsonE - p;
                        for (j; j < p; j++) {
                            let imgres = document.createElement('div');
                            imgres.innerHTML =
                                `
                <div class='framegif'>

                    <img class='gifound' src="${gifosFound[j].urlImagen}" alt="">
                    
                    <div class='frameIcons'>
                     <img id='${gifosFound[j].id}' class='sfav found ' src='/images/icon-fav.svg' alt=""> 
                        <img id='${gifosFound[j].id}' class='found sdown' src='/images/icon-download.svg' alt="">
                        <img id='${gifosFound[j].urlImagen}' class='found smax' src='/images/icon-max-normal.svg' alt="">
                    </div>
                    
                    <div class='dataGif'>
                            <p class='usuarioGif>${gifosFound[j].usuario}<br>
                            <span class='titleGif'>${gifosFound[j].title}</span>
                            </p>
                    </div>    
                </div>
                
                `
                            pintar.appendChild(imgres);
                            btnmas.style.visibility = 'hidden';

                        }
                    }


                })
            }

        })




        .catch(err => {
            pintar.innerHTML =
                `
        <p id="areaSinres">
        <img id='sinRes' src="/images/icon-busqueda-sin-resultado.svg" alt"imagen sin resultados">
        <br>
        <h2>Intenta con otra búsqueda.</h2>
        </p>
        
        `;
        });




}



document.addEventListener('click', e => {
    let elemento = e.target.id;
    if (elemento === 'iconSearchDos') {

        searching(texto.value);

    }

})

document.getElementById('logo').addEventListener('click',()=> open('/index.html','_self'));
document.getElementById('boton_gifo').addEventListener('click',()=>open('/crearGifo.html','_self'));
