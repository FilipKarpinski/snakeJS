import { Snake } from './snake.js'
export function Game() {
    this.finished = false
    this.score = 0
    this.snake = new Snake()

    this.start = async () => {
        document.addEventListener('keydown', (event) => {
            let direction = event.key.toString()
            switch(direction) {
                case 'ArrowUp':
                    if (this.snake.direction != 'ArrowDown') {
                        this.snake.direction = direction
                    }
                    break;
                case 'ArrowDown':
                    if (this.snake.direction != 'ArrowUp') {
                        this.snake.direction = direction
                    }
                    break;
                case 'ArrowLeft':
                    if (this.snake.direction != 'ArrowRight') {
                        this.snake.direction = direction
                    }
                    break;
                case 'ArrowRight':
                    if (this.snake.direction != 'ArrowLeft') {
                        this.snake.direction = direction
                    }
                    break;  
              }
        })
        this.startMoving()
    }

    this.startMoving = async () => {
        while (true) {
            this.clearMap()
            this.snake.getSnakePositions().forEach(element => { 
                if (element[0] > 29 || element[0] < 0 || element[1] > 29 || element[1] < 0) {
                    this.gameOver()
                }
                this.change_cell(element[0], element[1], 'cell-snake')
            });
            if (!this.finished) {
                await new Promise(r => setTimeout(r, 50));
                this.snake.move(this.snake.direction)
                console.log('moving')
            }
            
        }
    }

    this.renderMap = () => {
        this.clearMap()
        this.snake.getSnakePositions().forEach(element => {
            this.change_cell(element[0], element[1], 'cell-snake')
        });
    }

    this.clearMap = () => {
        document.querySelectorAll(".cell-snake").forEach(element => {
            element.classList.remove('cell-snake')
            element.classList.add('cell-empty')
        });
    }

    this.change_cell = (x, y, change_to) => {
        let cell_id = `cell-${x}-${y}`
        let cell = document.getElementById(cell_id)
        cell.className = ''
        cell.classList.add(change_to)
    }

    this.gameOver = () => {
        alert('GAME OVER')
        this.finished = true
    }
}


