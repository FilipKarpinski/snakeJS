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
}

function createCell(x, y, iter) {
    cellId = "cell-" + x.toString() + '-' + y.toString();
    var cellDiv = $(`<div id="${cellId}"></div>`);
    cellDiv.addClass("cell-empty");
    $(".board").append(cellDiv);
}