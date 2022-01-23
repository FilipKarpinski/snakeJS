import {Game} from './game.js';

$("#button-start").click(() => {
    var game = Game.getGame()
    if (game.finished) {
        game.start()
    }
})

document.body.onkeyup = function(e){
    if(e.keyCode == 32) {
        var game = Game.getGame()
        if (game.finished) {
            game.start()
        }
    }
}

$("body").click(function(){
    $(this).toggleClass("btn-active").siblings().removeClass("btn-active");
});

