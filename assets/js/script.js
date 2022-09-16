const palabras = ['CARAMELO','TORMENTA','DESARROLLO','JAVASCRIPT',"LENGUAJE","REDUNDANTE","ORIGINAL"];
const imgEstado = './assets/img/estado';
let palabra;
let armado="";
let vidasPerdidas = 0;
let caracteres=0;

function iniciarJuego() {
    document.getElementById('menu').className = "d-none";
    document.getElementById('game').className += "d-block";
    document.getElementById('play-reset').className += "d-block";
    palabra = palabras[getRandomInt(palabras.length)];
    prepararJuego();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function prepararJuego() {
    console.log(palabra);
    for (i=0; i<palabra.length; i++) {
        document.getElementById('word').innerHTML += '<div class="border-bottom border-2 px-lg-4 px-2">&nbsp;</div>';
    }
}


let btns = document.querySelectorAll('.btn-word');

btns.forEach(btn => {
    btn.addEventListener('click',function() {
        let letra = btn.innerHTML;
        verificarLetra(letra);
        btn.disabled = true;
    });
});

function verificarLetra(letra){
    if(palabra.includes(letra)){
        rellenarLetra(letra);
    }else {
        let life = parseInt(document.getElementById('life').innerHTML)-1;
        document.getElementById('life').innerHTML = life;
        verificarDerrota(vidasPerdidas++);
    }
}

function rellenarLetra(letra){
    for(i=0; i<palabra.length; i++){
        if(palabra[i] === letra){
            document.getElementById('word').children[i].innerHTML = letra;
            armado+=letra;
            verificarVictoria(caracteres++);
        }
    }
}

function verificarVictoria(){
    if(caracteres === palabra.length){
        Swal.fire({
            icon: 'success',
            title: '¡Ganaste, Felicidades!',
            confirmButtonText: 'Salir',
        }).then(()=>{
            resetGame()
        });
    }
}

function verificarDerrota(){
    document.getElementById('imgState').setAttribute('src',imgEstado+Math.round(vidasPerdidas/2)+'.svg');
    if(vidasPerdidas === 9){
        Swal.fire({
            icon: 'error',
            title: 'Game Over',
            text: 'Fin del Juego',
            confirmButtonText: 'Salir',
        }).then(()=>{
            resetGame()
        });
    }
}

function getPista() {
    let pista = palabra.charAt(Math.random() * palabra.length);
    if (armado.includes(pista.toString())) {
        getPista();
    } else {
        rellenarLetra(pista);
        btns.forEach((btn)=>{
            let letra = btn.innerHTML;
            if(letra == pista){
                btn.disabled = true;
            }
        });
        document.getElementById('pista').disabled = true;
    }
}

function resetGame() {
   document.getElementById('word').innerHTML = "";
   btns.forEach(btn => {
       btn.disabled = false;
   });
   vidasPerdidas = 0;
   caracteres = 0;
   iniciarJuego();
   document.getElementById('imgState').setAttribute('src',imgEstado+'0.svg');
   document.getElementById('pista').disabled = false;
}
