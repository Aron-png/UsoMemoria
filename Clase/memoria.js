document.write("hola")
console.log("Esto se va a visualizar en consola en inspeccionar elemento")
let board;//definir una variable indefinido, board=nombre de una variable

//Creamos este arreglo, elegimos aleatoriamente uno de sus elemento y lo ponemos en la matrix en orden...
//luego ese emoji elegido lo quitamos de este array... haciendose mas pequeño
let simbolosDisponible = ["🐻", "🐷", "🐯", "🐰", "🐱", "🐲", "🐳", "🐵"]

/*
[
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
*/
//Crear una matrix
function createBoard(numFilas, numColumnas){
    const rows = [] //¿Por que "const" si sabemos que se usa para mantener un dato de manera fija?
    //rows apunta o referencia un espacio vacio
    //Ese espacio que esta apuntando, lo estoy agregando valores de manera indefinida
    //La direccion de memoria se mantiene constante y por eso es tipo "const"

    //Si quieres cambiar su direccion poner...
    //rows=[2,3]

    //Crear arreglo temporal de simbolos, con 2 emoji del mismo tipo
    const numElementosArregloTemporal = (numFilas*numColumnas)/2
    const arrSimbolosTemporal = []
    for(let i=0; i<numElementosArregloTemporal; i++){
        arrSimbolosTemporal.push(simbolosDisponible[i])
        arrSimbolosTemporal.push(simbolosDisponible[i])
    }

    //La funcion random sale decimal. Redondear hacia arriba con un floor 
    //Math.random()*5 = el numero va de 0 a 4
    //Math.floor(Math.random())

    for (let i = 0; i < numFilas;  i++) {
        const casillas=[]
        for(let j = 0; j < numColumnas; j++){
            const posicionAlAzar = Math.floor(
                Math.random()*arrSimbolosTemporal.length//longitud de la matrix Temporal
            )
            const simboloElegido = arrSimbolosTemporal[posicionAlAzar]
            const dataCasilla={
                simbolo : simboloElegido, //Aca deberia ir simbolo:simboloElegido "🐵"
                /*
                copiar y pegar emoji https://www.w3schools.com/charsets/ref_emoji.asp 
                */
                visible : false
            }
            casillas.push(dataCasilla)//push: agrega el elemnto 0 o un mono
        }
        rows.push(casillas)//push: agrega el elemnto casilla0
    }
    return rows
}

//Imprimir matrix
function printBoard(board){
    //Con este for yo puedo iterar con todos los elementos del arreglo, ya no necesito poner un length.array
    let filaStr=""
    for(let fila of board){
        for(let casilla of fila){
            if(casilla.visible === true){
                filaStr = filaStr + "\t" +casilla.simbolo + ""
            }else{
                filaStr = filaStr + "\t" + "⬜" + ""
            }
            
        }
        filaStr +="\n \n"
    }
    console.log(filaStr)
}

// mosntrar la casilla en la posicion 2, 2. recuerda q empieza de 0.
function mostrarCasilla(board, fila, columna){
    const dataCasilla = board[fila][columna]
    dataCasilla.visible = true
}

// ocultar la casilla en la posicion 2, 2. recuerda q empieza de 0.
function ocultarCasilla(board, fila, columna){
    const dataCasilla = board[fila][columna]
    dataCasilla.visible = false
}

//Que consiga
//usamos data casilla, para no usar las posiciones, x1, y1 x2, y3: es demaciado texto.
function verificarMAtchCasillas(dataCasilla1, dataCasilla2){
    return dataCasilla1.simbolo == dataCasilla2.simbolo
}

function main(){
    board = createBoard(4,4)
    printBoard(board)
    console.log(
        verificarMAtchCasillas(
        board[2][2],
        board[1][1]
        )
    )
    /*
    Conclusion
    Deberia retornarte False porque es Ya tenemos una matrix con diferentes emojis, 
    cada casilla es un "objeto" que tiene 2 atributos (simbolo, visible), 
    el verificarMAtchCasilla verifica el "simbolo", pero lo que se imprime es lo visible.
    */
}

main()
