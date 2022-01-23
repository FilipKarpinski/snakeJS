var SNAKE_TEXT = [
    [3, 7], [4, 7], [5, 7], [3, 8], [3, 9], [4, 9], [5, 9], [5, 10], [5, 11], [4, 11], [3, 11], // S
    [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [11, 7], [11, 8], [11, 9], [11, 10], [11, 11], [8, 8], [9, 9], [10, 10], // N
    [13, 11], [13, 10], [13, 9], [13, 8], [16, 11], [16, 10], [16, 9], [16, 8], [14, 7], [15, 7], [14, 9], [15, 9], // A
    [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [19, 9], [20, 8], [21, 7], [20, 10], [21, 11], // K
    [23, 7], [23, 8], [23, 9], [23, 10], [23, 11], [24, 7], [25, 7], [26, 7], [24, 9], [25, 9], [26, 9], [24, 11], [25, 11], [26, 11] //E
]

function initBoard() {
    var mapSize = 30; // create a field of 10x10
    var cellsPerRow = 30; // 10 cells per row

    var iter = 0
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < cellsPerRow; j++) {
            createCell(j, i, iter);
            iter += 1;
        }
    }
    writeSnake()
}

function createCell(x, y, iter) {
    cellId = "cell-" + x.toString() + '-' + y.toString();
    var cellDiv = $(`<div id="${cellId}"></div>`);
    cellDiv.addClass("cell-empty");
    $(".board").append(cellDiv);
}


function writeSnake() {
    SNAKE_TEXT.forEach(element => {
        element[1] = element[1] + 5
        let textCell = document.getElementById("cell-" + element[0].toString() + '-' + element[1].toString())
        textCell.className = 'cell-snake'
    });
}
