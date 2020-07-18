let constBoard = new Array(9);
let playBoard = new Array(9);

let shortDelay = 17;
let delay = 77;
let longDelay = 200;


// a valid sudoku board for normal rules
let r1 = "586374912";
let r2 = "137952864";
let r3 = "249816573";
let r4 = "872543196";
let r5 = "693781245";
let r6 = "415629738";
let r7 = "954237681";
let r8 = "721468359";
let r9 = "368195427";

// set the rows of the board in an array for easier access
let rows = [r1, r2, r3, r4, r5, r6, r7, r8, r9]

// 2D array to keep track of what color to turn the board after the program runs
let colorBoard = [
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1]
]

// set all the values of the const board
function initializeConstBoard ()
{
    for(let i = 0; i < 9; i++)
    {
        constBoard[i] = new Array(9);
        playBoard[i] = new Array(9);

        
        for(let k = 0; k < 9; k++)
        {
            constBoard[i][k] = parseInt(rows[i][k]);
        }

        console.log(constBoard[i]);
        
    }

    console.log("initialized board");
}

// main function to run sudoku checks
async function validSudoku()
{
    if(document.getElementById("rows").checked == true)
    {
        await validRows();
    }
    if(document.getElementById("columns").checked == true)
    {
        await validCols();
    }
    if(document.getElementById("boxes").checked == true)
    {
        await validBoxes();
    }
    if(document.getElementById("knightsMove").checked == true)
    {
        await validKnightsMove();
    }
    if(document.getElementById("kingsMove").checked == true)
    {
        await validKingsMove();
    }
    if(document.getElementById("cross").checked == true)
    {
        await validCross();
    }



    updateColorBoard();
    
}

// checks all the rows to see if they are valid
async function validRows()
{
    
    let valid = true;

    for(let i = 0; i < 9; i++)
    {
        let rowHashSet = new Set();

        for(let k = 0; k < 9; k++)
        {
            let square = document.getElementById((9 * i + k + 1).toString());
            square.style.backgroundColor = "#ffff00";
            if(constBoard[i][k] >= 1 && constBoard[i][k] <= 9)
            {
                rowHashSet.add(constBoard[i][k]);
            }
            await sleep(delay);
            
        }

        if(rowHashSet.size != 9)
        {
            valid = false;
            colorRow(i, "red");
            updateColorBoardRow(i, 0);
        }
        else
        {
            colorRow(i, "green");
        }

        await sleep(longDelay);
        colorRow(i, "#aaaaaa");
    }

    return valid;
}

// checks all the cols to see if they are valid
async function validCols()
{
    let valid = true;
    for(let i = 0; i < 9; i++)
    {

        let colHashSet = new Set();
        for(let k = 0; k < 9; k++)
        {
            let square = document.getElementById((9 * k + i + 1));
            square.style.backgroundColor = "#ffff00";
            if(constBoard[k][i] >= 1 && constBoard[k][i] <= 9)
            {
                colHashSet.add(constBoard[k][i]);
            }
            await sleep (delay);
        }

        if(colHashSet.size != 9)
        {
            console.log("not a valid sudoku");
            valid = false;
            colorCol(i, "red");
            updateColorBoardCol(i, 0);
        }
        else
        {
            colorCol(i, "green");
        }

        await sleep (longDelay);

        colorCol(i, "#aaaaaa");

        
    }

    return valid;
}

// checks the 3x3 boxes to see if they are valid
async function validBoxes()
{
    let valid = true;
    for(let i = 0; i < 9; i += 3)
    {
        for(let k = 0; k < 9; k += 3)
        {
            valid = valid && checkBox(i, k);
        }
    }

    return valid;
}

