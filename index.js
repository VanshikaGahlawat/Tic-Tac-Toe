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

function endGame(winner){
    if (winner) {
        alert('Game Over | Winner: '+ winner);
    }
    else {
        alert('Game Over | Match Draw');
    }
    game.state = end;

}

function restartGame(){
    game.state = start;
    game.moves= 0;
    
    if( Math.random() > 0.5) game.player= 'X'
    else game.player='O'

    Array.from(document.getElementsByTagName('td')).forEach( cell => cell.textContent= '')
 }

function checkSeq(seqArray){
    const winningseq= game.player+game.player+game.player;
    if( seqArray.map( i => i.textContent).join('') === winningseq) {
        endGame(game.player);
    }
    else return;
}

function isRowCaptured(presentRow){
    const rowSeq= Array.from(gameTable.children[0].children[presentRow-1].children)
    checkSeq(rowSeq);
}

function isColCaptured(presentCol){
    const colSeq= [ 
        gameTable.children[0].children[0].children[presentCol-1],
        gameTable.children[0].children[1].children[presentCol-1],
        gameTable.children[0].children[2].children[presentCol-1]
    ]
    checkSeq(colSeq);
}

function isDiagCaptured(row, col){
    if (row !== col && (row + col) !== 4) return;
    const diag1= [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ]
    checkSeq(diag1);

    const diag2= [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ]
    checkSeq(diag2);
}

function nextTurn(){
    game.moves++;
    if (game.player === "X") game.player= "O"
    else game.player="X"

    if(game.moves === 9) endGame();

    turn.textContent = game.player;
}

function boxClicked(row, col){
    if (game.state === end) {
        alert('Game Ended | Restart to play');
        return
    }
    let box= gameTable.children[0].children[row-1].children[col-1];
    box.textContent = game.player;
    isRowCaptured(row);
    isColCaptured(col);
    isDiagCaptured(row, col);
    nextTurn();
    
}

