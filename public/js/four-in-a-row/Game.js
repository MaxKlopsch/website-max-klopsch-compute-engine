class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    /**
     * Returns active player.
     * @return {Object} player - The active player.
     */
    get activePlayer() {
        return this.players.find(player => player.active === true);
    }

    /** 
    * Creates two player objects.
    * @return  {Array}    An array of two Player objects.
    */
    createPlayers() {
        return [new Player("Player 1", 1, "#e15258", true),
                new Player("Player 2", 2, "#e59a13")];
    }

    /*
    * Gets game ready for play.
    */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    /**
    * Branches code, depending on what key player presses
    * @param   {Object}    e - Keydown event object
    */
    handleKeydown(e) {
        if(this.ready) {
            if(e.key === "ArrowLeft") {
                // Move Token Left
                this.activePlayer.activeToken.moveLeft();
            } else if(e.key === "ArrowRight") {
                // Move Token Right
                this.activePlayer.activeToken.moveRight(this.board.columns);
            } else if(e.key === "ArrowDown") {
                // Drop Token
                this.playToken();
            }
        }
    }

    /**
     * Finds Space object to drop token into then drops token
     */
    playToken() {
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = this.board.spaces[activeToken.columnLocation];
        let targetSpace = null;

        for(let space of targetColumn) {
            if(space.token === null) {
                targetSpace = space;
            }
        }

        if(targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace);
        }
    }
}