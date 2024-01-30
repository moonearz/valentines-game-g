document.addEventListener('DOMContentLoaded', () => {
    //add divs to document
    var htmlElements = "";
    for (var i = 0; i < 441; i++) {
        htmlElements += '<div></div>';
    }
    for (var i = 0; i < 21; i++) {
        htmlElements += '<div class = "taken"></div>';
    }
    document.getElementById("grid").innerHTML = htmlElements;
    htmlElements = "";
    for (var i = 0; i < 16; i++) {
        htmlElements += '<div></div>';
    }
    document.getElementById("mini-grid").innerHTML = htmlElements;
    document.getElementById("padding1").innerHTML = htmlElements;
    document.getElementById("padding2").innerHTML = htmlElements;

    //grid sizing/button initialization
    const width = 21;
    let units = Array.from(document.querySelectorAll('.grid div'));
    const grid = document.querySelector('grid');
    const startButton = document.querySelector('#play-button');
    const howButton = document.querySelector('#how-to-play');
    const xButton = document.querySelector('x-button');

    //rng for orientations
    function getRandomInt() {
        return Math.floor(Math.random() * 4);
    }

    //basic-blocks, now rotation preserving!
    const lBlock = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]    
        ]

    const l2block = [
    [0, 1, width + 1, width * 2 + 1],
    [2, width + 2, width + 1, width],
    [width * 2 + 2, width * 2 + 1, width + 1, 1],
    [width * 2, width, width + 1, width + 2]
    ]

    const zBlock = [
    [0,width,width+1,width*2+1],
    [2, 1,width + 1,width],
    [width* 2 + 2,width + 2,width+1,1],
    [width*2, width*2 + 1,width + 1,width + 2]
    ]

    const z2Block = [
    [2,width +2,width+1,width*2+1],
    [width*2 + 2, width* 2 + 1,width + 1,width],
    [width * 2,width,width+1,1],
    [0, 1,width + 1,width + 2]
    ]

    const tBlock = [
    [1,width + 1,width * 2+1,width + 2],
    [width + 2,width + 1,width,width*2+ 1],
    [width * 2 + 1,width+1,1,width],
    [width,width + 1,width+2,1]
    ]

    const oBlock = [
    [0,1,width + 1,width],
    [1,width + 1, width,0],
    [width + 1, width,0, 1],
    [width, 0,1,width + 1]
    ]

    const iBlock = [
    [1,width+1,width*2+1,width*3+1],
    [width + 3,width+2,width+1,width],
    [width*3+1,width *2+1,width+1,1],
    [width,width+1,width+2,width+3]
    ]

    const ublock = [
        [0],
        [0],
        [0],
        [0],
    ]

    //oriented-blocks, now all 4x4!
    const oriented_blocks = [];
    oriented_blocks[0] = [0,0,0,0, 0,0,0,0, 1,1,1,0,0,1,0,0];
    oriented_blocks[1] = [0,0,0,0, 0, 0, 0 ,0, 1, 1, 1, 1, 0, 0, 0, 0];
    oriented_blocks[2] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0];
    oriented_blocks[3] = [0,0,0,0, 0, 0, 0, 0, 0, 0 , 1, 0, 1, 1, 1, 0];
    oriented_blocks[4] = [0,0,0,0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0];
    oriented_blocks[5] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[6] = [0,0,0,0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
    oriented_blocks[7] = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
    oriented_blocks[8] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[9] = [0,0,0,0,1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,0];
    oriented_blocks[10] = [0,0,0,0,0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0];
    oriented_blocks[11] = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
    oriented_blocks[12] = [0,0,0,0,0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
    oriented_blocks[13] = [0,0,0,0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0];
    oriented_blocks[14] = [0,0,0,0,0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0];
    oriented_blocks[15] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[16] = [0,0,0,0,0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0];
    oriented_blocks[17] = [0,0,0,0,0, 1, 0, 0, 0, 1, 0, 0,0, 1, 1, 0];
    oriented_blocks[18] = [0,0,0,0,0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0];
    oriented_blocks[19] = [0,0,0,0,0, 1, 0, 0,1, 1, 0, 0, 1, 0, 0, 0];
    oriented_blocks[20] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[21] = [0,0,0,0,0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0];
    oriented_blocks[22] = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,0,0,0];
    oriented_blocks[23] = [0,0,0,0,0,1, 0, 0, 0, 1, 1, 0, 0,1,0, 0];
    oriented_blocks[24] = [0,0,0,0,1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0];
    oriented_blocks[25] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[26] = [0, 0, 0, 0, 1,1,1,1, 0,0,0,0, 0,0,0,0];
    oriented_blocks[27] = [0,0,0,0, 0, 0, 0, 0, 1, 1, 0, 0,1,1,0,0];
    oriented_blocks[28] = [0, 0, 0, 0, 1,1,1,1, 0,0,0,0, 0,0,0,0];
    oriented_blocks[29] = [0,0,0,0, 0, 0, 0, 0, 0, 0, 0, 0,1,0,0,0];

    //constants, initializations
    const blocks = [lBlock, l2block, zBlock, z2Block, tBlock, oBlock, iBlock, ublock];
    const landing_sequence = [[[10, 20]],[[9, 18], [10,18], [11, 18], [12, 18]],[[8,18]],[[11, 17],[12,17], [13, 17]],[[6,17], [7,17]],[[9,16],[10,16]],[[14,17]],[[8,15]],[[5,16],[6,16]],[[15,16]],[[7,15]],[[12,16]],[[13,14]],[[11,16]],[[16,14]],[[16,12], [17,12]],[[9,14]],[[4,14],[5,14]],[[11,13]],[[3,12]],[[5,13], [6,13]],[[13,12]],[[13,10],[14,10],[15,10],[16,10]],[[7,12]],[[9,11],[10,11]],[[5,11],[6,11]],[[5,9],[6,9],[7,9],[8,9]],[[11,11],[12,11]],[[12,9],[13,9],[14,9],[15,9]], [[10,10]]]
    const big_block_sequence = [[4], [6], [1], [1], [2], [5], [1], [6], [5], [1], [4], [6], [3], [1], [2], [5], [4], [1], [4], [3], [5], [1], [6], [4], [3], [5], [6], [5], [6], [7]];
    const accepted_orientations = [[1],[1, 3],[3],[1],[1,3],[0,1,2,3],[0],[0, 2],[0,1,2,3],[0],[2],[0,2],[0,2],[0],[0,2],[0,1,2,3],[0],[2],[1],[0,2],[0,1,2,3],[3],[1,3],[0],[1, 3],[0,1,2,3],[1,3],[0,1,2,3],[1,3],[0,1,2,3]]
    var currentBlockIndex = 0;
    var currentOrientation = getRandomInt();
    let currentPosition = 2 + 2 * getRandomInt();
    let currentBigBlock = big_block_sequence[currentBlockIndex];
    let current = blocks[currentBigBlock[0]][currentOrientation];
    let currentBlock;
    let timerId;
    let newGame;
    //permit movement
    let noMoves = true;

    //correct orientation window
    const displayUnits = document.querySelectorAll('.mini-grid div');
    let displayIndex = 0;

    //drawing functions
    function draw() {
        current.forEach(index => {
            units[currentPosition + index].classList.add('pink-block');
        })
    }

    function undraw() {
        current.forEach(index => {
            units[currentPosition + index].classList.remove('pink-block');
        })
    }

    //key functions
    function control(e) {
        if(!noMoves) {
            if(e.keyCode === 37) {
                moveleft();
            }
            else if(e.keyCode === 38) {
                rotate();
            }
            else if(e.keyCode === 39) {
                moveRight();
            }
            else if(e.keyCode === 40) {
                moveDown();
            }
        }
    }
    document.addEventListener('keyup', control);    
    //action functions
    function checkLanding() {
        //check that the orientation of the block is correct
        let accepted = accepted_orientations[currentBlockIndex];
        if(!accepted.includes(currentOrientation)) {
            return false;
        }
        //checks that there are squares in the landing area
        let currentLanding = landing_sequence[currentBlockIndex];
        for(var i = 0; i < currentLanding.length; i++) {
            let ok = false;
            let need = currentLanding[i][1] * width + currentLanding[i][0];
            if(current.some(index => currentPosition + index === need)) {
                ok = true;
            }
            if(!ok) {
                return false;
            }
        }
        return true;
    }

    function freeze() {
        if(current.some(index => units[currentPosition + index + width].classList.contains('taken'))) {
            if(checkLanding()) {
                current.forEach(index => units[currentPosition + index].classList.add('taken'));
                undrawUnderline();
                if(currentBlockIndex < 29) {
                    currentBlockIndex++;
                    currentOrientation = getRandomInt();
                    currentBigBlock = big_block_sequence[currentBlockIndex];
                    current = blocks[currentBigBlock[0]][currentOrientation];
                    currentPosition = 2 + 5 * getRandomInt();
                    draw();
                    drawUnderline();
                    displayOrientedShape();
                }
                else {
                    gameOver();
                }
            }
            else {
                redo();
            }
        }
    }
    
    
    function redo() {
        undraw();
        currentPosition = 2 + 5 * getRandomInt();
        currentOrientation = getRandomInt();
        current = blocks[currentBigBlock[0]][currentOrientation];
        draw();       
    }
    //movement functions
    function moveDown() {
        undraw();
        currentPosition += width;
        if(current.some(index => units[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= width;
        }
        draw();
        freeze();
    } 

    function moveleft(){
        undraw();
        const atLeft = current.some(index => (currentPosition + index) % width === 0);
        if(!atLeft) {
            currentPosition -= 1;
        }

        while(current.some(index => units[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }

        draw();
    }
    function moveRight(){
        undraw();
        const atRight = current.some(index => (currentPosition + index) % width === width - 1);
        if(!atRight) {
            currentPosition += 1;
        }

        while(current.some(index => units[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }

        draw();
    }

    function rotate() {
        undraw();
        currentOrientation = currentOrientation + 1;
        if(currentOrientation === 4) {
            currentOrientation = 0;
        }
        currentBigBlock = big_block_sequence[currentBlockIndex];
        current = blocks[currentBigBlock[0]][currentOrientation];
        if(!validRotate()) {
            if(currentOrientation === 0) {
                currentOrientation = 3;
            }
            else {
                currentOrientation--;
            }
            current = blocks[currentBigBlock[0]][currentOrientation];
        }
        draw();
    }
    
    function validRotate() {
        return (!(onRight() && onLeft()) && !intersects());
    }
    function onLeft() {
        for(var i = 0; i < current.length; i++) {
            if((current[i] + currentPosition) % width === 0 || (current[i] + currentPosition) % width === 1) {
                return true;
            }
        }
        return false;
    }
    function onRight() {
        for(var i = 0; i < current.length; i++) {
            if((current[i] + currentPosition) % width === width - 1 || (current[i] + currentPosition) % width === width - 2) {
                return true;
            }
        }
        return false;
    }
    function intersects() {
        for(var i = 0; i < current.length; i++) {
            if(units[current[i] + currentPosition].classList.contains('taken') ) {
                return true;
            }
        }
        return false;
    }

    //display oriented shape in the window, converting from original file format
    function displayOrientedShape() {
        clearDisplay();
        currentBlock = oriented_blocks[currentBlockIndex];
        currentBlock.forEach(index => {
            if(index === 1) {
                displayUnits[displayIndex].classList.add('pink-block');
            }
            displayIndex++;
        })
        displayIndex = 0;
    }
    function clearDisplay() {
        displayUnits.forEach(unit => {
            unit.classList.remove('block');
            unit.classList.remove('pink-block');
        })
    }
    //correct landing underline
    function drawUnderline() {
        let currentLandingBlocks = landing_sequence[currentBlockIndex];
        for(var i = 0; i < currentLandingBlocks.length; i++) {
            let thisBlock = currentLandingBlocks[i];
            units[thisBlock[1] * width + thisBlock[0]].classList.add('base');
        }
    }

    function undrawUnderline() {
        let currentLandingBlocks = landing_sequence[currentBlockIndex];
        for(var i = 0; i < currentLandingBlocks.length; i++) {
            let thisBlock = currentLandingBlocks[i];
            units[thisBlock[1] * width + thisBlock[0]].classList.remove('base');
        }
    }

    //button functions
    startButton.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId);
            timerId = null;
            noMoves = true;
        }
        else {
            if(newGame){ 
                resetGame();
                newGame = false;
            }
            document.getElementById('play-button').innerHTML = "Pause/Unpause";
            noMoves = false;
            draw();
            timerId = setInterval(moveDown, 500);
            displayOrientedShape();
            drawUnderline();
        }
    })

    howButton.addEventListener('click', () => {
        document.getElementById("overlay").style.display = "block";
    })

    //game end protocol
    function gameOver() {
        undrawUnderline();
        clearInterval(timerId);
        timerId = null;
        clearDisplay();
        document.getElementById('play-button').innerHTML = "Play";
        noMoves = true;
        newGame = true;
    }
    function resetGame() {
        clearBoard();
        currentBlockIndex = 0;
        currentOrientation = getRandomInt();
        currentPosition = 2 + 2 * getRandomInt();
        currentBigBlock = big_block_sequence[currentBlockIndex];
        current = blocks[currentBigBlock[0]][currentOrientation];
        
    }
    function clearBoard() {
        for(var i = 0; i < 441; i++) {
            units[i].classList.remove('pink-block');
            units[i].classList.remove('taken');
        }
    }
})