const html =document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const startPauseBt = document.querySelector('.app__card-primary-button');
const timer = document.querySelector('#timer');
const imagem = document.querySelector('.app__image')
const texto = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioIniciar = new Audio('/sons/play.wav')
const audioPausar = new Audio('/sons/pause.mp3')
const audioFinal = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 5
let intervaloId = null
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

musica.loop = true

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


focoBt.addEventListener('click', ()=>{
   alterarContexto('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', ()=>{
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


timer.addEventListener('click', ()=>{
    html.setAttribute()
})

function alterarContexto(contexto){
    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    
    
    switch(contexto){
        case "foco":
            texto.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break
        case "descanso-curto":
            texto.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `    
            break
        case "descanso-longo":
            texto.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            ` 
        default:
            break  
    }

}

const contagemRegressiva = ()=>{
    if(tempoDecorridoEmSegundos <= 0){
        audioFinal.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }

    tempoDecorridoEmSegundos -= 1
    console.log('temporisador: ' + tempoDecorridoEmSegundos)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    
    if(intervaloId){
        audioPausar.play()
        zerar()
        return
    }
    audioIniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
}
