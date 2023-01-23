//document.write("hola") escribe hola en el html
console.log("Esto se va a visualizar en consola en inspeccionar elemento")
//definir una variable indefinido, board=nombre de una variable, representa la matrix en html
let board;
//Las siguientes 2 variables sirven para que al momento de encontrar dos emoji iguales se mantengan
//click 1
let estadoJuego = 1
//despues del segundo click, comparar 2 emojis, el actual y el "anterior=casillaTemporal
let casillaTemporal = null 

//Creamos este arreglo, elegimos aleatoriamente uno de sus elemento y lo ponemos en la matrix en orden...
//luego ese emoji elegido lo quitamos de este array... haciendose mas pequeño
let simbolosDisponible = ["🐻", "🐷", "🐯", "🐰", "🐱", "🐲", "🐳", "🐵"]

//Crear una matrix segun el numero Filas y Columnas que se le ingrese
function createBoard(numFilas, numColumnas){
    const rows = [] //La fila de la matrix
    /*
    Nota:
    ¿Por que "const" si sabemos que se usa para mantener un dato de manera fija?
    rows apunta o referencia un espacio vacio
    Ese espacio que esta apuntando, lo estoy agregando valores de manera indefinida
    La direccion de memoria se mantiene constante y por eso es tipo "const"
    Si quieres cambiar su direccion poner...
    rows=[2,3]
    */

    //En resumen, hasta el for: Crear "array Temporal" de simbolos, con 2 emojis del mismo tipo
    const arrSimbolosTemporal = []
    //Numero de emojis a usar, con 2 emoji del mismo tipo
    const numElementosArregloTemporal = (numFilas*numColumnas)/2
    //Coge un valor del array de emojis y lo pone en la matriz 2 veces, push=agregar valor al array.
    for(let i=0; i<numElementosArregloTemporal; i++){
        arrSimbolosTemporal.push(simbolosDisponible[i])
        arrSimbolosTemporal.push(simbolosDisponible[i])
    }
    /*
    Nota:
    La funcion random sale decimal. Redondear hacia arriba con un floor 
    Math.random()*5 = el numero va de 0 a 4
    Math.floor(Math.random())
    */
    
    for (let i = 0; i < numFilas;  i++) {
        const casilla=[]//La columna de la matrix
        /*
        [
          [0,0,0],->Casilla
          [0,0,0],
          [0,0,0]
         ] --> rows
        */
        for(let j = 0; j < numColumnas; j++){
            const posicionAlAzar = Math.floor(
                Math.random()*arrSimbolosTemporal.length//longitud de la matrix Temporal
            )
            //emoji random de "array Temporal"= simmboloElegido
            const simboloElegido = arrSimbolosTemporal[posicionAlAzar]
            //array.splice(0,2) → eliminar 2 elementos desde la posicion 0 del array.
            arrSimbolosTemporal.splice(posicionAlAzar,1)
            const dataCasilla={
                simbolo : simboloElegido, //Aca deberia ir simbolo:simboloElegido "🐵"
                /*
                copiar y pegar emoji https://www.w3schools.com/charsets/ref_emoji.asp 
                */
                visible : false
            }
            casilla.push(dataCasilla)//--->push: agrega el elemnto a la columna Cassila
        }

        rows.push(casilla)//-------------->push: agrega el elemnto a la fila rows.
    }
    return rows 
}

//Imprimir matrix=board en la CONSOLA
function printBoard(board){
    //Con este for yo puedo iterar con todos los elementos del arreglo, ya no necesito poner un length.array
    let filaStr=""
    for(let fila of board){//Imprimimos la fila
        for(let casilla of fila){//Imprimimos la columna
            if(casilla.visible === true){
                filaStr = filaStr + "\t" +casilla.simbolo + ""
            }else{
                filaStr = filaStr + "\t" + "⬜" + ""
            }
        }
        filaStr +="\n \n"
    }
    console.log(filaStr)//Lo que se visualiza en la consola
}

   /*====Para mostrar o ocultar solo necesitan cambiar la variable visible a true o false===*/
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

//Verificar si cuando 2 emojis son iguales, retorne true
//usamos data casilla, para no usar las posiciones, x1, y1 x2, y3: es demaciado texto.
function verificarMAtchCasillas(dataCasilla1, dataCasilla2){
    return dataCasilla1.simbolo === dataCasilla2.simbolo
}
/*
  evt esta el elmento  en donde se ah echo el click
  console.log("Se hizo click en un boton") imprimir
  console.log(evt.target) tener referencia del boton
*/

