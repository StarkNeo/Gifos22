/*let modo=document.querySelector('link','nocturno');

if (modo==='nocturno') {
    let iconoClose = document.getElementById('iconoClose');
    let iconoLupa = document.getElementById('iconoLupa');
    iconoClose.src='/images/icon-search-modo-noct.svg';
    iconoLupa.src='/images/icon-search-modo-noct.svg';  
    
}
*/
//PASAR ESTO A NOCTURNO SCSS DESPUES
function nocturno() {
    document.addEventListener('click',e=>{
        if (e.target.className==='modoNoc') {
            let listaNoc=document.getElementsByTagName('li');
            listaNoc[0].innerHTML='MODO DIURNO';
            let logoNoc=document.getElementById('logo');
            logoNoc.src='/images/Logo-modo-noc.svg';
            let hojaStyle=document.querySelector('link','diurno');
            hojaStyle.href="/styles/nocturno.css";
            

            /*
            let btnsliderLeft=document.getElementById('sleft');
            btnsliderLeft.src='/images/button-slider-left-md-noct.svg';
            let btnsliderRight=document.getElementById('sright');
            btnsliderRight.src='/images/button-slider-right-md-noct.svg';
            let btnmas=document.getElementById('mas');
            btnmas.src='/images/CTA-ver+-modo-noc.svg';
            let twitter=document.getElementById('twitter');
            twitter.src="/images/icon_twitter_noc.svg";
            */
    
    
    
        }
    })
        
} 
nocturno();

