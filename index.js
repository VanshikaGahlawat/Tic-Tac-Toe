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

function checkSeq(seq){
    const winningseq= game.player+game.player+game.player;
    if( seq === winningseq) alert('Game Over | Winner: ' + game.player);
    else return;
}

function isRowCaptured(presentRow){
    const tblrow= Array.from(gameTable.children[0].children[presentRow-1].children)
    const rowSeq= tblrow.map(item => item.textContent).join('');
    checkSeq(rowSeq);
}

function isColCaptured(presentCol){
    const tblcol= [ 
        gameTable.children[0].children[0].children[presentCol-1],
        gameTable.children[0].children[1].children[presentCol-1],
        gameTable.children[0].children[2].children[presentCol-1]
    ]
    const colSeq= tblcol.map(item => item.textContent).join('');
    checkSeq(colSeq);
}

function isDiagCaptured(row, col){
    if (row !== col && (row+ col) !== 4) return;
    const diag1= [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ].map(item => item.textContent).join('');
    console.log(diag1)
    checkSeq(diag1);

    const diag2= [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ].map( item => item.textContent).join('');
    checkSeq(diag2);
}

function nextTurn(){
    game.moves++;
    if (game.player === "X") game.player= "O"
    else game.player="X"
    turn.textContent = game.player;

    if(game.moves === 9) alert("Game Over");
}

function boxClicked(row, col){
    const box= gameTable.children[0].children[row-1].children[col-1];
    box.textContent = game.player;
    isRowCaptured(row);
    isColCaptured(col);
    isDiagCaptured(row, col);
    nextTurn();
    
}

