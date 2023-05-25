
let stockInRow = 5;
let stockInCol = 5;
let stockInCombs = 1;
let grid = [];

function applySettings() {
  const rowsInput = document.querySelector('#rows');
  const columnsInput = document.querySelector('#columns');
  const combsInput = document.querySelector('#combs');

  const rows = parseInt(rowsInput.value);
  const columns = parseInt(columnsInput.value);
  const combs = parseInt(combsInput.value);
  
  stockInRow = rows;
  stockInCol = columns;
  stockInCombs = combs;
}

// let stockInRow = 5
// let stockInCol = 5
// let stockInCombs = 1
// let grid = [];
// function applySettings() {
//     const rowsInput = document.getElementById('rows');
//     const columnsInput = document.getElementById('columns');
//     const combsInput = document.getElementById('combs');
  
//     const rows = parseInt(rowsInput.value);
//     const columns = parseInt(columnsInput.value);
//     const combs = parseInt(combsInput.value);
//     stockInRow = rows;
//     stockInCol = columns;
//     stockInCombs = combs;
//   }
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
resettTimer()
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
          clickSquare(parNum, secNum,false)
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
  
  let  timerVariable = setInterval(countUpTimer, 1000);
  let totalSeconds = 0
  
  function resettTimer(){
    totalSeconds = 0;
  } 

  function startTimer(){
  timerVariable = setInterval(countUpTimer, 1000);
  }

  function stopTimer(){
    clearInterval(timerVariable)
  }

  function countUpTimer() {
    ++totalSeconds;
    let minute = Math.floor(totalSeconds / 60);
   let seconds = totalSeconds - (minute * 60);
   let timer = document.querySelector(".gameWrap main header aside h2")
   timer.innerHTML = minute + ":" + seconds

  }


  function clickSquare(inP, inS, autoClick){
    let clickedSquare = document.querySelector(`.${inS} .${inP}`)

    // Needs to be remade, works only up to 9
    let numP = parseInt(inP.substring(3))
    let numS = parseInt(inS.substring(3))

    if(grid[numS][numP] != ""){
        if(autoClick === false){
            if(grid[numS][numP] === "R"){
                clickedSquare.id = "combRed"   
            }else if (grid[numS][numP] === "Y") {
                clickedSquare.id = "combYellow"
            } else {
                clickedSquare.id = "combBlue"
        }
            combClick()
        }
        
        
    }else{
        checkSquaresAround(numP,numS);
    //    clickedSquare.id = "revealed" 

    }

  }

function combClick(){
    let i = 0
    function pause(){
        clearInterval(timerVariable)
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
let checkedCellsArr = []
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
                
                

                // The problem now is that is jumping back and forther between value. 
                // I could made an new array with checked cord and if checked don't run clicksquare. I could do filter or find in array. 

                for(let i= -1; i<2; i++){

                    let tempY = i
            
                    for(let z= -1; z<2; z++){
                        let tempX = z
                        if(inY+tempY> -1 && inY+tempY<grid.length){
                            
                            if(inY+tempY>0 && inY<grid.length-1){
                            if(inX+tempX>0 && inX< grid[0].length-1){
                                
                                    if(false === false){
                                        clickSquare(`par${inY+tempY}` ,`sec${inX+tempX}`,true)
    
                                    }  
                                }
                                
                            }
                                
                            
                            
                        }
                    }
                }


                
                

                // Prb need to see the eventlistner feeds in data.
            
                

            }else{
                selCell.innerHTML = `R${combCountR} B${combCountB} Y${combCountY}`
                selCell.id = "revealed" 
                
            }
            
            
        }
        
    }
    
   
    
}



function flag(inS, inP) {
    
    let cell = document.querySelector(`.${inS} .${inP}`);
    let combMark = document.createElement("div")
    let flagColorMode = 0
    console.log(cell)
    if(cell.innerHTML !== ""){
        let typeComb = cell.querySelector("div")
        console.log(typeComb)
        if(typeComb !== null){
           if(typeComb.id === "flagRed"){
                flagColorMode = 0
            }else if(typeComb.id === "flagYellow"){
                flagColorMode = 1
            }
            if(typeComb.id === "flagBlue"){
                flagColorMode = 2
            }
            flagColorMode++
        }
        
        
        
    }
    
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
        if(flagColorMode === 0){
            cell.innerHTML = ""
        }else{
          cell.append(combMark)  
        }
        
    }
        
        
        
      
    
}

// With time contrastrians we could do on won state that the other are just reaveld as the flag color
function revealAllCombs(){

}

   
function won(){
    clearInterval(timerVariable)
    let allCell = document.querySelectorAll(".gameWrap main article p")
    allCell.forEach(function(cell) {
        cell.innerHTML = ""
    })
    // I think this runs 2 many times
    let i = 0
    function pause(){
        if(i>0){
            resetCanvas() 
            gameArea.removeEventListener("click",pause)
        }else(
          i++  
        )
        
    }
    gameArea.addEventListener("click",pause)
    
    
}

genGrid(stockInRow,stockInCol)
addComb(stockInCombs)


