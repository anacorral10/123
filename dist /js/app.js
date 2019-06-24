let lives = 5;
let score = 0;
let hearts_collected = 0;
let crossed = 0;
let is_game_over = false;
document.getElementById('score').innerHTML = score;
document.getElementById('lives').innerHTML = lives;
document.getElementById('isgameover').innerHTML = is_game_over;


// Enemies our player must avoid
//creating a constructor function to create new objects

var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x; //x position
    this.y = y; //y position
    this.speed = s; //speed in which the enemy moves 
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    /* This method handles the enemy movement and multiplies 
    something called dt (time delta) to normalize game speed. */
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 707) {
        this.x = -100;
        var someSpeed = Math.floor(Math.random() * 4 + 1);
        this.speed = (60 + (score > 0 ? score / 20 : score)) * someSpeed;
    }
    /* implimenting the collision logic by accounting for the
    space around the enemies middle point */
    var enemyXleftMax = this.x - 70;
    var enemyXRightMax = this.x + 70;
    var enemyYTopMax = this.y - 60;
    var enemyYBottomMax = this.y + 60;
    if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) {
        //console.log('you lose...');
        player.resetPosition();
        lives--;
        updateView('you died. ' + lives + ' lives remaining...');
        if(lives === 0) {
            alert('GAME OVER!!!');
            player.resetPosition();
            is_game_over = true;
            updateView('you died. ' + lives + ' lives remaining...'); //(UNCOMMENT LATER) */
        }
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 303;
    this.y = 404;
    this.h_step = 101;
    this.v_step = 83;
}; 

Player.prototype.resetPosition = function() {
    this.x = 303;
    this.y = 404;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x >= this.h_step ? this.x -= this.h_step : this.x -= 0;
            break;
        case 'right':
            this.x <= (this.h_step * 5) ? this.x += this.h_step : this.x += 0;
            break;
        case 'up': 
            this.y -= this.v_step;
            if(this.y <= 50) {
                score += 10;
                crossed ++;
                updateView('you win!!! score: ' + score);
                window.gem = new Gem();
                if(crossed % 5 === 0) { window.heart = new Heart(); } //(UNCOMMENT LATER)*/
                this.resetPosition();
            }
            break;
        case 'down':
        this.y <= (this.v_step * 4) ? this.y += this.v_step : this.y += 0;
            break; 
    }
};


//Created constuctor function to generate collectable gems 
const gems = [
    { name: 'Blue Gem', image: 'images/gem-orange.png', value: 50 },
    { name: 'Green Gem', image: 'images/gem-green.png', value: 20 },
    { name: 'Orange Gem', image: 'images/Key.png', value: 10 }
];

// const players = [
//     'images/char-boy.png',
//     'images/char-cat-girl.png',
//     'images/char-horn-girl.png',
//     'images/char-pink-girl.png',
//     'images/char-princess-girl.png',
//     'images/char-boy.png'
//   ];

const x_blocks = [101, 202, 404, 505, 606];
const y_blocks = [100, 200, 300];

const Gem = function Gem() {
   var g = gems[ Math.floor(Math.random() * gems.length) ];

   this.name = g.name;
   this.image = g.image;
   this.value = g.value;

   this.x = x_blocks[ Math.floor(Math.random() * x_blocks.length) ];
   this.y = y_blocks[ Math.floor(Math.random() * y_blocks.length) ];
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};
Gem.prototype.collected = function() {
    var leftMax = this.x - 40;
    var rightMax = this.x + 40;
    var topMax = this.y - 40;
    var bottomMax = this.y + 40;
    
    if(player.x > leftMax && player.x < rightMax && player.y > topMax && player.y < bottomMax) {
        score += this.value;
         updateView('gem collected! score: ' + score);
         window.gem = {};
    }
}

const Heart = function Heart() {
    this.image = 'images/Heart.png';

    this.x = x_blocks[ Math.floor(Math.random() * x_blocks.length) ];
    this.y = y_blocks[ Math.floor(Math.random() * y_blocks.length) ];
  }
  Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
  };
  Heart.prototype.collected = function() {
    var leftMax = this.x - 40;
    var rightMax = this.x + 40;
    var topMax = this.y - 40;
    var bottomMax = this.y + 40;

    if(player.x > leftMax && player.x < rightMax && player.y > topMax && player.y < bottomMax) {
      hearts_collected++;
      lives++;
      updateView('Heart collected! Lives: ' + lives);
      window.heart = {};
    }
  }

// updates score title & toast alerts 
function updateView(string) {
    document.getElementById('score').innerHTML = score;
    document.getElementById('lives').innerHTML = lives;
    document.getElementById('isgameover').innerHTML = is_game_over;
    if(string) { M.toast({html: string, classes: 'rounded'}); } //(UNCOMMENT LATER)
}

// Now instantiate your objects.
var enemy1 = new Enemy(-80, 60 + 80 * 0, (Math.floor(Math.random() * 4 + 1) * 60));
var enemy2 = new Enemy(-80, 60 + 80 * 1, (Math.floor(Math.random() * 4 + 1) * 60));
var enemy3 = new Enemy(-80, 60 + 80 * 2, (Math.floor(Math.random() * 4 + 1) * 60));

// Place all enemy objects in an array called allEnemies

window.allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
window.player = new Player();
window.gem = new Gem();
window.heart = new Heart();
//window.selector = new Selector();

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
/* Inside the listener, we got an object which maps numbers 
(key codes) to a corresponding string (left, up, etc). 
At the end, it makes a call to the player (not yet created) 
method for handling input (also not finished yet), passing 
in a string which was the value of the e.keyCode property. */