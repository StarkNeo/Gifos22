//let modo=document.getElementById('nocturno').id;
let modo=document.querySelector('link','nocturno');

if (modo==='nocturno') {
    let iconoClose = document.getElementById('iconoClose');
    let iconoLupa = document.getElementById('iconoLupa');
    iconoClose.src='/images/icon-search-modo-noct.svg';
    iconoLupa.src='/images/icon-search-modo-noct.svg';  
    
}
//PASAR ESTO A NOCTURNO SCSS DESPUES
function nocturno() {
    document.addEventListener('click',e=>{
        if (e.target.className==='modoNoc') {
            
            let listaNoc=document.getElementsByTagName('li');
            listaNoc[0].innerHTML='MODO DIURNO';
            let logoNoc=document.getElementById('logo');
            logoNoc.src='/images/Logo-modo-noc.svg';
            //let btncrearGifo=document.getElementById('boton_gifo');
            //btncrearGifo.src='/images/CTA-crear-gifo-modo-noc.svg';
            let btnsliderLeft=document.getElementById('sleft');
            btnsliderLeft.src='/images/button-slider-left-md-noct.svg';
            
            let btnsliderRight=document.getElementById('sright');
            btnsliderRight.src='/images/button-slider-right-md-noct.svg';
            let btnmas=document.getElementById('mas');
            
            btnmas.src='/images/CTA-ver+-modo-noc.svg';
            //let tituloUno=document.getElementById('p0');
            //tituloUno.style.color='white';
            //let boxBuscar=document.getElementById('listSearch');
            //boxBuscar.id='listNoc';
            //let boxTexto=document.getElementById('buscar');
            //boxTexto.style.color='white';
            //let resultados=document.getElementById('results');
            //resultados.style.color='#9CAFC3';
            //resultados.style.fontFamily='Roboto, sans-serif';
            //resultados.style.listStyle='url(/images/icon-search.svg)'
            //let head=document.getElementsByTagName('header');
            //head[0].style.borderTop='none';
            //let titSec=document.getElementsByTagName('h1');
            //titSec[0].style.color='white';
            //let trending=document.getElementById('spantrending');
            //trending.style.color='white';
    
            
            let twitter=document.getElementById('twitter');
            twitter.src="/images/icon_twitter_noc.svg";
            
    
    
    
        }
    })
        
} 
nocturno();


let link=document.getElementsByTagName('link');
