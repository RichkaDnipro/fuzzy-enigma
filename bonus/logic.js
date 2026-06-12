const ROWS = 10;
const COLS = 10;
const MINES_NUM = 20;

let board = []; 
let gameOver = false;
let pivot1 = null;

const CODE_HIDDEN = 99;
const CODE_MINE = -1;
const CODE_FLAG = 55;
let isFlagMode = false;

function initEngine() {
    board = [];
    gameOver = false;
    document.getElementById("game-process-status").innerText = "В процесі";
    document.getElementById("game-process-status").className = "status-process";
    document.getElementById("mines-count").innerText = MINES_NUM;

    const columnsAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            board.push({
                "Рядок": `${String(r + 1).padStart(2, '0')}`,
                "Стовпчик": columnsAlphabet[c],
                "value": CODE_HIDDEN, 
                
                "_isMine": false,
                "_isOpened": false,
                "_minesAround": 0,
                "_r": r,
                "_c": c
            });
        }
    }
    
    let minesPlaced = 0;
    while (minesPlaced < MINES_NUM) {
        let randomIndex = Math.floor(Math.random() * board.length);
        if (!board[randomIndex]._isMine) {
            board[randomIndex]._isMine = true;
            minesPlaced++;
        }
    }

    board.forEach(cell => {
        if (cell._isMine) return;
        cell._minesAround = countMinesAround(cell._r, cell._c);
    });
}

function getCell(r, c) {
    return board.find(cell => cell._r === r && cell._c === c);
}

function countMinesAround(r, c) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let neighbor = getCell(r + i, c + j);
            if (neighbor && neighbor._isMine) count++;
        }
    }
    return count;
}

function openCell(r, c) {
    let cell = getCell(r, c);
    if (!cell || cell._isOpened) return;

    cell._isOpened = true;

    if (cell._isMine) {
        endGame(false);
        return;
    }

    cell.value = cell._minesAround;

    if (cell._minesAround === 0) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                openCell(r + i, c + j);
            }
        }
    }

    checkWin();
}

function toggleFlag(targetCell) {
    if (targetCell._isOpened) return; 

    if (targetCell.value === CODE_FLAG) {
        targetCell.value = CODE_HIDDEN;
    } else if (targetCell.value === CODE_HIDDEN) {
        targetCell.value = CODE_FLAG;
    }
}

function toggleGameMode() {
    isFlagMode = !isFlagMode;
    const btn = document.getElementById("mode-toggle");
    
    if (isFlagMode) {
        btn.innerText = "Встановити прапорець";
        btn.className = "mode-flag";
    } else {
        btn.innerText = "Відкрити клітинку";
        btn.className = "mode-dig";
    }
}

function endGame(isWin) {
    gameOver = true;
    board.forEach(cell => {
        if (cell._isMine) {
            cell.value = CODE_MINE; 
        } else {
            cell.value = cell._minesAround;
        }
    });

    const statusEl = document.getElementById("game-process-status");
    if (isWin) {
        statusEl.innerText = "ПЕРЕМОГА!";
        statusEl.className = "status-win";
    } else {
        statusEl.innerText = "ПРОГРАШ";
        statusEl.className = "status-lose";
    }
    document.getElementById("restart-btn").style.display = "block";
}

function restartGame() {
    document.getElementById("restart-btn").style.display = "none";
    isFlagMode = false;
    const btn = document.getElementById("mode-toggle");
    btn.innerText = "Відкрити клітинку";
    btn.className = "mode-dig";
    initEngine();

    if (pivot1) {
        pivot1.setReport(generateReport());
    }
}

function checkWin() {
    let safeCells = board.filter(cell => !cell._isMine);
    let allOpened = safeCells.every(cell => cell._isOpened);
    if (allOpened && !gameOver) {
        endGame(true);
    }
}

function generateReport() {
    return {
        dataSource: {
            dataSourceType: "json",
            data: board
        },
        slice: {
            rows: [{ uniqueName: "Рядок" }],
            columns: [{ uniqueName: "Стовпчик" }],
            measures: [{ 
                uniqueName: "value", 
                aggregation: "max"
            }]
        },
        options: {
            grid: {
                showTotals: false,
                showGrandTotals: false
            },
            drillThrough: false
        },
        conditions: [
            {
                formula: "#value == 99", //сховано
                format: {
                    backgroundColor: "#34495e", 
                    color: "#34495e"
                }
            },
            {
                formula: "#value == 55", //прапор
                format: {
                    backgroundColor: "#f1c40f", 
                    color: "#f1c40f"
                }
            },
            {
                formula: "#value == -1", //бомба
                format: {
                    backgroundColor: "#e74c3c", 
                    color: "#e74c3c"
                }
            },
            {
                formula: "#value == 0", //пусто
                format: {
                    backgroundColor: "#ecf0f1", 
                    color: "#ecf0f1"
                }
            },
            {
                formula: "AND(#value > 0, #value <= 8)", //звичайна
                format: {
                    backgroundColor: "#ebf5fb", 
                    color: "#2980b9",           
                    fontWeight: "bold",
                    fontSize: "18px"
                }
            }
        ]
    };
}

initEngine();

pivot1 = new WebDataRocks({
    container: "#wdr-component",
    width: "100%",
    height: 800,
    toolbar: false,
    report: generateReport(),
    ready: function() {
        webdatarocks.on('cellclick', function(cellInfo) {
            if (gameOver) return;
            
            let rName = null;
            let cName = null;

            if (cellInfo.rowName) rName = cellInfo.rowName;
            if (cellInfo.columnName) cName = cellInfo.columnName;

            if (!rName && cellInfo.row) rName = cellInfo.row.uniqueName;
            if (!cName && cellInfo.columns && cellInfo.columns[0]) cName = cellInfo.columns[0].uniqueName;

            if (cellInfo.rows && cellInfo.rows[0]) rName = cellInfo.rows[0].uniqueName;

            if (rName && cName) {
                let target = board.find(cell => 
                    rName.trim().endsWith(cell.Рядок.trim()) && 
                    cName.trim().endsWith(cell.Стовпчик.trim())
                );
                
                if (target) {
                    if (isFlagMode) {
                        toggleFlag(target);
                    } else {
                        if (target.value !== CODE_FLAG && !target._isOpened) {
                            openCell(target._r, target._c);
                        }
                    }
                    
                    setTimeout(function() {
                        webdatarocks.setReport(generateReport());
                    }, 0);
                }
            }
        });
    }
});