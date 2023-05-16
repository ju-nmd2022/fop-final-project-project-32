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
    row = inGrid.length
    col = inGrid[0].length
    i = 0
    while(i < row){
        j = 0
        var sec = document.createElement("section")
        sec.classList.add(`sec${i}`)
        gameArea = document.querySelector(".gameWrap main article")
        gameArea.appendChild(sec)
        // here it should put the sec into the html
        while(j < col){
            var par = document.createElement("p")
            
            par.classList.add(`par${j}`)
            
            let gameArea = document.querySelector(`.sec${i}`)
            console.log(gameArea)
            gameArea.appendChild(par)
            j++
        }
        i++

    }


}


genGrid(stockInRow,stockInCol)
addComb(stockInCombs)
console.log(grid)

