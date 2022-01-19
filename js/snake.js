class SnakeNode {
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.previous = null
    }
}

export class Snake {
    constructor() {
        this.tail = null;
        this.addNode(15, 23)
        this.addNode(15, 22)
        this.addNode(15, 21)
        this.addNode(15, 20)
        this.addNode(15, 19)
        this.addNode(15, 18)
        this.addNode(15, 17)
        this.addNode(15, 16)
        this.direction = 'ArrowUp'
        this.snakePositions = this.getSnakePositions()
        this.snakePositionsStringified = this.getSnakePositionsStringified(this.snakePositions)
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

    addNewTail (x, y) {
        let node = new SnakeNode(x, y)
        node.previous = this.tail
        this.tail = node
    }

    move () {
        switch(this.direction) {
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
        this.checkIfCrossedBoundaries(current)
        this.snakePositions = this.getSnakePositions()
        this.snakePositionsStringified = this.getSnakePositionsStringified()
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

    getSnakePositionsStringified(){
        let snakePositionsStringified = []
        this.snakePositions.forEach(element => {
            snakePositionsStringified.push(`${element[0]},${element[1]}`)
        });
        return snakePositionsStringified
    }

    checkIfCrossedBoundaries(snakeNode) {
        if (snakeNode.x < 0) {
            snakeNode.x = 29
        }
        else if (snakeNode.x > 29) {
            snakeNode.x = 0
        }
        if (snakeNode.y < 0) {
            snakeNode.y = 29
        }
        
        else if (snakeNode.y > 29) {
            snakeNode.y = 0
        }
    }

    checkIfEnteredIntoHimself () {
        let noDuplicates = new Set(this.snakePositionsStringified)
        return this.snakePositionsStringified.length !== noDuplicates.size;
    }

    
}