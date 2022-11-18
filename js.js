//1º criar variaveis globais de altura e largura
//e utilizar o recurso para verificar a alt/lar atualizada da pag

var altura = 0
var largura = 0
var vidas= 1
var tempo = 60
var criarMosquitoTempo= 1500

// ao selecionar o nivel a informação da pagina é guardada
// dentro da variavel incluindo a interrogação
var nivel = window.location.search
//remover a interrogação
nivel = nivel.replace('?', '')

//condição para o tempo de acordo com o nivel selecionado
if(nivel === 'normal'){
    //tempo 1500 milisegundo
    criarMosquitoTempo= 1500
} else if(nivel === 'medio'){
    //tempo 1000 milisegundo
    criarMosquitoTempo= 1000
} else if(nivel=== 'dificil'){
     //tempo 750 milisegundo
     criarMosquitoTempo= 750
}



//tamanho da pag
function ajustarTamanho() {
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustarTamanho()

//criar e controlar o tempo do cronometro e da aparição do mosquito
var cronometro = setInterval(function(){
    tempo--
    if (tempo < 0){
        clearInterval(cronometro)
        clearInterval(mosquitoTempo)
        window.location.href='vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML=tempo
    }
    
},1000)

function criarElemento() {
    // remover o mosquito anterior(caso exista )
    // criar a lógica para controlar a vida (corações )
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        //se as vidas acabarem é redirecioando para a tela de gameover
        if(vidas>=3) {   
            window.location.href='game-over.html'
        } else{
            document.getElementById('v' + vidas).src='./imagens/coracao_vazio.png'
            vidas++
        }
    }

    //math.random gerar números aleatórios de 0 a 1 
    //multiplicar por esse gerador de números baseado na largura(x) e altura(y)
    //math.floor- arredondar para não ficar com tantas casas decimais
    //para a imagem não utrapassar o limite da tela vai ser subtraido menos 90px 
    var posicaox = Math.floor(Math.random() * largura) - 90
    var posicaoy = Math.floor(Math.random() * altura) - 90

    //caso a posicao x ou y seja menor que  0, a posição vai recber o valor 0
    // ou seja, excluindo a posibilidade de ser uma posição negativa
    posicaox = posicaox < 0 ? 0 : posicaox
    posicaoy = posicaoy < 0 ? 0 : posicaoy

    //criar o elemento html de forma aleatória na tela
    //criar o elemento 
    var mosquito = document.createElement('img')
    
    //acessar o elemento e atribuir um valor (o mesmo de colocar a imagem direto no html)
    mosquito.src = './imagens/mosca.png'
    
    //aplicar estilo a imagem que estamos criando
    //concatenando com espaços, pois poderia ficar dois casos juntos
    // ex:moquito1ladoA
    mosquito.className = variacaoDeTamanho() + ' ' + ladoAB()
    
    //mostrar imagem de forma programatica e de acordo com a posicao x e y 
    //para que essas alterações possam ser feitas o elemento tem que ser absoluto
    mosquito.style.left = posicaox + 'px'
    mosquito.style.top = posicaoy + 'px'
    mosquito.style.position = 'absolute'

    //criar um id para a imagem
    mosquito.id='mosquito'

    //criar funcao para quando clicar no mosquito remove-lo
    //se clicarmos antes de 'existir' o elemento(anterior) mosquito não vai afetar nas vidas, pois para afetar o
    //elemento mosquito precisa existir anteriormente
    mosquito.onclick = function(){
        this.remove()

    }
   
    // acessar o body e incluir essa imagem (adicionando um filho para o body)
    document.body.appendChild(mosquito)
}

function variacaoDeTamanho(){
    // criar uma variavel para armazenar valores aleatorios
    // multiplicar por 3 para gerar valores de 0 até menores que 3
    var opcao = Math.floor(Math.random() * 3)
    console.log(opcao)
    //criar uma condição caso seja 0,1,2
    switch (opcao){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//deixar que o mosquito apareca ora virado para direita, ora virado para esquerda
function ladoAB(){
    //fazer o mesmo que da variacao de tamanho. unica diferenca é que só pode ser 1 (direita) ou 2(esquerda)
    var opcao = Math.floor(Math.random() * 2)
    switch(opcao) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'
	}
}