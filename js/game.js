// Loading... page
var loadingPage = function (g) {
	this.game = g;
	
	this.show = function () {
		var
			c = this.game.container;
		c.html("Loading... <span id='perc'>0</span>%");
	};
	
	this.showProgress = function (p) {
		$('#perc').text(p);
		console.log('Percentage ' + p + '%');
	};
	
	this.hide = function () {
		
	};
};

// Menu page
var menuPage = function (g) {
	this.game = g;
	this.show = function (choicesArray, callback) {
		// Present choices
		// ...
		var choiceId = ~~(Math.random()*choicesArray.length);
		console.log(choiceId);
		callback(choicesArray[choiceId]);
	};
};


// Game page
var gamePage = function (g) {
	this.game = g;
	this.show = function (callback) {
		// ...
		// show game play
		// ...
		callback({});
	};
};

var bakery = function(g) {
	this.game = g;
	this.chef = null;
	this.init = function() {
		// create a default chef
		this.chef = this.game.chefFactory.getDefaultChef();
	};
};

var chef = function(chefName, salary, flavor) {
	this.name = chefName;
	this.salary = salary;
	this.currentSkillLevel = 0;
	this.flavor = flavor;
	this.createCupcake = function() {
		return new cupcake(this.flavor, this.generateCupcakeLevel());
	};
	this.generateCupcakeLevel = function() {
		var 
			rnd = Math.random()*100,
			level = this.currentSkillLevel;
// 50%, 25%, 15%, 5%, 5%  
		if ( rnd < 50 ) {
			return level;
		}
		else if ( rnd < 75 ) {
			return level + 1;
		}
		else if ( rnd < 90 ) {
			return level + 2;
		}
		else if ( rnd < 95 ) {
			return level + 3;
		}
		else {
			return -1; // special cupcake
		}
	};
};

var chefFactory = function() {
	this.getDefaultChef = function () {
		return new chef("Novice", 0);
	};
};

var cupcake = function(flavor, level) {
	this.level = level;
	this.flavor = flavor;
};

var game = {
	
	debug:true,
	
	resources: null,

	currentUser: {},
	state: "",
	
	pages: {}, // game sections, such as loading, menu, game panel, options, etc.
	
	menuChoices: ["play", "hireChef", "options"],
	
	container: null,
	
	start: function (container) {
		
		this.container = container;
		
		// do loading
		var 
			that = this,
			loadPage = new loadingPage(this);
			
		this.state = 'loading';
			
		this.resources = new resources();

		loadPage.show();
		
		this.resources.load(
				function (p) {
					loadPage.showProgress(p);
				},
				function() {
					loadPage.hide();
					that.displayMenu();
				}
		);
	},
	
	displayMenu: function () {
		this.state = 'menu';

		if ( typeof this.pages.menuPage == 'undefined' ) {
			this.pages.menuPage = new menuPage(this);
		}
		
		var 
			that = this;

		this.log('Displaying menu now.');
		this.pages.menuPage.show(this.menuChoices, 
			function (choice) { 
				that.onMenuChoice(choice); 
			});
		

	},
	
	onMenuChoice: function (choice) {
		
		this.log('game received menu choice: ' + choice);
		
		switch(choice) {
			case "play":
				this.onPlayGame();
				break;
			case "hireChef":
				this.onHireChef();
				break;
			case "options":
				this.onOptions();
				break;
		}
	},
	
	onPlayGame:function () {
		this.log('Displaying PlayGame now.');
		
		if ( typeof this.pages.gamePage === 'undefined') {
			this.pages.gamePage = new gamePage(this);
		}
		
		var 
			that = this;
			
		this.pages.gamePage.show(
			function(gameResult) { 
				that.onGameOver(gameResult); 
			});
	},
	
	onGameOver: function (gameResult) {
		this.log('Displaying Game Over now.');		
	},
	
	onHireChef: function () {
		this.log('Displaying Hire a Chef now.');		
	},
	
	onOptions: function () {
		this.log('Displaying Options now.');		
	},
	
	log:function (txt) {
		if ( this.debug === true) {
			console.log('OMC::' + txt);
		}
	}
};