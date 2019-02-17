//constantes
const firePixelArray = []
let fireWidth = 42
let fireHeight = 42
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
let debug = false

//Funcao que inicializa o codigo
function start(){
    CreateFireDataStructure();
    //console.log(firePixelArray);
    createFireSource();
    RenderFire();

    //executa a cada 1 segundo
    setInterval(CalculateFirePropagation,50);
} 

function CreateFireDataStructure(){
    
    //multiplicando a altura pela largura para criar a tabela
    const numberOfPixels = fireHeight * fireWidth

    //preenche com 0 - "potencia" do fogo
    for (let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0;        
    }
}

function CalculateFirePropagation(){
    /*
        Para cada pixel percorrido, ele olhará o de baixo e subtrai 1
        Causando o efeito de fogo
    */
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            //encontra o indice
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex);           
        }        
    }

    RenderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    /*
        Pega o pixel atual e soma a largura, assim posiciona no pixel a baixo.
        Se o indice for maior que o tamanho do array, não faz nada
    */
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return;
    }

    const decay = Math.floor(Math.random()*3)
    const belowPixelIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = 
        belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0

    firePixelArray[currentPixelIndex - decay] = newFireIntensity
}

function RenderFire(){
    
    //monta a tabela no hmtl para criar o fogo
    let html = '<table cellpadding=0 cellspacing=0>'

    //percorre as linhas
    for (let row = 0; row < fireHeight; row++) {
        
        html += '<tr>'
        
        //percorre as colunas
        for (let column = 0; column < fireWidth; column++) {
            //encontra o indice
            const pixelIndex = column + (fireWidth * row)
            //grava o array de intensidade
            const fireIntensity = firePixelArray[pixelIndex]
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`
            
            if (debug === true) {
                html += '<td>'
                html +=  `<div class="pixel-index">${pixelIndex} </div>`  
                html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
                html += '</td>'
            }else{

                html += `<td class="pixel" style="background-color: rgb(${colorString})"> </td>`
            }


        }
        
        html += '</tr>'    }
        html += '</table>'
    //atribui o valor a tag
    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column < fireWidth; column++) {
        /*
            Como o for utiliza base 0 e o array base 1, ao criar a variavel overflowPixelIndex, ele trará um numero a mais
            Sabendo disso, o pixelIndex faz o calculo de forma que se subtraia uma linha, e incremente uma coluna.
            Ex:
            Array de 2 x 2 = 4 posições, ou de 0 a 3
            
            0 1
            2 3
            
            overflowPixelIndex = 2 x 2 = 4
            * para a primeira rodada do for
            column = 0
            pixelIndex = 4 - 2 + 0 = 2
            * Segunda rodada
            column = 1
            pixelIndex = 4 - 2 + 1 = 3
        */
        const overflowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = 36
        
    }
}

function setDebug(){
    /*
        Ativa ou desativa o modo de debug
    */
    
    if (debug === false) {
        fireWidth = 35
        fireHeight = 25
        debug = true
    } else {
        fireWidth = 42
        fireHeight = 42
        debug = false
    }

    CreateFireDataStructure();
    //console.log(firePixelArray);
    createFireSource();
}

start()


//a paleta utilizada tem 37 cores, se inicia por 36 na base