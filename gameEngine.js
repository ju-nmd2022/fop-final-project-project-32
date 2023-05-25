const stockInRow = 6
const stockInCol = 8
const stockInCombs = 5
let grid = [];
// stockInRow*stockinCol - stockInCombs will tell us when all non leathel squares are reveled
let revealedNum = 0
let firstClick = false

let gameArea = document.querySelector(".gameWrap main article");

function genGrid(inRow,inCol){
    
    let bombCount = 0
    let i = 0
    while(i < inRow){
        let z = 0
        grid[i] = []
        while(z < inCol){
            grid[i][z] = ""
            z++
        }

        i++
    }
    console.log(grid)
    return grid
    
}

function resetCanvas(){

    let allCell = document.querySelectorAll(".gameWrap main article p")
    allCell.forEach(function(cell) {
        cell.id = ""
        cell.innerHTML = ""
    })
    gameArea.innerHTML = ""
    genGrid(stockInRow,stockInCol)
    addComb(stockInCombs)
    firstClick = false

}
let brushButton = document.querySelector("#brush")
brushButton.addEventListener("click",()=>{
    resetCanvas()
})
// Color bomb put togheter is Comb.
function addComb(inComb){
    

    // Random color for the Comb
    function colRand(){
        let colRand = Math.floor(Math.random()*3) 
        let combCol;
        if(colRand<1){
            combCol = "R"
        }else if (colRand === 1) {
            combCol = "B"
        } else {
            combCol = "Y"
        }
        return combCol
    }
    


    // Random spot chosen

    let rowCount = grid.length
    let colCount = grid[0].length
    let combCount = 0

    // for loop here
    while(combCount < inComb){
        let randRow = Math.floor(Math.random()*rowCount)
        let randCol = Math.floor(Math.random()*colCount)

        if(grid[randRow][randCol] === ""){
           grid[randRow][randCol] = colRand() 
           combCount++
        }    
        
    }

    genHtml(grid);

}


function genHtml(inGrid){ 
    let row = inGrid.length
    let col = inGrid[0].length
    let i = 0
    while(i < row){
        let j = 0
        let sec = document.createElement("section")
        sec.classList.add(`${i}sec`)
        gameArea.appendChild(sec)
        // here it should put the sec into the html
        while(j < col){
            var par = document.createElement("p")
            par.classList.add(`${j}par`)
            let gameAreaSec = document.querySelector(`.sec${i}`)
            gameAreaSec.appendChild(par)
            j++
        }
        i++

    }


}


function genHtml(inGrid) {
    let row = inGrid.length;
    let col = inGrid[0].length;
    let i = 0;
  
    while (i < row) {
      let j = 0;
      let sec = document.createElement("section");
      let secNum = `sec${i}`;
      sec.classList.add(secNum);
      gameArea.appendChild(sec);
  
      while (j < col) {
        let par = document.createElement("p");
        let parClass = `par${j}`; 
        par.classList.add(parClass);
            
        par.addEventListener("click", function() {
          let parNum = par.className;
          clickSquare(parNum, secNum)
        });
        
        par.addEventListener("contextmenu", function() {
            let parNum = par.className;
            flag(secNum,parNum)
            
        });
       
        
        let gameAreaSec = document.querySelector(`.sec${i}`);
        gameAreaSec.appendChild(par);
        j++;
      }
      
      i++;
    }





    
  }

  let stopWatchId; 
  let seconds = 0; 
  
  function startGame() {
    stopWatchId = setTimeout(updateTime, 1000);
  }
  
  function updateTime() {
    seconds++;
  
    
    document.querySelector(".gameWrap main header aisde").innerHTML = seconds;
  
    
    timerId = setTimeout(updateTime, 1000);
  }
  
  function gameWon() {
    clearTimeout(timerId);
    stId = null;
  }
//   let stopWatchId = 0;
//   let seconds = 0;
// function startGame() {
//  stopWatchId = setTimeout(updateTime, 1000);
// //   let startTime = Date.now();

 
// //   stopWatchId = setInterval(function() {
// //     let currentTime = Date.now();
// //     let elapsedTime = currentTime - startTime;
// //     let seconds = Math.floor(elapsedTime / 1000);

    
//     document.querySelector(".gameWrap main header aisde").innerHTML = seconds;
// //   });
// }

