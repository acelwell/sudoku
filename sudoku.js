let constBoard = new Array(9);
let playBoard = new Array(9);

let r1 = "586374912";
let r2 = "137952864";
let r3 = "249816573";
let r4 = "872543196";
let r5 = "693781245";
let r6 = "415629738";
let r7 = "954237681";
let r8 = "721468359";
let r9 = "368195427";

// valid for all possibilites


// let r1 = "586374912";
// let r2 = "137952864";
// let r3 = "249816573";
// let r4 = "872543196";
// let r5 = "693789245";
// let r6 = "415629738";
// let r7 = "954237681";
// let r8 = "721468359";
// let r9 = "368195427";

let rows = [r1, r2, r3, r4, r5, r6, r7, r8, r9]

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

function validSudoku()
{
    let rowHashSet = new Set();
    let colHashSet = new Set();
    

    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            if(constBoard[i][k] >= 1 && constBoard[i][k] <= 9)
            {
                rowHashSet.add(constBoard[i][k]);
            }
            if(constBoard[k][i] >= 1 && constBoard[k][i] <= 9)
            {
                colHashSet.add(constBoard[k][i]);
            }
        }

        if(rowHashSet.size != 9 || colHashSet.size != 9)
        {
            console.log("not a valid sudoku");
            return;
        }
    }

    for(let i = 0; i < 9; i += 3)
    {
        for(let k = 0; k < 9; k += 3)
        {
            if(!checkBox(i,k))
            {
                console.log("not valid sudoku");
                return;
            }
        }
    }

    console.log("valid sudoku yay!");
    
}

function checkBox(row, col)
{

    let boxHashSet = new Set();

    for(let i = row; i < row + 3; i++)
    {
        for(let k = col; k < col + 3; k++)
        {
            if(constBoard[i][k] >= 1 && constBoard[i][k] <= 9)
            {
                boxHashSet.add(constBoard[i][k]);
            }
        }
    }

    return boxHashSet.size == 9;
}

function checkValidNumber(num, row, col)
{
    if(row < 0 || row > 8 || col < 0 || col > 8)
    {
        return true;
    }

    return num != constBoard[row][col];

}

function validKnightsMove()
{
    let result = true;

    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            result = result && checkValidNumber(constBoard[i][k], i - 2, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i - 2, k + 1);
            result = result && checkValidNumber(constBoard[i][k], i + 2, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i + 2, k + 1);

            result = result && checkValidNumber(constBoard[i][k], i - 1, k - 2);
            result = result && checkValidNumber(constBoard[i][k], i - 1, k + 2);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k - 2);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k + 2);

            if(!result)
            {
                console.log("knights move failed at cell: " + i + " " + k);
                
                return;
            }
        }
    }


}

function validKingsMove()
{
    let result = true;

    for(let i = 0; i < 9; i++)
    {
        for(let k = 0; k < 9; k++)
        {
            result = result && checkValidNumber(constBoard[i][k], i - 1, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i - 1, k);
            result = result && checkValidNumber(constBoard[i][k], i - 1, k + 1);

            result = result && checkValidNumber(constBoard[i][k], i, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i, k + 1);

            result = result && checkValidNumber(constBoard[i][k], i + 1, k - 1);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k);
            result = result && checkValidNumber(constBoard[i][k], i + 1, k + 1);

            if(!result)
            {
                console.log("kings move failed at cell: " + i + " " + k);
                
                return;
            }
        }
    }
}

function validCross()
{
    let c1 = new Set();
    let c2 = new Set();

    for(let i = 0; i < 9; i++ )
    {
        if(constBoard[i][i] >= 1 && constBoard[i][i] <= 9)
        {
            c1.add(constBoard[i][i]);
        }

        if(constBoard[8 - i][i] >= 1 && constBoard[8 - i][i] <= 9)
        {
            c2.add(constBoard[8 - i][i]);
        }
    }

    if(c1.size != 9 || c2.size != 9)
    {
        console.log("failed cross :(");
    }
    else
    {
        console.log("passed cross :)");
        
    }


}

function createBoard()
{
    let board = document.getElementById('foo');
    // board.style.justifyContent = 'center';
    

    console.log(board);
    

    for(let i = 0; i < 9; i++)
    {
        let row = document.createElement('div');
        row.className = 'row';
        row.style.display = "flex";
        row.style.flexDirection = 'row';
        row.style.justifyContent = 'center';
        console.log(row);
        

        for(k = 0; k < 9; k++)
        {
            let square = document.createElement('div');
            square.className = 'square';
            square.style.display = 'flex';
            square.style.backgroundColor = 'aqua';
            square.style.height = '42px';
            square.style.width = '42px';
            square.style.borderStyle = "dashed"
            square.style.borderColor = 'black';
            square.style.borderWidth = '1px';
            square.style.justifyContent = 'center';
            square.style.alignItems = 'center';
            square.id = k.toString();
            square.append(constBoard[i][k]);
            row.appendChild(square);
        }

        board.appendChild(row);
    }

    // board.style.borderStyle = "solid";
    // board.style.borderColor = "black";
    // board.style.borderWidth = '1px;'

    console.log("board created");
    
}



initializeConstBoard();

createBoard();

validSudoku();

validKnightsMove();

validKingsMove();

validCross();