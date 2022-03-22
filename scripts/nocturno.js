var vista;
var estilo = document.querySelector('link', 'status');

if (!localStorage.modo) {
    vista = 'modoDiu';
    localStorage.setItem('modo', vista);
}
else {
    vista = localStorage.getItem('modo');
}

function decision() {
    let logo = document.getElementById('logo');
    let modo = document.getElementsByTagName('li')[0];
    let iconoClose = document.getElementById('iconoClose');
    let iconoLupa = document.getElementById('iconoLupa');
    //let btnsliderLeft = document.getElementById('sleft');
    //let btnsliderRight = document.getElementById('sright');
    let btnmas = document.getElementById('mas');



    if (vista === 'modoDiu') {
        estilo.href = '/styles/styles.css';
        logo.src = "/images/logo-desktop.svg";
        modo.innerHTML = 'MODO NOCTURNO';
    } else {
        estilo.href = '/styles/nocturno.css';
        modo.innerHTML = 'MODO DIURNO';
        logo.src = "/images/Logo-modo-noc.svg";
        //iconoClose.src = '/images/icon-search-modo-noct.svg';
        //iconoLupa.src = '/images/icon-search-modo-noct.svg';
        //btnsliderLeft.src = '/images/button-slider-left-md-noct.svg';
        //btnsliderRight.src = '/images/button-slider-right-md-noct.svg';
        btnmas.src = '/images/CTA-ver+-modo-noc.svg';
    }
}

decision();
document.addEventListener('click', e => {
    if (e.target.className === 'modoDiu') {
        e.target.className = 'modoNoc';
        vista = 'modoNoc';

    }
    else if (e.target.className === 'modoNoc') {
        e.target.className = 'modoDiu';
        vista = 'modoDiu';

        //localStorage.setItem('modo',vista);      
    }
    localStorage.setItem('modo', vista);
    decision();
})