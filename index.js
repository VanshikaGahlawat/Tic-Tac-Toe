//constants
const start= 0;
const end= 1;

//html elements
const turn= document.getElementById('player');
const gameTable= document.getElementById('game')

const game ={
    state: start,
    moves:0,
    player:'X'
}


function nextTurn(){
    if (game.player === "X") game.player= "O"
    else game.player="X"
    turn.textContent = game.player;
}

function boxClicked(row, col){
    gameTable.children[0].children[row-1].children[col-1].textContent = game.player;
    isRowCaptured(row);
    isColCaptured(col);
    isDiagCaptured();
    nextTurn();
}

