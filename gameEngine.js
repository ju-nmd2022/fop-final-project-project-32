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
    let colRand = Math.floor(Math.random()*3) 
    console.log(colRand)
    let combCol;
    if(colRand<1){
        combCol = "R"
        console.log("Red is made")
    }else if (colRand === 1) {
        combCol = "B"
    } else {
         combCol = "Y"
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
           grid[randRow][randCol] = combCol 
           combCount++
        }
        
        
    }
    


}
console.log(grid)

genGrid(stockInRow,stockInCol)
addComb(stockInCombs)
console.log(grid)

console.log(grid[0].length)