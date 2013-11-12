function ScoreBoard(container, numPlayers){
	this.container=container;
	this.numPlayers=numPlayers;
	this.scores=new Array();
	this.domElements=new Array();
	this.init();
}

ScoreBoard.prototype={
	init:function(){
		for(var i = 0; i < this.numPlayers; i++){
			this.scores[i]=0;
			this.domElements[i]=document.createElement("div");
			this.container.appendChild(this.domElements[i]);
		}
		this.update();
	},
	update:function(){
		for(var i=0; i < this.numPlayers; i++){
			this.domElements[i].innerHTML=this.scores[i]+"";
		}
	},
	setScore:function(scores){
		for(var i=0; i < this.numPlayers; i++){
			this.scores[i]=scores[i];
		}
		this.update();
	}
};