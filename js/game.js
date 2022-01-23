import { Snake } from './snake.js'

var GAME_SPEED = 50
export class Game {
    static game;
    constructor() {
        this.finished = true
        this.highScore = []
    }

    static getGame() {
        if (!this.game) {
            this.game = new Game()
        }
        return this.game
    }

    start() {
        this.prepareGame()
        this.startMoving()
    }

    async startMoving() {
        while (!this.finished) {
            await new Promise(r => setTimeout(r, GAME_SPEED));
            this.spawnFood(this.snake.snakePositionsStringified)
            this.renderMap()
            this.setScore()
            if (this.snake.checkIfEnteredIntoHimself()) {
                this.gameOver()
                break
            }
            else {
                this.snake.direction = this.direction
                if (this.isSnakeEatingFood()) {
                    this.snakeEats()
                } else {
                    this.snake.move()
                }
            }

        }
    }

    prepareGame () {
        this.finished = false
        this.direction = 'ArrowUp'
        this.score = 0
        this.foodIsOnMap = false
        this.foodPosition = []
        document.getElementById('game-over').style.visibility = 'hidden'
        document.getElementById('new-high-score').style.visibility = 'hidden'
        this.snake = new Snake()
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
    }

    renderMap() {
        this.clearMap()
        this.snake.snakePositions.forEach(element => {
            this.change_cell(element[0], element[1], 'cell-snake')
        });
        this.change_cell(this.foodPosition[0], this.foodPosition[1], 'cell-food')
    }

    clearMap() {
        document.querySelectorAll(".cell-snake").forEach(element => {
            element.classList.remove('cell-snake')
            element.classList.remove('cell-food')
            element.classList.add('cell-empty')
        });
        document.querySelectorAll(".cell-food").forEach(element => {
            element.classList.remove('cell-food')
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
        this.setHighScore()
        this.finished = true
        document.getElementById('game-over').style.visibility = 'visible'
    }

    snakeEats() {
        let x = this.snake.tail.x
        let y = this.snake.tail.y
        this.snake.move()
        this.snake.addNewTail(x, y)
        this.foodIsOnMap = false
        this.score += 1
    }

    spawnFood(snakePositionsStringified) {
        let foodPosition = this.generateFoodPosition(snakePositionsStringified)
        if (foodPosition === false) {
            this.gameOver()
        } else if (!this.foodIsOnMap) {
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

    isSnakeEatingFood() {
        if (this.snake.snakePositionsStringified.includes(`${this.foodPosition[0]},${this.foodPosition[1]}`)) {
            return true
        }
        return false
    }

    setScore() {
        document.getElementById('score').innerHTML = this.score
        document.getElementById('final-score').innerHTML = this.score
    }

    setHighScore() {
        if (this.highScore.length == 0) {
            document.getElementById('new-high-score').style.visibility = 'visible'
        }
        if (this.highScore.length > 0 && this.score > this.highScore[0]) {
            document.getElementById('new-high-score').style.visibility = 'visible'
        }
        this.highScore.push(this.score)
        this.highScore = this.highScore.sort(function(a, b) {
            return a - b;
          }).reverse()
        if (this.highScore.length > 0) {
            document.getElementById('high-score-1').innerHTML = this.highScore[0]
            document.getElementById('high-score-container-1').style.visibility = 'visible'
        }
        if (this.highScore.length > 1) {
            document.getElementById('high-score-2').innerHTML = this.highScore[1]
            document.getElementById('high-score-container-2').style.visibility = 'visible'
        }
        if (this.highScore.length > 2) {
            document.getElementById('high-score-3').innerHTML = this.highScore[2]
            document.getElementById('high-score-container-3').style.visibility = 'visible'
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}