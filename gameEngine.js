console.log("I ran")

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
    let colRand = Math.round(Math.random(3)) 
    console.log(colRand)
    if(colRand<1){
        let combCol = "R"
    }if (colRand === 1) {
        let combCol = "B"
    } else {
        let combCol = "Y"
    }


    // Random spot chosen

    let rowCount = grid.length
    let colCount = grid[0].length
    let combCount = 0
    while(combCount < inComb){



        let randRow = Math.round(Math.random(rowCount))
        let randCol = Math.round(Math.random(colCount))

        if(grid[randRow][randCol] != ""){
           grid[randRow][randCol] = combCol 
           combCount++
        }
        

        
    }

    
    
    
    
    
    



}
console.log(1<2)
genGrid(stockInRow,stockInCol)

console.log(grid[0].length)