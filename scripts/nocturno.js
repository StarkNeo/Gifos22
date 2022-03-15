var vista;
var estilo=document.querySelector('link','status');

if (!localStorage.modo) {
    vista='modoDiu';
    localStorage.setItem('modo',vista);
}
else {
 vista=localStorage.getItem('modo');
}

function decision() {
    
    if (vista==='modoDiu') {
        estilo.href='/styles/styles.css';
    } else {
        estilo.href='/styles/nocturno.css';
    }
}

decision();
document.addEventListener('click',e=>{
    if (e.target.className==='modoDiu') {
        e.target.className='modoNoc';
        vista='modoNoc';
        
    }
    else if(e.target.className==='modoNoc'){
        e.target.className='modoDiu';
        vista='modoDiu';

        //localStorage.setItem('modo',vista);      
    }
    localStorage.setItem('modo',vista);
    decision();
})