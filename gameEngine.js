const stockInRow = 6
const stockInCol = 8
const stockInCombs = 5
let grid = [];
// stockInRow*stockinCol - stockInCombs will tell us when all non leathel squares are reveled
let revealedNum = 0

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
   let allCell = document.querySelectorAll('p')
    
}
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
        let gameArea = document.querySelector(".gameWrap main article")
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
      let gameArea = document.querySelector(".gameWrap main article");
      gameArea.appendChild(sec);
  
      while (j < col) {
        let par = document.createElement("p");
        let parClass = `par${j}`; 
        par.classList.add(parClass);
            
        par.addEventListener("click", function() {
          let parNum = par.className;
          clickSquare(parNum, secNum)
        });

        par.addEventListener("keydown", function(event) {
            if (event.keyCode === 32 || event.key === " ") {
              let parNum = par.className;
              flag(parNum, secNum);
            }
          });
        // par.addEventListener("space", function() {
        //     let parNum = par.className;
        //     flag(parNum, secNum)
        // });
        
        let gameAreaSec = document.querySelector(`.sec${i}`);
        gameAreaSec.appendChild(par);
        j++;
      }
      
      i++;
    }
  }


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
    // alert("lost")
}
function checkSquaresAround(inX,inY){
    let combCountR = 0
    let combCountY = 0
    let combCountB = 0
    // selCell stands for selected cell
    let selCell = document.querySelector(`.sec${inY} .par${inX}`)

    if(selCell.id !== "revealed"){
        revealedNum++
        console.log(revealedNum)
        
    }else{
        console.log('I ran else')
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
                
                
                // if(inX+1<grid[1].length && inY<grid.length){
                //     console.log(inX)
                //   checkSquaresAround(inX,inY-1)  
                // }
                
                
                

            }else{
                selCell.innerHTML = `R${combCountR} B${combCountB} Y${combCountY}`
                selCell.id = "revealed" 
                
            }
            
            
        }
        
    }
    
   
    
}
function flag(inX,inY){
let flagColorMode = 0;

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32 || event.key === " ") {
    if (flagColorMode === 0) {
        flag.id = "flagWhite"
    } else if (flagColorMode === 1) {
        flag.id = "flagRed"
    } else if (flagColorMode === 2) {
        flag.id = "flagYellow"
    } else {
        flag.id = "flagBlue"
    }

    flagColorMode = (flagColorMode + 1) % 4;
  }
});
}
// function flag(inX,inY){
//     let flag = document.querySelector(`.${inS} .${inP}`)
//     let numP = parseInt(inP.slice(3,4))
//     let numS = parseInt(inS.slice(3,4))



// }


   
function won(){
    alert("You won, jippy")
}
function resetCanvas(){
    document.querySelectorAll("p")
}


genGrid(stockInRow,stockInCol)
addComb(stockInCombs)

