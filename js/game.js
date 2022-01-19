import { Snake } from './snake.js'
export class Game {
    constructor () {
    this.finished = false
    this.foodIsOnMap = false
    this.foodPosition = []
    this.score = 0
    this.snake = new Snake()
    this.direction = 'ArrowUp'
    }
    

    start() {
        document.addEventListener('keydown', (event) => {
            let direction = event.key.toString()
            switch (direction) {
                case 'ArrowUp':
                    if (this.snake.direction != 'ArrowDown') {
                        this.direction = direction
                    }
                    break;
                case 'ArrowDown':
                    if (this.snake.direction != 'ArrowUp') {
                        this.direction = direction
                    }
                    break;
                case 'ArrowLeft':
                    if (this.snake.direction != 'ArrowRight') {
                        this.direction = direction
                    }
                    break;
                case 'ArrowRight':
                    if (this.snake.direction != 'ArrowLeft') {
                        this.direction = direction
                    }
                    break;
            }
        })
        this.startMoving()
    }

    async startMoving () {
        while (!this.finished) {
            if (this.snake.checkIfEnteredIntoHimself()) {
                this.gameOver()
                break
            }
            else {
                this.renderMap()
                this.spawnFood(this.snake.snakePositionsStringified)
                await new Promise(r => setTimeout(r, 50));
                this.snake.direction = this.direction
                if (this.isSnakeEatingFood()) {
                    let x = this.snake.tail.x
                    let y = this.snake.tail.y
                    this.snake.move()
                    this.snake.addNewTail(x, y)
                    this.foodIsOnMap = false
                } else {
                    this.snake.move()
                }
            }

        }
    }

    renderMap () {
        this.clearMap()
        this.snake.snakePositions.forEach(element => {
            this.change_cell(element[0], element[1], 'cell-snake')
        });
    }

    clearMap() {
        document.querySelectorAll(".cell-snake").forEach(element => {
            element.classList.remove('cell-snake')
            element.classList.add('cell-empty')
        });
    }

    change_cell(x, y, change_to) {
        let cell_id = `cell-${x}-${y}`
        let cell = document.getElementById(cell_id)
        cell.className = ''
        cell.classList.add(change_to)
    }

    gameOver() {
        this.finished = true
    }

    spawnFood(snakePositionsStringified) {
        let foodPosition = this.generateFoodPosition(snakePositionsStringified)
        if (foodPosition === false) {
            this.gameOver()
        } else if (!this.foodIsOnMap) {
            this.change_cell(foodPosition[0], foodPosition[1], 'cell-food')
            this.foodPosition = foodPosition
            this.foodIsOnMap = true
        }
    }

    generateFoodPosition(snakePositionsStringified) {
        let availablePositions = []
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                if (!snakePositionsStringified.includes(`${i},${j}`)) {
                    availablePositions.push([i, j])
                }
            }
        }
        if (availablePositions.length === 0) {
            return false
        }
        return availablePositions[this.getRandomInt(0, availablePositions.length - 1)]
    }

    getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isSnakeEatingFood() {
        if (this.snake.snakePositionsStringified.includes(`${this.foodPosition[0]},${this.foodPosition[1]}`)) {
            return true
        }
        return false
    }
}


