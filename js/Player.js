// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    this.hit_t = 0;
    this.root = root;
    this.life = PLAYER_LIFE;
    this.bullet_num = PLAYER_MAX_BULLET;
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = Math.floor((GAME_WIDTH / PLAYER_WIDTH) /2)*PLAYER_WIDTH;     // makesure it's in the middle
    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    
    // modified so that y is stored (may want to use this later :) )
    this.y = (GAME_HEIGHT - PLAYER_HEIGHT - 10)/2;    // make it at the middle

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = 10;
    root.appendChild(this.domElement);

    /*load bullets
    for(var n = 0; n<PLAYER_MAX_BULLET; n++){
      let t = new Tomato(this.root);
      this.#bullets.push(t);
    }*/

  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_SPEED;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_SPEED;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  // for the up key
  moveUp(){
    if(this.y > 10){
      this.y = this.y - PLAYER_SPEED;
    }
    this.domElement.style.top = `${this.y}px`;
  }
  // for the down key
  moveDown(){
    if(this.y + PLAYER_HEIGHT + 10 < GAME_HEIGHT){
      this.y = this.y + PLAYER_SPEED;
    }
    this.domElement.style.top = `${this.y}px`;
  }
  // for update life
  reduceLife(){
    this.life--;
  }

  // function to load player's tomato
  collectATomato(){
    if(this.bullet_num<PLAYER_MAX_BULLET){
      this.bullet_num++;
    }
  }

  shootATomato = () => {
    if(this.bullet_num>0){
      let t = new Tomato(this.root);
      t.setX(this.x + PLAYER_WIDTH/2);
      t.setY(this.y + 10);
      this.bullet_num--;
      return t;   // return the element for engine (need to check collision with enemy)
    }
    return undefined;
  }
  // method to reset all values
  reset(){
    this.life = PLAYER_LIFE;
    this.bullet_num = PLAYER_MAX_BULLET;
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = Math.floor((GAME_WIDTH / PLAYER_WIDTH) /2)*PLAYER_WIDTH;     // makesure it's in the middle
    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    
    // modified so that y is stored (may want to use this later :) )
    this.y = (GAME_HEIGHT - PLAYER_HEIGHT - 10)/2;    // make it at the middle

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement.src = 'images/player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = 10;
  }

  getX(){   // x-position getter
    return this.x;
  }
  getY(){   // y-position getter
    return this.y;
  }
  getBullet(){
    return this.bullet_num;
  }
  getLife(){
    return this.life;
  }
  getWidth(){
    return PLAYER_WIDTH;
  }
  getHeight(){
    return PLAYER_HEIGHT
  }
}
