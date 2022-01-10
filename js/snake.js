class SnakeNode {
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.previous = null
    }
}

export class Snake {
    constructor()
    {
        this.tail = null;
        this.addNode(15, 23)
        this.addNode(15, 22)
        this.addNode(15, 21)
        this.addNode(15, 20)
        this.direction = 'ArrowUp'
    }

    addNode (x, y) {
        let node = new SnakeNode(x, y)
        let current
        if (this.tail === null) {
            this.tail = node
        }
        else {
            current = this.tail
            while(current.previous) {
                current = current.previous
            }
            current.previous = node
        }

    }

    move (direction) {
        switch(direction) {
            case 'ArrowUp':
                this.moveSnake(0, -1)
                break;
            case 'ArrowDown':
                this.moveSnake(0, 1)
                break;
            case 'ArrowLeft':
                this.moveSnake(-1, 0)
                break;
            case 'ArrowRight':
                this.moveSnake(1, 0)
                break;  
          }
    }

    moveSnake (x, y) {
        let current = this.tail
        while (current.previous) {
            current.x = current.previous.x
            current.y = current.previous.y
            current = current.previous
        }
        current.x += x
        current.y += y
    }

    getSnakePositions() {
        let snakePosition = [[this.tail.x, this.tail.y]]
        let current = this.tail
        while(current.previous) {
            current = current.previous
            snakePosition.push([current.x, current.y])
        }
        return snakePosition
    }
}