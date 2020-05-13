/*
A description of the DOMContentLoaded event and why it may be preferable 
to use over the window.onload event. This new event is triggered before 
the load event so you don't have to wait for the entire page to load. 
Thus it can result in significant performance gains.
*/

document.addEventListener('DOMContentLoaded',() => {
    //card options
    const cardArray = [
        {   name: 'ave', img: 'imagenes/ave.png'    },
        {   name: 'ave', img: 'imagenes/ave.png'    },
        {   name: 'bicicleta', img: 'imagenes/bicicleta.png'    },
        {   name: 'bicicleta', img: 'imagenes/bicicleta.png'    },
        {   name: 'carro',  img: 'imagenes/carro.png'   },
        {   name: 'carro', img: 'imagenes/carro.png'    },
        {   name: 'gallina', img: 'imagenes/gallina.png'    },        
        {   name: 'gallina', img: 'imagenes/gallina.png'    },        
        {   name: 'gato', img: 'imagenes/gato.png'  },
        {   name: 'gato', img: 'imagenes/gato.png'  },
        {   name: 'platano', img: 'imagenes/platano.png'    },
        {   name: 'platano', img: 'imagenes/platano.png'    },
    ]
    // Se reordena el array de forma aleatoria
    cardArray.sort(()=> 0.5 - Math.random());

const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector("#result");
// Array de elementos seleccionados
var cardsChosen = [];
// Array de los Id de elementos selecionados
var cardsChosenId = [];
var cardsWon = [];
var card;
var cards;

// Create your board
/* 
Se crea la tabla y los elementos img que lo conforman usando FOR
asi como sus atributos correspondientes
*/
function createBoard(){
    for (let index = 0; index < cardArray.length; index++) {
        card = document.createElement('img');
        card.setAttribute('src','imagenes/hotdog.jpg');
        card.setAttribute('height', '150px');
        card.setAttribute('width','150px');
        // Se usa el index del ciclo para asignar un data-id a cada elemento
        card.setAttribute('data-id',index);
        card.addEventListener('click',flipCard);
        // Se concatena el elemento "card" a "grid"
        grid.appendChild(card);
    }
}
// flip card
// Accion que se ejecutara con el evento click
function flipCard(){
    // Guardamos el ID del elemento seleccionado
    var carId = this.getAttribute('data-id');
    // Se almacena el nombre del elemento en el array cardsChosen
    cardsChosen.push(cardArray[carId].name);
    // Se almacena el ID del elemento en el array cardsChosenID
    cardsChosenId.push(carId);
    // Mostramos la imagen correspondiente cambiando su atributo srd
    this.setAttribute('src', cardArray[carId].img);
    // Quitamos Listener para evitar se use nuevamente
    this.removeEventListener('click',flipCard);
    // Verificamos si es el segundo elemento selecionado
    if(cardsChosen.length === 2){
        // Validamos si es la misma imagen
        setTimeout(checkForMatch, 600);
    }
}
// Check for match
function checkForMatch(){
    // Se toman nuevemente los elementos img
    cards = document.querySelectorAll('img');
    // Se asigna a una variable el ID de cada elemento del array cardsChosenId
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    // Se comprueba si el nombre es el mismo
    if(cardsChosen[0] === cardsChosen[1]){
        alert("You found a match");
        // En caso de coincidir se cambia el src de ambos elementos
        cards[optionOneId].setAttribute('src','imagenes/pantera.png');
        cards[optionTwoId].setAttribute('src','imagenes/pantera.png');
        // Se asigna el arreglo cardsChosen a un nuevo arreglo cardsWon
        cardsWon.push(cardsChosen);
    }else{
        // Si no es la misma imagen se reestablece su atributo src y se agrega el evento
        cards[optionOneId].setAttribute('src','imagenes/hotdog.jpg');
        cards[optionTwoId].setAttribute('src','imagenes/hotdog.jpg');
        // Se agrega nuevemente el Listener
        cards[optionOneId].addEventListener('click',flipCard);
        cards[optionTwoId].addEventListener('click',flipCard);
        
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2){
        resultDisplay.textContent = "Congratulations!! You found them all";
    }
}
createBoard();

});