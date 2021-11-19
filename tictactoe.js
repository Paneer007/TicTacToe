let childSelector;
let parentSelector;
let gameMode;
function gameStart(){
    let buttons=document.querySelectorAll('.gamePlay');
    buttons.forEach((button)=>{
        button.addEventListener('click',GamePlay)
    })
}
function appendManyChild(Arr){
    parentSelector=document.getElementById('EnterPlayerName');
    for (let i=0;i<Arr.length;i++){
        parentSelector.appendChild(Arr[i])
    }
}
function AIGameMode(e){
    tictactoeGrid('AI')
    let GameStart = e.target.id;
    let UserName= document.getElementById('Player').value;
    if (GameStart=='PlayGameO'){

        gameMode=tictactoeGame('AI',UserName);
        let tempArr = gameMode.playerMove(undefined,undefined);
        let x= tempArr[0];
        let y =tempArr[1];
        getBoxViaDataValues(x,y)
        gameMode.returnMove();
        gameMode.checkGrid()
    }else{
        gameMode=tictactoeGame(UserName,'AI');
    }
}
function humanVsAI(){
    parentSelector=document.getElementById('EnterPlayerName');
    parentSelector.innerHTML='';
    parentSelector=document.getElementById('theGrid');
    parentSelector.innerHTML='';
    let name= document.createElement('p');
    let nameInput = document.createElement('input');
    let PlayGameX=document.createElement('button');
    let PlayGameO=document.createElement('button');
    let choose=document.createElement('p');
    appendManyChild([name,nameInput,choose,PlayGameX,PlayGameO]);
    name.textContent='Enter Player Game';
    nameInput.className='InputNameStyle';
    nameInput.setAttribute('id','Player');
    PlayGameX.setAttribute('class','PlayGameButton');
    PlayGameO.setAttribute('class','PlayGameButton');
    choose.textContent='Select your game mode'
    PlayGameX.id='PlayGameX';
    PlayGameO.id='PlayGameO';
    PlayGameX.textContent='Play Game as X';
    PlayGameO.textContent='Play Game as O';
    let buttons =document.querySelectorAll('.PlayGameButton');
    buttons.forEach((button)=>{
        button.addEventListener('click',AIGameMode)
    })    
}
function nameOfPlayer(){
    parentSelector=document.getElementById('EnterPlayerName');
    parentSelector.innerHTML='';
    parentSelector=document.getElementById('theGrid');
    parentSelector.innerHTML='';
    console.log('executed')
    let name1 = document.createElement('p');
    let name2 = document.createElement('p');
    let name1Input= document.createElement('input');
    let name2Input = document.createElement('input');
    let PlayGame = document.createElement('button')
    appendManyChild([name1,name1Input,name2,name2Input,PlayGame]);
    name1.textContent='Enter Player 1 Name (will play X)';
    name2.textContent='Enter Player 2 Name (will play O)';
    name1Input.className='InputNameStyle';
    name2Input.className='InputNameStyle';
    name1Input.setAttribute('id','PlayerX');
    name2Input.setAttribute('id','PlayerO');
    PlayGame.textContent='PlayGame/Play Again';
    PlayGame.setAttribute('id','PlayGameButton')
    PlayGame.addEventListener('click', newGame)
}
function GamePlay(e){
    let buttonValue=e.target.id;
    if (buttonValue=='TwoPlayer'){
        let parentSelector=document.getElementById('tictactoeGame');
        let childSelector=document.createElement('div');
        let gameDiv=document.getElementById('theGrid');
        parentSelector.insertBefore(childSelector,gameDiv);
        childSelector.setAttribute('id','EnterPlayerName');
        nameOfPlayer();
    }else{
        let parentSelector=document.getElementById('tictactoeGame');
        let childSelector=document.createElement('div');
        let gameDiv=document.getElementById('theGrid');
        parentSelector.insertBefore(childSelector,gameDiv);
        childSelector.setAttribute('id','EnterPlayerName');
        humanVsAI()
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function tictactoeGrid(event=undefined){
    parentSelector=document.getElementById('theGrid');
    parentSelector.innerHTML='';
    let clearText= document.getElementById('Status').textContent='';
    for (let i=0; i<3;i++){
        childSelector=document.createElement('div');
        parentSelector.appendChild(childSelector);
        childSelector.id=`Row ${i}`;
        childSelector.className='tictactoeRow'
        for (let j=0;j<3;j++){
            babySelector=document.createElement('div');
            childSelector.appendChild(babySelector);
            babySelector.id=`Row ${i} Column ${j}`;
            babySelector.className='tictactoeBox';
            babySelector.setAttribute('data-row',i);
            babySelector.setAttribute('data-column',j)
            if (!(event=='AI')){
                babySelector.addEventListener('click',addMove)
            }else{
                babySelector.addEventListener('click',addMoveAIvsHuman)
            }
        }
    }
}

function getBoxViaDataValues(x,y){
    let Boxes = document.querySelectorAll('.tictactoeBox');
    Boxes.forEach((button)=>{
        console.log('started')
        if (button.dataset.row == x && button.dataset.column == y){
            button.textContent='X';
            console.log("DOne")
        }
    })
}
function newGame(e){
    let PlayerX=document.getElementById('PlayerX').value;
    let PlayerO=document.getElementById('PlayerO').value;
    if (PlayerX==''&&PlayerO==''){
        alert('Enter Player Names');
        return null
    }else{
    gameMode=tictactoeGame(PlayerX,PlayerO);
    tictactoeGrid();
    }
}

function addMove(e){
    let row=Number(e.target.dataset.row);
    let column=Number(e.target.dataset.column);
    gameMode.playerMove(row,column);
    e.target.textContent=`${gameMode.returnMove()}`
    let status= document.getElementById('Status');
    status.textContent=`${gameMode.checkGrid()}`;
}

function addMoveAIvsHuman(e){
    let row=Number(e.target.dataset.row);
    let column=Number(e.target.dataset.column);
    gameMode.playerMove(row,column);
    gameMode.playerMove(row,column);
    e.target.textContent=`${gameMode.returnMove()}`
    let status= document.getElementById('Status');
    status.textContent=`${gameMode.checkGrid()}`;
}

const tictactoeGame =(playerX,playerO)=>{
    const theGrid = [['-','-','-'],['-','-','-'],['-','-','-']];
    const playerXGrid =[['-','-','-'],['-','-','-'],['-','-','-']];
    const playerOGrid =[['-','-','-'],['-','-','-'],['-','-','-']];
    let Oturn=false;
    let legalMove;
    let moveNo=0;
    let winner;
    const NullGrid =()=>{
        buttons= document.querySelectorAll('.tictactoeBox');
        buttons.forEach((button)=>{
            button.removeEventListener('click',addMove);
        });
    }
    const checkGrid=()=>{
        if (Oturn!=true){
            if ((playerOGrid[0][0]=='O'&&playerOGrid[0][1]=='O'&&playerOGrid[0][2]=='O')||(playerOGrid[1][0]=='O'&&playerOGrid[1][1]=='O'&&playerOGrid[1][2]=='O')||(playerOGrid[2][0]=='O'&&playerOGrid[2][1]=='O'&&playerOGrid[2][2]=='O')||
            (playerOGrid[0][0]=='O'&&playerOGrid[1][0]=='O'&&playerOGrid[2][0]=='O')||(playerOGrid[0][1]=='O'&&playerOGrid[1][1]=='O'&&playerOGrid[2][1]=='O')||(playerOGrid[0][2]=='O'&&playerOGrid[1][2]=='O'&&playerOGrid[2][2]=='O')||
            (playerOGrid[0][0]=='O'&&playerOGrid[1][1]=='O'&&playerOGrid[2][2]=='O')||(playerOGrid[0][2]=='O'&&playerOGrid[1][1]=='O'&&playerOGrid[2][0]=='O')){
                document.getElementById.removeEventListener
                winner=true;
                NullGrid()
                return (`${playerO} wins`);
            }
        }else{
            if ((playerXGrid[0][0]=='X'[0]&&playerXGrid[0][1]=='X'&&playerXGrid[0][2]=='X')||(playerXGrid[1][0]=='X'&&playerXGrid[1][1]=='X'&&playerXGrid[1][2]=='X')||(playerXGrid[2][0]=='X'&&playerXGrid[2][1]=='X'&&playerXGrid[2][2]=='X')||
            (playerXGrid[0][0]=='X'&&playerXGrid[1][0]=='X'&&playerXGrid[2][0]=='X')||(playerXGrid[0][1]=='X'&&playerXGrid[1][1]=='X'&&playerXGrid[2][1]=='X')||(playerXGrid[0][2]=='X'&&playerXGrid[1][2]=='X'&&playerXGrid[2][2]=='X')||
            (playerXGrid[0][0]=='X'&&playerXGrid[1][1]=='X'&&playerXGrid[2][2]=='X')||(playerXGrid[0][2]=='X'&&playerXGrid[1][1]=='X'&&playerXGrid[2][0]=='X')){
                winner=true;
                NullGrid()
                return (`${playerX} wins`);
            }
        }
        if (moveNo == 9){
            return('Its a draw')
        }
        return "Game is still going on"
    }
    const switchTurn = ()=>{ 
        if(!Oturn){
            Oturn=true
        }else{
            Oturn=false
        }
    }
    const returnMove =() =>{
        console.log(legalMove)
        if(Oturn){
            if(legalMove==true){
                console.log(1)
                switchTurn()
                return 'O'
            }else{
                console.log(2)
                return 'X'
            }
        }else{
            if(legalMove==true){
                console.log(3)
                switchTurn()
                    return 'X'
                }else{
                    console.log(4)
                    return 'O'
                }
        }
    }
    const playerMove = (x,y) => {
        console.log(theGrid);
        console.log(playerOGrid);
        console.log(playerXGrid);
        if (Oturn==true){
            if (playerO=='AI'){
                let valid=false;
                while (!valid){
                    x= getRandomInt(0,2);
                    y= getRandomInt(0,2);
                    if ((theGrid[x][y]=='-')){
                        valid=true;
                    }
                }
                console.log('AI DONE THINGING')
                 
            }else{
                console.log(theGrid[x][y])
            }
            console.log('O is not executed')
            
            if (theGrid[x][y]=='-'){
                console.log('O is executed')
                theGrid[x][y]='O';
                playerOGrid[x][y]='O';
                legalMove=true;
                moveNo++
                return ([x,y])
            }else{
                console.log('Enter a legal Move')
                legalMove=false;
            }

        }else{
            if (playerX=='AI'){
                let valid=false;
                while (!valid){
                    x= getRandomInt(0,2);
                    y= getRandomInt(0,2);
                    if ((theGrid[x][y]=='-')){
                        valid=true;
                    }
                }
                console.log('AI DONE THINGING')
            }else{
                console.log(theGrid[x][y])
            }
            console.log('X is not executed')
            if (theGrid[x][y]=='-'){
                console.log('X is executed')
                theGrid[x][y]='X';
                playerXGrid[x][y]='X'
                legalMove=true;
                moveNo++;
                return ([x,y])
            }else{
                console.log('Enter a legal Move')
                legalMove=false;
            }
            console.log('hellOWord')
        }
    }
    return{playerX,playerO,playerMove,returnMove,checkGrid}
}
gameStart();
//let button = document.getElementById('newGame');
//console.log(button)
//button.addEventListener('click',newGame)