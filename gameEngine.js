const stockInRow = 6
const stockInCol = 8
const stockInCombs = 3
let grid = [];

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
    return grid
    
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
            par.addEventListener("click",()=>{
                let cordNum = `${j} ${i}`
            })
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
        checkSquaresAround(numS,numP);
       clickedSquare.id = "revealed" 
        



    }

    


  }


  function combClick(){
    // alert("lost")
}
function checkSquaresAround(inX,inY){
    let combCountR = 0
    let combCountY = 0
    let combCountB = 0
    
    
    
    // Help from chatGPT to modifie the code so that undefined values would not be a problem. Multipe version had to be made as it didn't always work perfectly. (If want to oveer look Felix have them stored)
    if (
        
          (grid[inX-1] && grid[inX-1][inY+1] !== undefined && grid[inX-1][inY+1] !== "") ||
          (grid[inX][inY+1] !== undefined && grid[inX][inY+1] !== "") ||
          (grid[inX+1] && grid[inX+1][inY+1] !== undefined && grid[inX+1][inY+1] !== "") ||
          (grid[inX-1] && grid[inX-1][inY] !== undefined && grid[inX-1][inY] !== "") ||
          (grid[inX+1] && grid[inX+1][inY] !== undefined && grid[inX+1][inY] !== "") ||
          (grid[inX-1] && grid[inX-1][inY-1] !== undefined && grid[inX-1][inY-1] !== "") ||
          (grid[inX][inY-1] !== undefined && grid[inX][inY-1] !== "") ||
          (grid[inX+1] && grid[inX+1][inY-1] !== undefined && grid[inX+1][inY-1] !== "")

      ) {
        console.log("Combs around me");
      } else {
        console.log("No comb around me");
      }
// The if goes thorugh and check both if the coordinate is defined and if so if thier aren't nothing(as a bomb would have something inside). This means multipe things needs to be fulid.  











}




genGrid(stockInRow,stockInCol)
addComb(stockInCombs)
console.log(grid)

console.log(grid[-1] === undefined)