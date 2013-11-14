function ScoreBoard(container, numPlayers) {
    this.container = container;
    this.numPlayers = numPlayers;
    this.scores = new Array();
    this.names = [
        "Player1", "Player2"
    ];
    this.domElements = new Array();
    this.nameElements = new Array();
    this.init();
}

ScoreBoard.prototype = {
    init: function() {
        for (var i = 0; i < this.numPlayers; i++) {
            this.scores[i] = 0;
            var div = document.createElement("div");
            div.className = "player_" + (i + 1);
            //this.domElements[i].style.height = "100%";
            div.style.width = 100 / this.numPlayers + "%";
            //this.domElements[i].style.float = "left";

            this.domElements[i] = document.createElement("div");
            this.nameElements[i] = document.createElement("div");
            div.appendChild(this.nameElements[i]);
            div.appendChild(this.domElements[i]);
            this.container.appendChild(div);
        }
        this.update();
    },
    update: function() {
        for (var i = 0; i < this.numPlayers; i++) {
            this.domElements[i].innerHTML = this.scores[i] + "";
            this.nameElements[i].innerHTML = this.names[i];
        }
    },
    setScore: function(scores) {
        for (var i = 0; i < this.numPlayers; i++) {
            this.scores[i] = scores[i];
        }
        this.update();
    },
    setName: function(names) {
        for (var i = 0; i < names.length; i++) {
            this.names[i] = names[i];
        }
        this.update();
    }
};