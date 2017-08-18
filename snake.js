var mainElement = document.getElementById("main");
var intervalId;
var FIELD_SIZE = 20;
var FIELD_COLOR = "rgb(47, 79, 79)";
var FOOD_COLOR = "rgb(139, 0, 139)";
var DELAY = 200;
var currentRow;
var currentDirection = [0, -1];

window.onload = function () {
    window.addEventListener("keydown", buttonCheck);
    createField(FIELD_SIZE);
    createSnake();
    createFood(numberGenerate(), numberGenerate());
    intervalId = setInterval(moveSnake, DELAY);
};

function createSnake() {
    createSnakeCell(getCellByCoord.apply(null, snake.head));
    createSnakeCell(getCellByCoord(FIELD_SIZE - 1, FIELD_SIZE - 2));
    createSnakeCell(getCellByCoord.apply(null, snake.tail))
}

function createSnakeCell(cell) {
    cell.style.backgroundColor = snake.color;
}

function createFood(foodHeight, foodWidth) {
    var foodCell = getCellByCoord(foodHeight, foodWidth);
    if (!checkSnakeCell(foodCell)) {
        foodCell.style.backgroundColor = FOOD_COLOR;
        foodCoord.height = foodHeight;
        foodCoord.width = foodWidth;
        return;
    }
    createFood(numberGenerate(), numberGenerate());
}

function checkSnakeCell(targetCell) {
    return targetCell.getAttribute("style").localeCompare("background-color: " + snake.color + ";") === 0;
}

function clearCell(cell) {
    cell.style.backgroundColor = FIELD_COLOR;
}

function getCellByCoord(height, width) {
    return mainElement.children[height].children[width];
}

function createField(size) {
    for (var lineCounter = 0; lineCounter < size; lineCounter++) {
        currentRow = mainElement.appendChild(createRow(lineCounter));
        for (var rowCounter = 0; rowCounter < size; rowCounter++) {
            currentRow.appendChild(createCell(rowCounter));
        }
    }
}

function moveSnake() {
    direction.history.push(currentDirection);
    var nextCoord = arraysSum(snake.head, currentDirection);
    boundsCheck(nextCoord);
    if (checkSnakeCell(getCellByCoord.apply(null, nextCoord))) {
        gameOver();
    }
    createSnakeCell(getCellByCoord.apply(null, nextCoord));
    clearCell(getCellByCoord.apply(null, snake.tail));
    if (!eat()) {
        snake.tail = arraysSum(snake.tail, direction.history.shift());
    } else {
        snake.length++;
    }
    if (!(getCellByCoord(foodCoord.height, foodCoord.width).getAttribute("style").localeCompare("background-color: " + FOOD_COLOR + ";") === 0)) {
        createFood(numberGenerate(), numberGenerate());
    }

    function arraysSum(array, array1) {
        array[0] += array1[0];
        array[1] += array1[1];
        return array;
    }
}

function eat() {
    return foodCoord.height === snake.head[0] && foodCoord.width === snake.head[1];
}

function boundsCheck(coord) {
    if ((coord[0] > FIELD_SIZE) || (coord[0] < 0)) gameOver();
    if ((coord[1] > FIELD_SIZE - 1) || (coord[1] < 0)) gameOver();
}

function gameOver() {
    clearInterval(intervalId);
    alert("game over...score: " + snake.length);
}

function createRow(lineNumber) {
    var result = createDiv();
    result.setAttribute('class', 'row');
    result.setAttribute("id", lineNumber);
    return result;
}

function createCell(rowNumber) {
    var result = createDiv();
    result.innerText = rowNumber + 1;
    result.setAttribute("class", "cell");
    result.style.backgroundColor = FIELD_COLOR;
    result.setAttribute("id", rowNumber);
    return result;
}

function createDiv() {
    return document.createElement('div');
}

function buttonCheck(e) {
    switch (e.which) {
        case KEY.LEFT:
            if (currentDirection === direction.RIGHT) break;
            currentDirection = direction.LEFT;
            break;
        case KEY.RIGHT:
            if (currentDirection === direction.LEFT) break;
            currentDirection = direction.RIGHT;
            break;
        case KEY.UP:
            if (currentDirection === direction.DOWN) break;
            currentDirection = direction.UP;
            break;
        case KEY.DOWN:
            if (currentDirection === direction.UP) break;
            currentDirection = direction.DOWN;
            break;
        default:
            break;
    }
    return false;
}

function numberGenerate() {
    return Math.floor(Math.random() * (FIELD_SIZE - 3) + 1);
}

var snake = {
    'length': 0,
    'color': "rgb(65, 105, 225)",
    'head': [FIELD_SIZE - 1, FIELD_SIZE - 3],
    'tail': [FIELD_SIZE - 1, FIELD_SIZE - 1]
};

var direction = {
    'LEFT': [0, -1],
    'RIGHT': [0, 1],
    'UP': [-1, 0],
    'DOWN': [1, 0],
    'history': [[0, -1], [0, -1]]
};

var foodCoord = {
    'width': 0,
    'height': 0
};

var KEY = {
    'LEFT': 37,
    'RIGHT': 39,
    'UP': 38,
    'DOWN': 40
};