// checks a specific 3x3 box to see if it is valid
async function checkBox(row, col)
{
    let valid = true;
    let boxHashSet = new Set();

    for(let i = row; i < row + 3; i++)
    {
        for(let k = col; k < col + 3; k++)
        {
            let square = document.getElementById((9 * i + k + 1).toString());
            square.style.backgroundColor = "#ffff00";
            await sleep(delay);
            if(constBoard[i][k] >= 1 && constBoard[i][k] <= 9)
            {
                boxHashSet.add(constBoard[i][k]);
            }
        }
    }

    if(boxHashSet.size != 9)
    {
        valid = false;
        colorBox(row, col, "red");
        updateColorBoardBox(row, col, 0);
    }
    else
    {
        colorBox(row, col, "green");
    }

    await sleep(longDelay);
    colorBox(row, col, "#aaaaaa");

    return valid;
}

// checking a specific cell against another cell to see if they clash
// used for kings move and knights move
async function checkValidNumber(num, row, col)
{
    if(row < 0 || row > 8 || col < 0 || col > 8)
    {
        return true;
    }

    let valid = num != constBoard[row][col];
    let square = document.getElementById((9 * row + col + 1));
    if(valid)
    {
        square.style.backgroundColor = "green";
    }
    else
    {
        square.style.backgroundColor = "red";
        updateColorBoardCell(row, col, 0);
    }

    await sleep(delay);

    square.style.backgroundColor = "#aaaaaa";

    return valid;

}

// checks knights move constraint
async function validKnightsMove()
{
    let result = true;

    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            let square = document.getElementById((9 * i + k + 1));
            square.style.backgroundColor = "#ffff00";
            

            result = result &&  checkValidNumber(constBoard[i][k], i - 2, k - 1);
            result = result &&  checkValidNumber(constBoard[i][k], i - 2, k + 1);
            result = result &&  checkValidNumber(constBoard[i][k], i + 2, k - 1);
            result = result &&  checkValidNumber(constBoard[i][k], i + 2, k + 1);

            result = result &&  checkValidNumber(constBoard[i][k], i - 1, k - 2);
            result = result &&  checkValidNumber(constBoard[i][k], i - 1, k + 2);
            result = result &&  checkValidNumber(constBoard[i][k], i + 1, k - 2);
            result = result &&  checkValidNumber(constBoard[i][k], i + 1, k + 2);

            await sleep(delay);

            square.style.backgroundColor = "#aaaaaa";

            

            if(!result)
            {
                console.log("knights move failed at cell: " + i + " " + k);
            }
        }
    }

    return result;

}

// checks kings move contraint
async function validKingsMove()
{
    let result = true;

    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            let square = document.getElementById((9 * i + k + 1).toString());
            square.style.backgroundColor = "#ffff00";

            result = result && checkValidNumber(constBoard[i][k], i - 1, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i - 1, k);
            result = result && checkValidNumber(constBoard[i][k], i - 1, k + 1);

            result = result && checkValidNumber(constBoard[i][k], i, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i, k + 1);

            result = result && checkValidNumber(constBoard[i][k], i + 1, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k + 1);

            await sleep(delay);
            square.style.backgroundColor = "#aaaaaa";

            if(!result)
            {
                console.log("kings move failed at cell: " + i + " " + k);
                
                return;
            }
        }
    }
}

// checks a valid cross constraint
async function validCross()
{
    let valid = true;
    let c1 = new Set();
    let c2 = new Set();

    for(let i = 0; i < 9; i++ )
    {
        let square1 = document.getElementById((9 * i + i + 1));
        square1.style.backgroundColor = "#ffff00";

        let square2 = document.getElementById(((8 - i) * 9 + i + 1 ).toString());
        square2.style.backgroundColor = "#ffff00";
        if(constBoard[i][i] >= 1 && constBoard[i][i] <= 9)
        {
            c1.add(constBoard[i][i]);
        }

        if(constBoard[8 - i][i] >= 1 && constBoard[8 - i][i] <= 9)
        {
            c2.add(constBoard[8 - i][i]);
        }
        await sleep(delay);
    }

    if(c1.size != 9 || c2.size != 9)
    {
        console.log("failed cross :(");
        colorCross("red");
        valid = false;
        updateColorBoardCross(0);
    }
    else
    {
        console.log("passed cross :)");
        colorCross("green");
    }

    await sleep(longDelay);
    colorCross("#aaaaaa");

    return valid;


}

