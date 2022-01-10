import {Game} from './game.js';

$("#start").click(() => {
    var game = new Game()
    game.start()
})

