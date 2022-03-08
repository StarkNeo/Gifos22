
//PASAR ESTO A NOCTURNO SCSS DESPUES
var estatus;
let hojaStyle = document.querySelector('link', 'status');


function vista() {
    if (!localStorage.getItem('modoVista')) {
        estatus = 'modoDiu';
        localStorage.setItem('modoVista', estatus);
    }

    else {
        estatus = localStorage.getItem('modoVista');
    }

    if (estatus==='modoDiu') {
        hojaStyle.href='/styles/styles.css';
    }
    else if(estatus==='modoNoc'){
        hojaStyle.href='/styles/nocturno.css';
    }
}

vista();

function modo() {
    estatus = document.getElementsByTagName('li')[0].className;
    console.log(estatus);
    localStorage.setItem('modoVista', estatus);
}

var listaNoc = document.getElementsByTagName('li')[0];
let logoNoc = document.getElementById('logo');


listaNoc.addEventListener('click', () => {
    if (listaNoc.className === 'modoDiu') {
        listaNoc.innerHTML = 'MODO DIURNO';
        listaNoc.className = "modoNoc";
        logoNoc.src = '/images/Logo-modo-noc.svg';
    }
    else if (listaNoc.className === 'modoNoc') {

        listaNoc.className = "modoDiu";
        listaNoc.innerHTML = 'MODO NOCTURNO';
        logoNoc.src = '/images/logo-desktop.svg';
    }
    
    

})
modo()




