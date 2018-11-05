const game = new Game();

/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById("begin-game").addEventListener("click", () => {
    document.getElementById("begin-game").style.display = 'none';
    game.startGame();
    document.getElementById('play-area').style.opacity = '1';
});

/** 
 * Listen for keyboard presses
 */
document.addEventListener("keydown", event => {
    game.handleKeydown(event);
});