// function gameWon() {
//   clearInterval(stopWatchId);
//   stopWatchId = null;
// }
// function updateTime() {
//     seconds++;}

  function clickSquare(inP, inS){

    let clickedSquare = document.querySelector(`.${inS} .${inP}`)

    // Needs to be remade, works only up to 9
    let numP = parseInt(inP.slice(3,4))
    let numS = parseInt(inS.slice(3,4))

    if(grid[numS][numP] != ""){
        if(grid[numS][numP] === "R"){
            clickedSquare.id = "combRed"   
        }else if (grid[numS][numP] === "Y") {
            clickedSquare.id = "combYellow"
        } else {
            clickedSquare.id = "combBlue"
        }
        combClick()
    }else{
        checkSquaresAround(numP,numS);
    //    clickedSquare.id = "revealed" 

    }

  }

function combClick(){
    let i = 0
    function pause(){
        if(i>0){
            resetCanvas() 
            gameArea.removeEventListener("click",pause)
            brushImg.src = "img/brushPiet.svg"
        }
        i++
    }
    gameArea.addEventListener("click",pause)
    let brushImg = document.querySelector("#brush img")
    brushImg.src = "img/brushPietBroken.svg"

}
function checkSquaresAround(inX,inY){
    let combCountR = 0
    let combCountY = 0
    let combCountB = 0
    // selCell stands for selected cell
    let selCell = document.querySelector(`.sec${inY} .par${inX}`)

    if(selCell.id !== "revealed"){
        revealedNum++
        
    }else{
        // console.log('I ran else')
    }
    
    if(revealedNum + 1>stockInCol*stockInRow-stockInCombs){
        won()
    }
    
    for(let i= -1; i<2; i++){

        let tempY = i

        for(let z= -1; z<2; z++){
            let tempX = z
            if(inY+tempY> -1 && inY+tempY<grid.length){
                
                let lookCell = grid[inY+tempY][inX+tempX]
                if(lookCell !== ""){
                    if(lookCell !== undefined){
                        if(lookCell === "Y"){
                            combCountY++
                        }else if (lookCell === "R") {
                            combCountR++
                        }else if(lookCell === "B"){
                            combCountB++
                        }
                    }    
                }
                    
                
                
            }

            if(combCountB === 0 && combCountR === 0 && combCountY === 0){
                if(selCell.id !== "revealed"){
                    selCell.id = "revealed"
                }
                
                
                // Here I want it to rerun the code 
                // Crashes and overwrites code if I have 
                // checkSquaresAround(inX-1,inY)
                // any inX and inY works weridly
                // The idea would some sytem that puts in all the squares around
                // checkSquaresAround(inX-1,inY)
                // Testing with chat gpt it talked about remake the data handling. 
                // Unsure how it wanted it format as it just tried to queryselect a new type of data. 

                // Prb need to see the eventlistner feeds in data.
            
                

            }else{
                selCell.innerHTML = `R${combCountR} B${combCountB} Y${combCountY}`
                selCell.id = "revealed" 
                
            }
            
            
        }
        
    }
    
   
    
}


let flagColorMode = 0
function flag(inS, inP) {
    let cell = document.querySelector(`.${inS} .${inP}`);
    let combMark = document.createElement("div")
    if(flag.id !== "revealed"){
        flagColorMode++
        
        if (flagColorMode === 1) {
            

            combMark.id = "flagRed";
        } else if (flagColorMode === 2) {
          combMark.id = "flagYellow";
        } else if(flagColorMode === 3){
          combMark.id = "flagBlue";
        }else{
            flagColorMode = 0;
            combMark.id = ""
        }
        if(cell.innerHTML){
            cell.innerHTML = ""
        }
        cell.append(combMark)

        console.log(flagColorMode)
    }
        
        
        
      
    
}

// With time contrastrians we could do on won state that the other are just reaveld as the flag color
function revealAllCombs(){

}

   
function won(){
    let allCell = document.querySelectorAll(".gameWrap main article p")
    allCell.forEach(function(cell) {
        cell.innerHTML = ""
    })
    let i = 0
    function pause(){
        if(i>0){
            resetCanvas() 
            gameArea.removeEventListener("click",pause)
        }
        i++
    }
    gameArea.addEventListener("click",pause)
    
}

genGrid(stockInRow,stockInCol)
addComb(stockInCombs)




