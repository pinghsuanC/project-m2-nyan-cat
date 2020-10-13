// I guess these two should be under the same interface?

// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy {
  // The constructor takes 2 arguments.
  // - theRoot refers to the parent DOM element.
  //   We need a way to add the DOM element we create in this constructor to our DOM.
  // - enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
  // Since the constructor takes 2 parameters
  // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
  // create an instance of this class.
  constructor(theRoot, enemySpot, audioInterface) {
    // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
    // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    this.spot = enemySpot;
    this.audioBoot = audioInterface;
    this.score = 1000;  // the score for top-down enemy

    // The x position of the enemy is determined by its width and its spot. We need this information for the lifetime
    // of the instance, so we make it a property of the instance. (Why is this information needed for the lifetime of the instance?)
    this.x = enemySpot * ENEMY_WIDTH;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a property
    // of the instance since it is needed throughout its lifetime. The destroyed property will indicate whether this enemy
    // is still in play. It is set to true whenever the enemy goes past the bottom of the screen.
    // It is used in the Engine to determine whether or not an enemy is in a particular column.
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;
    this.shot = false;
    this.hasEaten = false;
    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement('img');

    // We give it a src attribute to specify which image to display.
    this.domElement.src = './images/enemy.png';
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 2 + 0.15 + 1/(Math.exp(1/Math.log(TIME_TOTAL*5)))/20;

    // pictures
    this.images = ["./images/enemy.png", "./images/enemy_eyesClosed.png", "./images/enemy_eyesClosedSmile.png"];
    this.changeImg();
  }

  // function to change picture
  changeImg(){
    let self = this;
    let count = 0;
    let int_id = setInterval(function(){
      self.domElement.src = self.images[count%3];
      count++;
      if(self.destroyed){
        clearInterval(int_id);
      }
    }, 500)  // change every 0.5s
  }

  // We set the speed property of the enemy. This determines how fast it moves down the screen.
  // To make sure that every enemy has a different speed, we use Math.random()
  // this method will be called on the enemy instance every few milliseconds. The parameter
  // timeDiff refers to the number of milliseconds since the last update was called.
  update(timeDiff) {
    // check for start
    if(this.y >= 0 && this.y <= ENEMY_HEIGHT/2){
      if(Math.random()<0.001){
        this.audioBoot.playSound("meow_start") // 50% of probability to meow
      }
    }
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
                                  // random number between 0.5 and 1.5
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y >= GAME_HEIGHT || this.shot) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }

  // ==================== functions added ====================
  getX(){   // x-position getter
    return this.x;
  }
  getY(){   // y-position getter
    return this.y;
  }
  getWidth(){
    return ENEMY_WIDTH;
  }
  getHeight(){
    return ENEMY_HEIGHT;
  }
  getScore(){
    return Math.round(this.score*(1/(Math.exp(1/Math.log(TIME_TOTAL)))));
  }

}

class FloatingEnemy{
  // specific class for a free-roaming enemy
  constructor(theRoot) {
    // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
    // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    
    this.speed = Math.random() / 2 + 0.25 + TIME_TOTAL/2000*0.02;
    this.score = 2000;  // score for floating enemy

    // Starts at the left top corner
    this.x = Math.floor(Math.random() * (GAME_WIDTH-ENEMYF_WIDTH-10));
    this.y = GAME_HEIGHT;
    this.shot = false;
    this.hasEaten = false;

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement('img');

    // We give it a src attribute to specify which image to display.
    this.domElement.src = './images/enemy_ballon.png';
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;
    this.domElement.height = `${ENEMYF_HEIGHT}`;
    this.domElement.width = `${ENEMYF_WIDTH}`;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);

  }

  update(timeDiff) {

    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y - Math.random()*this.speed*10 - 0.2*timeDiff - Math.exp(1/TIME_TOTAL)/5;
    this.domElement.style.top = `${this.y}px`;

    //this.moveUp(timeDiff);
    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y <= -ENEMYF_HEIGHT || this.shot) {
      this.domElement.remove();
      this.destroyed = true;
      NUM_ENEMYF--; // update number of floating enemies
    }
  }

  getX(){   // x-position getter
    return this.x;
  }
  getY(){   // y-position getter
    return this.y;
  }
  getWidth(){
    return ENEMYF_WIDTH;
  }
  getHeight(){
    return ENEMYF_HEIGHT;
  }
  getScore(){
    return Math.round(this.score*(1/(Math.exp(1/Math.log(TIME_TOTAL)))));
  }


}
