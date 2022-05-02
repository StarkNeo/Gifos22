
let api_key_Carr = "9oiuzjrmvyyPsuoPNGd28OmEdO0oL40H";
let gifBid = 'https://api.giphy.com/v1/gifs'; //OBTENER GIFS BY ENDPOINTS
let uri = "https://api.giphy.com/v1/gifs/trending";//ENDPOINT PARA GIF TRENDING


window.onload = giphy();
//objeto para almacenar datos del gifo trending extraido de la api
class Gifo {
    constructor(id, urlOriginal, urlImagen, title, usuario) {
        this.id = id;
        this.urlOriginal = urlOriginal;
        this.urlImagen = urlImagen;
        this.title = title;
        this.usuario = usuario;
    }

}

let trending = [];//arreglo para almacenar los gifos trending
let arregloMobile = [];//arreglo para version mobile
let ides = [];
function giphy() {

    fetch(uri + "?api_key=" + api_key_Carr + "&limit=12")
        .then(response => response.json())
        .then(json => {
            console.log(json);

            for (let index = 0; index < json.data.length; index++) {

                let gifo = new Gifo();
                gifo.urlImagen = json.data[index].images.fixed_height.url,
                    gifo.urlOriginal = json.data[index].images.original.url,
                    gifo.id = json.data[index].id,
                    gifo.title = json.data[index].title,
                    gifo.usuario = json.data[index].username;

                trending.push(gifo);
                arregloMobile.push(gifo);

            }

            cargar()
            //cargaMobile(arregloMobile);
            cargaSpans();
            //revista();
        })



        .catch(err => console.error(err));

};

//FUNCION CARGAR IMAGEN

function cargar() {
    let images = document.getElementsByClassName('gifoImagen');
    let iconfav = document.getElementsByClassName('fav');
    let icondown = document.getElementsByClassName('down');
    let iconexp = document.getElementsByClassName('exp');
    let strongs = document.getElementsByTagName('strong');
    let datagifuser = document.getElementsByClassName('dataGifuser');



    for (let n = 0; n < strongs.length; n++) {
        strongs[n].innerHTML = trending[n].title;

    }


    for (let index = 0; index < iconexp.length; index++) {
        iconexp[index].setAttribute('id', trending[index].urlImagen);

    }

    for (let index = 0; index < images.length; index++) {
        images[index].setAttribute('src', trending[index].urlImagen);
    }
    for (let k = 0; k < iconfav.length; k++) {
        iconfav[k].setAttribute('id', trending[k].id);

    }
    for (let k = 0; k < icondown.length; k++) {
        icondown[k].setAttribute('id', trending[k].id);

    }

}






//FUNCION DESLIZAMIENTO A LA IZQUIERDA
function SliderLeft() {


    var slideLone = trending[0].urlImagen;
    var slideLtwo = trending[0].id;
    var slideLthree = trending[0].urlOriginal;
    var slideLfour = trending[0].title;
    var slideLfive = trending[0].usuario;

    for (let i = 0; i < ((trending.length - 1)); i++) {

        trending[i].urlImagen = trending[i + 1].urlImagen;
        trending[i].id = trending[i + 1].id;
        trending[i].urlOriginal = trending[i + 1].urlOriginal;
        trending[i].title = trending[i + 1].title;
        trending[i].usuario = trending[i + 1].usuario;
    };

    trending[11].urlImagen = slideLone;
    trending[11].id = slideLtwo;
    trending[11].urlOriginal = slideLthree;
    trending[11].title = slideLfour;
    trending[11].usuario = slideLfive;

    trending[trending.length - 1].urlImagen = slideLone;
    trending[trending.length - 1].id = slideLtwo;
    //console.log(trending);
    cargar();
    cargaMobile();
}

//FUNCION DESLIZAMIENTO A LA DERECHA