//Verifica si los 2 emjois son encontrados son iguales para mostrarlos, sino los oculata.
function buttOnClik(evt){
    //Evento de click
    const butClickeado = evt.target
    //Verifica en que fila y columna esta clickeado
    const fila = butClickeado.getAttribute("fila") 
    const columna = butClickeado.getAttribute("Columna")
    const casilla = board[fila][columna]
    //Cambiar el visible de false a true. Con "!" significa la negacion del valor anterior
    //Si es true sera false y si es false sera true
    casilla.visible = !casilla.visible
    //En la primera iteracion, el estado de Juego siempre sera 1.
    if(estadoJuego==1){
        casillaTemporal = casilla
        estadoJuego = 2
    }else{
        estadoJuego = 1
        //Verificar si hubo match, para luego pasarlo al estado 1.
        const resultado = verificarMAtchCasillas(casillaTemporal, casilla)
        //Si es resultado es verdadero, significa que son las mismas... hubo macth
        if(resultado==false){
            //Si fue falso, ocultan las casillas
            casillaTemporal.visible = false
            casilla.visible = false
        }
    }
    renderizarBoard(board)
}
//Crea el div en html
function crearDivFila(){
    const divFila = document.createElement("div")
    divFila.setAttribute("class", "row")// Asignamos al div un class="row"
    //Quedaria: <div class="row"></div>
    return divFila
}
//En cada columna html, se le agrega un boton segun la fila y columna.
function crearDivColumna(fil, col, simbolo, visible){
    const divColumna = document.createElement("div")
    divColumna.setAttribute("class", "col")// Asignamos en un div class="col"

    //Crear el boton hijo, con los siguientes atributos
    const divBut = document.createElement("button")
    divBut.setAttribute("type", "button")
    divBut.setAttribute("class", "btn btn-success")
    divBut.setAttribute("style","font.size:40px;")
    //
    divBut.setAttribute("fila", fil)
    divBut.setAttribute("columna", col)

    //Pone invisible o visible el emoji
    if(visible == true){
        divBut.innerText = simbolo
    }else {
        divBut.innerText = ""
    }
    //No estoy ejecutando la funcion "buttOnClik()"-->NO
    //Pasarle la funcion a un objeto, la funcion se ejecutara cuando se haga "clik"
    divBut.onclick = buttOnClik;

    //Agregar el boton al divColumna
    divColumna.appendChild(divBut)
    /*
    Al final queraia asi:
    <div class="col">
        <button type="button" class="btn btn-success" style="font.size:40px;" fila="0" columna="0">
        </button>
    </div>
    */
    return divColumna
}
//Elimnar y crear una nueva matrix
function renderizarBoard(board){
    /*
    el divBoard es la dicc del arbol, que es la "id" del unico "div" del html
    Para que al ejecutar .innerHTML="" borrara solo lo que este dentro del div
    Necesitamos borrar porque cada vez que hacemos click estamos creando una nueva
    tabla. Por lo que necesitamos borrar la antigua. Sino veremos 2 tablas o matrices
    */
    const divBoard = document.getElementById("board")
    divBoard.innerHTML=""
    //Hasta aqui es de borrar

    //document.body.innerHTML=""

    //Aca crear la matriz o tabla
    for(let i = 0; i<board.length; i++){
        const fila = board[i]
        let divFila = crearDivFila()
        for(let j = 0; j < fila.length; j++){
            const casilla = fila[j]
            let divColumna = crearDivColumna(i, j, casilla.simbolo, casilla.visible)
            //Agregamos a la fila una columna
            divFila.appendChild(divColumna)//Agergamos el hijo del hijo
        }
        divBoard.appendChild(divFila)//Agregamos el hijo del padre
    }
    /*
    <div id="board">
        <div class="row">
            <div class="col">
    */
}

function main(){
    board = createBoard(3,3)
    printBoard(board)//Imprime una matrix en la consola
    renderizarBoard(board)//Imprime la matrix en html
    /*
    console.log(
        verificarMAtchCasillas(
        board[2][2],
        board[1][1]
        )
    )
    
    Conclusion
    Deberia retornarte False porque es Ya tenemos una matrix con diferentes emojis, 
    cada casilla es un "objeto" que tiene 2 atributos (simbolo, visible), 
    el verificarMAtchCasilla verifica el "simbolo", pero lo que se imprime es lo visible.
    */
}

main()
