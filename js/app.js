// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
   this.initialize(); 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = (this.x+ (this.speed*dt));
    if(this.x>=505){
      this.initialize();  
    }


};
Enemy.prototype.initialize = function (){
  this.y=randomGen(this.qlevels,1,3);
        this.speed = rand(this.minspeeds[3],this.maxspeeds[3]);
        this.x = 0;  
};
Enemy.prototype.qlevels = {1:72,2:155,3:238,0:72};
Enemy.prototype.minspeeds = {1:70,2:130,3:210,4:280,5:3500};
Enemy.prototype.maxspeeds = {1:0,2:70,3:140,4:210,5:2800} 


var randomGen  = function (obj,min,max){
     return obj[rand(min,max)];
};
var rand = function (min,max){
   return Math.floor((Math.random() * (max-min+1)))+min;
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.initialize();
    this.sprite = 'images/char-boy.png';
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
     var enemy;
     for(enemy in allEnemies){
    
        if(allEnemies[enemy].y==this.y&&(allEnemies[enemy].x+101>this.x+20&&this.x+81>=allEnemies[enemy].x))

        {
            
            this.initialize();
        }
    }
    
    };
    Player.prototype.initialize = function (){
        this.x= 202.5;
    this.y = 404;
    }
    Player.prototype.handleInput = function (k){
    switch (k)
    {
        case 'up' : this.y = (this.y>72)?(this.y-83):404;
               break;
        case 'down':this.y = this.y<404?(this.y+83):404;
               break;
        case 'left':this.x = (this.x>0.5)?(this.x-101):404;
        
        break;
        case 'right' : this.x = (this.x+101)%505;        
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i=0;i<8;i++){
    allEnemies[i] = new Enemy();
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