function SlideRight() {

    var slideRone = trending[11].urlImagen;
    var slideRtwo = trending[11].id;
    var slideRthree = trending[11].urlOriginal;
    var slideRfour = trending[11].title;
    var slideRfive = trending[11].usuario;

    for (let index = 11; index > ((trending.length - 12)); index--) {

        trending[index].urlImagen = trending[index - 1].urlImagen;
        trending[index].id = trending[index - 1].id;
        trending[index].urlOriginal = trending[index - 1].urlOriginal;
        trending[index].title = trending[index - 1].title;
        trending[index].usuario = trending[index - 1].usuario;
    }
    trending[0].urlImagen = slideRone;
    trending[0].id = slideRtwo;
    trending[0].urlOriginal = slideRthree;
    trending[0].title = slideRfour;
    trending[0].usuario = slideRfive;

    cargar();
    cargaMobile();
}

//EVENTO BOTON SLIDER LEFT

let sleft = document.getElementById('sleft');
sleft.addEventListener('click', () => SlideRight());

//EVENTO BOTON SLIDER RIGHT * AMBOS EVENTOS PUEDE ESTAR DENTRO DE UNA MISMA FUNCION ACTIVA, REVISAR TARGET

let sright = document.getElementById('sright');
sright.addEventListener('click', () => SliderLeft());

//giphy();


//ALGORITMO ALMACENAMIENTO DE GIFS FAVORITOS EN EL LOCALSTORAGE

if (!localStorage.getItem('favoritos')) {
    localStorage.setItem('favoritos', '[]');
}

let favoritos = JSON.parse(localStorage.getItem('favoritos'));



document.addEventListener('click', e => {
    let elemento = e.target.id;
    let gifoFavorito;
    let evaluar;
    if (e.target.classList.contains('fav')) {

        evaluar = favoritos.find(gifo => gifo.id === elemento);
        if (evaluar === undefined) {
            gifoFavorito = trending.find(gifo => gifo.id === elemento);
            favoritos.push(gifoFavorito);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('El GIFO se agrego con exito a tus Favoritos');
            setInterval(location.reload(), 2000);
        }
        else {
            alert('EL GIFO ya se encuentra en tus favoritos!')
        }
    }
    else if (e.target.classList.contains('sfav')) {
        evaluar = favoritos.find(gifo => gifo.id === elemento);
        if (evaluar === undefined) {
            gifoFavorito = gifosFound.find(gifo => gifo.id === elemento);
            favoritos.push(gifoFavorito);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('El GIFO se agrego con exito a tus Favoritos');
        }
        else {
            alert('EL GIFO YA SE ENCUENTRA!')
        }
    }

    else if (e.target.classList.contains('favMob')) {
        evaluar = favoritos.find(gifo => gifo.id === elemento);
        if (evaluar === undefined) {
            gifoFavorito = arregloMobile.find(gifo => gifo.id === elemento);
            favoritos.push(gifoFavorito);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('El GIFO se agrego con exito a tus Favoritos');
        }
        else {
            alert('EL GIFO YA SE ENCUENTRA!')
        }
    }


    e.stopPropagation();
});

//ALGORITMO PARA DESCARGA DE GIFS

document.addEventListener('click', e => {
    if (e.target.classList.contains('down') || e.target.classList.contains('sdown')) {
        console.log(e.target.id)
        fetch(gifBid + '?ids=' + e.target.id + '&api_key=' + api_key_Carr)
            .then(response => response.json())
            .then(blob => {
                let urlElemento = blob.data[0].images.original.url;
                imgDownload(urlElemento);
            })
            .catch(err => console.error(err));

    }
});

