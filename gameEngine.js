
let setupObj ={
    row: 20,
    col:10,
    combs: 20
}
let grid = [];
let savedGameData = {
    gameArea: false
}

if(document.querySelector('title').innerHTML === "settings"){

    function applySettings() {
        const rowInput = document.querySelector('#rows');
        const colInput = document.querySelector('#columns');
        const combsInput = document.querySelector('#combs');

        let customSetupObj ={}

        let inRow = rowInput.value
        let inCol = colInput.value
        let inComb = combsInput.value
        
        if(inComb !== ""){
            customSetupObj.combs = parseInt(inComb)
        }else{
            customSetupObj.combs = 5
        }
        if(inRow !== ""){
            customSetupObj.row = parseInt(inRow)
        }else{
            customSetupObj.row = 6
        }
        if(inCol !== ""){
            customSetupObj.col = parseInt(inCol)
        }else{
            customSetupObj.col = 8
        }

        localStorage.setItem("customSetup", JSON.stringify(customSetupObj))
        
        
    }

}


let revealedNum = 0
// let firstClick = true

if(document.querySelector('title').innerHTML === "Piet miner"){
    
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
        if(customSetupObj === null){
            genGrid(setupObj.row,setupObj.col)
            addComb(setupObj.combs) 
        }else{
            genGrid(customSetupObj.row,customSetupObj.col)
            addComb(customSetupObj.combs) 

        }
        // firstClick = true

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
        // if(firstClick === true){
            genHtml(grid);    
        // }
       

    }


    function genHtml(inGrid){
        // if(localStorage.getItem("gameArea") !== null){
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
        // }else{
            // let storedAreaJson = localStorage.getItem("gameAreaStorage")
            // let storedArea = JSON.parse(storedAreaJson)
            // htmlStored = storedArea.gameArea
            // gameArea.innerHTML = htmlStored
        // }
        


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
            // if(firstClick ===false){
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
            // }else{
            //     let tempCol = grid[numS][numP]
            //     grid[numS][numP] = ""
            //     let randRow = Math.floor(Math.random()*grid.length)
            //     let randCol = Math.floor(Math.random()*grid[0].length)

            //     if(grid[randRow][randCol] === ""){
            //         grid[randRow][randCol] = tempCol
                    
            //     } 
            //     clickSquare(inP, inS, true)
            //     firstClick = false
            // }
            
            
            
        }else{
            checkSquaresAround(numP,numS);
        //    clickedSquare.id = "revealed" 

        }
        
        
    }

    function combClick(){
        let pauseState = true
        function pause(){
            clearInterval(timerVariable)
            if(pauseState === false){
                resetCanvas() 
                gameArea.removeEventListener("click",pause)
                brushImg.src = "img/brushPiet.svg"
                // firstClick = true
            }else{
               pauseState = false
            }
            
        }
        gameArea.addEventListener("click",pause)
        let brushImg = document.querySelector("#brush img")
        brushImg.src = "img/brushPietBroken.svg"
        revealAllCombs()
        
    }



    function checkSquaresAround(inX,inY){
        let combCountR = 0
        let combCountY = 0
        let combCountB = 0

        // Use this to understand what happens
        // The loop goes way to many times
        // aswell on numbers which it shouldn't
        let howManyrun = 0


        // selCell stands for selected cell
        let selCell = document.querySelector(`.sec${inY} .par${inX}`)

        if(selCell.id !== "revealed"){
            revealedNum++
            
        }else{
            // console.log('I ran else')
        }
        
        if(customSetupObj === null){
            if(revealedNum + 1>setupObj.col*setupObj.row-setupObj.combs){
            won()
            }
        }else{
            if(revealedNum + 1>customSetupObj.col*customSetupObj.row-customSetupObj.combs){
                won()
            }
            
        }
        
        
        for(let i= -1; i<2; i++){

            let tempY = i

            for(let z= -1; z<2; z++){
                let tempX = z
                if(inY+tempY> -1 && inY+tempY<grid.length-1){
                    
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
                    
                    
                    for(let q= -1; q<2; q++){
                        let tempY = q
                        for(let w= -1; w<2; w++){
                            let tempX = w
                            if(inY+tempY> -1 && inY+tempY<grid.length){
                            
                                if(inY+tempY>-1 && inY<grid.length-1){
                                if(inX+tempX>-1 && inX< grid[0].length-1){
                                    
                                    // console.log(howManyrun)
                                    howManyrun++
                                    // console.log(document.querySelector(`.sec${inY+tempY} .par${inX+tempX}`))
                                    
        
                                    }
                                    
                                }
                                    
                                
                                
                            }
                        }
                    }


                    
                
                    

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

    function revealAllCombs(){
        let row = grid.length
        let col = grid[0].length
        function htmlCell(secX,parX){
        return document.querySelector(`.sec${secX} .par${parX}`) 
        }
        
        for(k = 0;k<row;k++){
            
            for(t = 0;t<row+2;t++){
                // console.log(htmlCell(k,t))
            if(grid[k][t] === "R"){
                    htmlCell(k,t).id = "combRed"   
                }else if (grid[k][t] === "Y") {
                    htmlCell(k,t).id = "combYellow"
                }else if(grid[k][t] === "B") {
                    htmlCell(k,t).id = "combBlue"
                }
            }
        
        }
        

        
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
        revealAllCombs()
        // localStorage.setItem("gameArea",false)
        
    }
    let storedCustomSetup = localStorage.getItem("customSetup")
    customSetupObj = JSON.parse(storedCustomSetup)
    if(customSetupObj === null){
        genGrid(setupObj.row,setupObj.col)
        addComb(setupObj.combs) 
    }else{
        genGrid(customSetupObj.row,customSetupObj.col)
        addComb(customSetupObj.combs) 
    }
    

}
