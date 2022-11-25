const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
    [0,1,2], [3,4,5] , [6,7,8] , [0,3,6], [1,4,7], [2,5,8], [0,4,8] , [2,4,6]
]
const restartButton = document.getElementById("restartButton")
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
winningMessageTextElement = document.querySelector("[data-winning-message-text]")
let circleTurn
startGame()

restartButton.addEventListener("click",startGame)

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click",handleClick,{once : true }) // here we add a eventlistener on click which will only activate once if it s clicked, and will take the function name of handleClick
    })
    setBoardHoberClass()
    winningMessageElement.classList.remove("show")
}
function handleClick(e){ // if we click we will place the mark on the specific e (cell)
    const cell = e.target
    const currentClass = circleTurn ?  CIRCLE_CLASS : X_CLASS;
 
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } 
    else if(isDraw())
    {
   endGame(true)     
    }
    else{
        swapTurns()
        setBoardHoberClass()
    }
   
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText="Draw!"
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}
// the function that determines the draw
function isDraw() {
return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
})
}
  
// the function that places the piece
function placeMark(cell,currentClass) {
cell.classList.add(currentClass)
}
// function that swaps turns
function swapTurns(){
      circleTurn =!circleTurn 
}

function checkWin(cell){
      cell === CIRCLE_CLASS ? console.log("x") : console.log("o")
   
    };
// setting the show on hover
    function setBoardHoberClass() {
        board.classList.remove(X_CLASS)  // we first remove every class from the board
        board.classList.remove(CIRCLE_CLASS)
        if (circleTurn){ // afterwards we add the class to show on hover and on click to place the mark
            board.classList.add(CIRCLE_CLASS) 
        }
        else{
            board.classList.add(X_CLASS)
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination =>{
            return combination.every(index => {
             return cellElements[index].classList.contains(currentClass)   
            })
        })
    }