//FUNCION BOTON DE DESCARGA
async function imgDownload(url) {
    let imgblob = await fetch(url)
        .then(res => res.blob())
    let enlace = document.createElement('a');
    enlace.href = window.URL.createObjectURL(imgblob);
    enlace.download = 'gifo.gif';
    enlace.click();
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('exp')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        let idown = trending.find(gifo => gifo.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.querySelector('.popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";
        //document.getElementById('modal').innerHTML =  
        popUpBox.innerHTML =
            `
            <button id='cerrarPop'>X</button>
            <img id='imgpop' src="${imagen}" alt="">
            
            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt=""> 
                    <img id='${idown}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>   
        
        
        `;

    }

    if (e.target.classList.contains('smax')) {
        let imagen = e.target.id; //VARIABLE PARA ASIGNAR A BOTON FAV
        let idown = gifosFound.find(e => e.urlImagen === imagen).id; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.querySelector('.popUpBox');
        document.body.style.visibility = 'hidden';
        popUpBox.style.visibility = "visible";
        //document.getElementById('modal').innerHTML =  
        popUpBox.innerHTML =
            `
        <button id='cerrarPop'>X</button>
        <img id='imgpop' src="${imagen}" alt="">
            <div id='popicons'>
                    <img id='${imagen}' class='found sfav' src='/images/icon-fav.svg' alt=""> 
                    <img id='${idown}' class='found sdown' src='/images/icon-download.svg' alt="">
            </div>    
        
        
        
        `;
        /*
            <img id='imgpop' src=${imagen} alt=''></img></a> 
            <img id=${imagen} class="fav" src='/images/icon-fav.svg' alt="">
            <img id=${idown} class="down" src='/images/icon-download.svg' alt="">
    */

    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'cerrarPop') {
        let popUpBox = document.querySelector('.popUpBox');
        let popMobile = document.querySelector('.popMobile');
        popMobile.style.visibility = 'hidden';
        popUpBox.style.visibility = "hidden";
        document.body.style.visibility = 'visible';
        document.getElementById('burger').style.visibility='visible';
    }
})


//***CARRUSEL MOBILE */

function cargaSpans() {

    arregloMobile.forEach(element => {
        ides.push(element.id);

    });
    let spanes = document.querySelectorAll('.conteo');
    for (let index = 0; index < spanes.length; index++) {
        spanes[index].id = ides[index];

    }
    console.log(ides);
    console.log(spanes);


}
let images = document.querySelector('.gifoImagenMobile');
let numeros = document.querySelectorAll('.conteo');


//function clickSpan() {
let spanObj = document.querySelectorAll('.conteo');
//let valorN;
//let reset;
spanObj.forEach(element => {
    element.addEventListener('click', () => {
        console.log(element.id)
        console.log(ides.indexOf(element.id));
        let valorN = ides.indexOf(element.id);
        console.log(arregloMobile[valorN].urlImagen);
        images.src = arregloMobile[valorN].urlImagen;
        images.id = arregloMobile[valorN].id;
        let reset = 1;
        console.log(reset);
        
    })

});
//console.log(reset);
//console.log(valorN);

//            sinname(valorN,reset);
//buscarClick(valorN)
//}

//clickSpan();
sinname(undefined,0);



function sinname(params, y) {
    //console.log(params);
    //console.log('y= ' + y);
    let valorN = params;
    let reinicio = y;
    //console.log('estoy arriba' + reinicio);
    //valorN = 0;
    setInterval(() => {

        if (valorN === undefined) {
            valorN = 0;
        }
        else if (reinicio === 1) {
            valorN = params;
            //console.log('aquivoy:' + valorN)

        }


        images.src = arregloMobile[valorN].urlImagen;
        images.id = arregloMobile[valorN].id;
      //  console.log(valorN);

        //estilos del contador
        if (valorN === 0) {
            numeros[valorN].style.backgroundColor = 'black';
            numeros[valorN + 11].style.backgroundColor = 'blue';
        }

        else {
            numeros[valorN].style.backgroundColor = 'black';
            numeros[valorN - 1].style.backgroundColor = 'blue';

        }

        //repite ciclo de slides
        if (valorN === 11) {
            valorN = 0;
        }

        else {

            valorN++;

        }


    }, 3000)



}



