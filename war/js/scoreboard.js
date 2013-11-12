function ScoreBoard(container, numPlayers) {
    this.container = container;
    this.numPlayers = numPlayers;
    this.scores = new Array();
    this.domElements = new Array();
    this.init();
}

ScoreBoard.prototype = {
    init: function() {
        for (var i = 0; i < this.numPlayers; i++) {
            this.scores[i] = 0;
            this.domElements[i] = document.createElement("div");
            this.domElements[i].className = "player_" + (i + 1);
            //this.domElements[i].style.height = "100%";
            this.domElements[i].style.width = 100 / this.numPlayers + "%";
            //this.domElements[i].style.float = "left";
            this.container.appendChild(this.domElements[i]);
        }
        this.update();
    },
    update: function() {
        for (var i = 0; i < this.numPlayers; i++) {
            this.domElements[i].innerHTML = this.scores[i] + "";
        }
    },
    setScore: function(scores) {
        for (var i = 0; i < this.numPlayers; i++) {
            this.scores[i] = scores[i];
        }
        this.update();
    }
};