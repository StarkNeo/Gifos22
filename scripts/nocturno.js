
var estilo=document.querySelector('link', 'status');
var vista;
let logo = document.getElementById('logo');
let btnModo = document.getElementsByTagName('li')[0];
    

document.addEventListener('DOMContentLoaded', modo);

function modo() {
    estilo = document.querySelector('link', 'status');
    vista = localStorage.getItem('modo');
    let imagenDCamara=document.getElementById('camara');
    let pelicula=document.getElementById('rollo');
    if (vista === 'modoNoc') {
        estilo.href = '/styles/nocturno.css';
        btnModo.innerHTML = 'MODO DIURNO';
        logo.src = "/images/Logo-modo-noc.svg";
        cintaUno.src="/images/element_cinta1-modo-noc.svg";
        cintaDos.src="/images/element_cinta2-modo-noc.svg";
        imagenDCamara.src='/images/camara-modo-noc.svg';
        pelicula.src="/images/pelicula-modo-noc.svg";    
    } else {
        estilo.href = '/styles/styles.css';
        logo.src = "/images/logo-desktop.svg";
        btnModo.innerHTML = 'MODO NOCTURNO';
        cintaUno.src="/images/element_cinta1.svg";
        cintaDos.src="/images/element_cinta2.svg";
        imagenDCamara.src='/images/element-camara.svg';
        pelicula.src="/images/pelicula.svg";
    }
}

document.addEventListener('click', e => {
    
    if (e.target.className === 'modoDiu') {
        e.target.className = 'modoNoc';
        
        localStorage.setItem('modo', 'modoNoc');
        
    }
    else if (e.target.className === 'modoNoc') {
        e.target.className = 'modoDiu';
        localStorage.setItem('modo', 'modoDiu');
              
    }
    modo();
    
    
})