//sinname();
/*
let ides=[];
function cargaMobile(arreglo) {
    
    

    
    let images = document.querySelector('.gifoImagenMobile');
    let numeros=document.querySelectorAll('.conteo');
    //let ides=[];
    let n;    
   

    
    for (let x = 0; x < numeros.length; x++) {
        numeros[x].id=arregloMobile[x].id;
        console.log(numeros[x]);
    
    }
    
    numeros.forEach(element => {
        ides.push(element.id);      
    });

    let valorN=espanes();
    if (valorN===undefined) {
        n=0;
        console.log(n);
    } else {
        n=valorN;
        images.src=arregloMobile[n].urlImagen;
        images.id=arregloMobile[n].id;
        console.log(n);
    }

    setInterval(()=>{
        images.src=arregloMobile[n].urlImagen;
        images.id=arregloMobile[n].id;
        
        
        if (n===0) {
            numeros[n].style.backgroundColor='black';
            numeros[n+11].style.backgroundColor='blue';
        }
        
        else{
            numeros[n].style.backgroundColor='black';
            numeros[n-1].style.backgroundColor='blue';
            
        } 
        

        if (n===11) {
            n=0;

        } 
        
        else {
            
            n++
            
        }
        
    },3000)
   
}

function espanes() {
    let arregloSpanes=document.querySelectorAll('.conteo');
    let datoId;
    let random;
    arregloSpanes.forEach(element => {
        element.addEventListener('click',()=>{
            datoId=element.id;
            console.log(datoId);
            console.log(ides.indexOf(datoId));
            random=ides.indexOf(datoId);            
        })
    });
    
    return random;
}
*/

//document.querySelector('.adelante').addEventListener('click',()=>SliderLeft());
//document.querySelector('.atras').addEventListener('click',()=>SlideRight());

document.addEventListener('click', e => {
    if (e.target.classList.contains('gifoImagenMobile')) {
        let imagen = e.target.src; //VARIABLE PARA ASIGNAR A BOTON FAV
        let imagenId = e.target.id;
        
        let user = arregloMobile.find(gifo => gifo.id === imagenId).usuario;
        let titulo = arregloMobile.find(gifo => gifo.id === imagenId).title;
        //let idown = arregloMobile.find(gifo => gifo.urlImagen === imagen).urlImagen; //VARIABLE PARA ASIGNAR A BOTON DOWN
        let popUpBox = document.querySelector('.popMobile');
        document.body.style.visibility = 'hidden';
        document.getElementById('burger').style.visibility='hidden';
        popUpBox.style.visibility = "visible";
        popUpBox.innerHTML =
            `
            <button id='cerrarPop'>X</button>
            <img id='imgpopMobile' src="${imagen}" alt="">
            
            <div id='popiconsMobile'>
                    <img id='${imagenId}' class='found favMob' src='/images/icon-fav.svg' alt=""> 
                    <img id='${imagenId}' class='found sdown' src='/images/icon-download.svg' alt="">
                    
                    </div>
                    <div class='datosGifo'>
                    
                    <span class="dataGifuser">${user}</span>
                    <span>${titulo}</span>
                    
                    </div>
        
        
        `;

    }

})


document.getElementById('burger').addEventListener('click',()=>{
    console.log('A LA BURGER')
    let capaBurger=document.querySelector('div','capaMobile');
    capaBurger.classList.toggle('capaEstilo');
    document.querySelector('header').style.visibility='hidden';
    document.querySelector('#burger').style.visibility='hidden';
    
    capaBurger.innerHTML=
    `
    
    <div id='navMobile'>
        <div id='headNav'>
            <img id="logoMobile" src="/images/logo-mobile.svg" alt="logo_gifos">
            <img id='cerrarNav' src='/images/close.svg'></button>
             
        </div>
        <ul id='ulMob'>
             <li>Modo Nocturno</li>
             <li>Favoritos</li>
             <li>Mis GIFOS</li>
        </ul>
    </div>   


`;
    
});


document.addEventListener('click',e=>{
    if (e.target.id==='cerrarNav') {
        let capaBurger=document.querySelector('div','capaMobile');
        capaBurger.classList.toggle('capaEstilo');
        capaBurger.style.display='none';
        document.querySelector('header').style.visibility='visible';
        document.querySelector('#burger').style.visibility='visible';
        
        console.log('esta funcionando el click');
    }
})