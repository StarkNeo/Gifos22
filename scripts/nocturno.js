
var estilo=document.querySelector('link', 'status');
var vista;
let logo = document.getElementById('logo');
let btnModo = document.getElementsByTagName('li')[0];
    

document.addEventListener('DOMContentLoaded', modo);

function modo() {
    estilo = document.querySelector('link', 'status');
    vista = localStorage.getItem('modo');
    if (vista === 'modoNoc') {
        estilo.href = '/styles/nocturno.css';
        btnModo.innerHTML = 'MODO DIURNO';
        logo.src = "/images/Logo-modo-noc.svg";
        
    } else {
        estilo.href = '/styles/styles.css';
        logo.src = "/images/logo-desktop.svg";
        btnModo.innerHTML = 'MODO NOCTURNO';
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