// creates and styles the board for the user to see it
function createBoard()
{
    let board = document.getElementById('foo');

    for(let i = 0; i < 9; i++)
    {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.display = "flex";
        row.style.flexDirection = 'row';
        row.style.justifyContent = 'center';        

        for(k = 0; k < 9; k++)
        {
            let square = document.createElement('div');
            square.className = 'square';
            square.style.display = 'flex';
            square.style.backgroundColor = '#aaaaaa';
            square.style.height = '42px';
            square.style.width = '42px';
            square.style.borderStyle = "solid"
            square.style.borderColor = 'black';
            square.style.borderWidth = '2px';
            square.style.justifyContent = 'center';
            square.style.alignItems = 'center';
            square.style.fontSize = "40px";
            square.id = (9 * i + k + 1).toString();
            square.append(constBoard[i][k]);
            row.appendChild(square);
        }

        board.appendChild(row);
    }

    console.log("board created");
    
}

// forces the program to sleep for a duration so the user can see what is happening
function sleep (ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

// updates each row after a row check
async function colorRow(row, color)
{
    let squares = document.getElementsByClassName("row")[row].children;

    for (const square of squares) 
    {
        square.style.backgroundColor = color;   
    }
    

}

// updates each col after each col check
function colorCol(col, color)
{
    for(let i = 0; i < 9; i++)
    {
        let square = document.getElementById((9 * i + col + 1));
        square.style.backgroundColor = color;
    }
}

// updates each box after each box check
function colorBox(startRow, startCol, color)
{
    for(let i = startRow; i < startRow + 3; i++)
    {
        for(let k = startCol; k < startCol + 3; k++)
        {
            let square = document.getElementById((9 * i + k + 1).toString());
            square.style.backgroundColor = color;
        }
    }
}

// updates the color of the cross
function colorCross(color)
{
    for(let i = 0; i < 9; i++ )
    {
        let square1 = document.getElementById((9 * i + i + 1));
        square1.style.backgroundColor = color;

        let square2 = document.getElementById(((8 - i) * 9 + i + 1 ).toString());
        square2.style.backgroundColor = color;

    }
}

// updates the color board row
function updateColorBoardRow(row, valid)
{
    for(let i =0; i < 9; i++)
    {
        if(valid != 1)
        {
            colorBoard[row][i] = valid;
        }
    }

    console.log(colorBoard);
    
}

// updates the color board col
function updateColorBoardCol(col, valid)
{
    for(let i = 0; i < 9; i++)
    {
        if(valid != 1)
        {
            colorBoard[i][col] = valid;
        }
    }
    console.log(colorBoard);
}

// updates the color board box
function updateColorBoardBox(startRow, startCol, valid)
{
    for(let i = startRow; i <  startRow + 3; i++)
    {
        for(let k = startCol; k < startCol + 3; k++)
        {
            colorBoard[i][k] = valid;
        }
    }
}

// updates a specific cell in the color board
function updateColorBoardCell(row, col, valid)
{
    colorBoard[row][col] = valid;
}

// updates the cross in the color board
function updateColorBoardCross(valid)
{
    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            colorBoard[i][i] = valid;
            colorBoard[8 - i][i] =  valid;
        }
    }
}

// updates the board to its final state to display to the user
async function updateColorBoard()
{
    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            let square = document.getElementById((9 * i + k + 1).toString());

            if(colorBoard[i][k] === 1)
            {
                square.style.backgroundColor = "green";
            }
            else
            {
                square.style.backgroundColor = "red";
            }

            await sleep(shortDelay);
        }
    }

    console.log("colored board");
    
}

// reset the board to its original state
async function reset()
{
    for(let i = 8; i >= 0; i--)
    {
        for(let k = 8; k >= 0; k--)
        {
            colorBoard[i][k] = 1;
            let square = document.getElementById((9 * i + k + 1).toString());
            square.style.backgroundColor = "#aaaaaa";
            await sleep(shortDelay);
        }
    }

    
}



initializeConstBoard();

createBoard();