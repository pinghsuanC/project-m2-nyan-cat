// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot, audioInterface) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    this.audioBoot = audioInterface;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = undefined;
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains ins tances of the Enemy class
    this.enemies = [];
    this.bullets = [];
    this.tomato_bonus = [];
    this.totalScore = 0;
    this.continue = true;
    // We add the background image to the game
    addBackground(this.root);
  }

  addPlayer = () => {
    // create player
    this.player = new Player(this.root);
  }
  addTomatoListener = () => {
    let self = this;
    // add handler for space detection
    document.addEventListener("keydown", function(e){
      if(e.code==="Space"){
        let t = self.player.shootATomato();
        if(t!=undefined){ // also include null
          self.bullets.push(t);
          self.audioBoot.playSound("player_bullet");
        }
      }
    });
  }
  updateInfo(){
    document.getElementById("info-tomato").innerHTML = `${this.player.getBullet()}`;
    document.getElementById("info-life").innerHTML = `${this.player.getLife()}`;
    document.getElementById("info-score").innerHTML = `${this.totalScore}pt`;;
  }
  addInfo = () => {
    // add some information at the top left corner
     // =============== add a wrapper: a board with a line of text and two buttons ===============
        // will be deleted after return.
        let info = document.createElement("DIV");
        //this.del_node = info;
        //console.log(this.del_node);

        info.style.position = 'absolute';
        info.style.display = "inline-block";
        info.style.width = "200px";
        info.style.height = "70px";
        info.style.maxHeight = "100px";
        //info.style.width = "200px";
        info.style.top = `0px`;
        info.style.left = `10px`;
        info.style.objectFit = "center";
        //startQ.style.background = "white";
        // append the board to the app root
        this.root.appendChild(info);
    
        // =============== add a text ===============
        let info_inner = document.createElement("DIV");
        info_inner.innerHTML = `<p><img src="./images/player_tomato.png" class="info-img">x<span id="info-tomato">${PLAYER_MAX_BULLET}</span></p>
                                  <p><img src="./images/player_heart.png" class="info-img">x<span id="info-life">${PLAYER_LIFE}</span></p>
                                  <p>Score:<span id="info-score"></span></p>`;
        info_inner.style.lineHeight = "35px";
        info_inner.style.color = "black";
        info_inner.style.backgroundColor = "rgba(229, 229, 229, 0.44)";
        info_inner.style.textAlign = "center";
        info_inner.style.fontSize = "1em";
        info.appendChild(info_inner);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
      TIME_TOTAL = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    TIME_TOTAL = new Date().getTime() - TIME_TOTAL;   // update total time

    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.shot = this.isEnemyShot(enemy);
      enemy.update(timeDiff);
    });
    // update the bullet
    this.bullets.forEach((element) => {
      element.update(timeDiff);
    });
    // update the tomato bonus
    //console.log(this.tomato_bonus);
    // loop through and filter
    this.updateInfo();

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    // and update the collision of bullet and enemies
    this.enemies = this.enemies.filter((enemy) => {
      //enemy.destroyed = isEnemyShot(enemy);
      return !enemy.destroyed;
    });
    this.tomato_bonus = this.tomato_bonus.filter((tom) => {
      //enemy.destroyed = isEnemyShot(enemy);
      if(tom.hasUsed){
        tom.removeTomato();
      }
      return !tom.hasUsed;
    });
    

    //let tmp = Array.from(this.tomato_bonus);  // copy the array
    // We need to perform the addition of enemies until we have enough enemies.
    let count = 0
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      let tmp = Math.random();
      if(tmp<0.7 || count>MAX_ENEMYF){
        this.enemies.push(new Enemy(this.root, spot, this.audioBoot));
      }else{
        this.enemies.push(new FloatingEnemy(this.root));
        count++;
      }
    }
    // add tomato to the screen
    let tmp = Math.random();
    while(tmp<0.2 && this.tomato_bonus.length<SCREEN_MAX_TOMATO){
      // create tomato & push to screen
      let t = new Tomato(this.root)
      // generate random position for t
      t.setX(Math.random()*(GAME_WIDTH-40) + 20);
      t.setY(Math.random()*(GAME_HEIGHT-40) + 20);
      this.tomato_bonus.push(t);
    }

    //console.log(this.enemies);
    // check for event keys: I want smooth movement！( this makes the game actually harder :D)
    // Thanks to this answer: https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
    //console.log(cur_keys);
    if(cur_keys["ArrowLeft"]){
      this.player.moveLeft();
    }
    if(cur_keys["ArrowRight"]){
      this.player.moveRight();
    }
    if(cur_keys["ArrowUp"]){
      this.player.moveUp();
    }
    if(cur_keys["ArrowDown"]){
      this.player.moveDown();
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    this.playerCollecting();
    if (this.isPlayerHit()) {
        //update life
        this.player.reduceLife();
        this.audioBoot.playSound("player_hit");
    }
    if(this.isPlayerDead()){
      this.audioBoot.playSound("meow_end");
      this.audioBoot.playSound("game_over");
      this.reset();
      this.continue = false;
      //window.alert("END");
      return;
    }else if(this.continue){
      // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
      setTimeout(this.gameLoop, 20);
    }
    
  };
  isPlayerDead = () => {
    return (this.player.getLife() === -1 ? true : false);
  }
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerHit = () => {
    // when the location of player and any of the enemy overlaps then die.

    for(let n=0; n<this.enemies.length; n++){
      // by the time we check, we already have all the enemies destroyed removed
      // moment of collision:
        /* general rule:
          1. player.x < enemy.x + enemy width
          2. player.x + player width > enemy.x
          3. player.y < enemy.y + enemy height
          4. player.y + player height > enemy.y
        */
      if((this.player.getX() < (this.enemies[n].getX()+this.enemies[n].getWidth())) &&
        ((this.player.getX()+PLAYER_WIDTH) > this.enemies[n].getX()) &&
        (this.player.getY() < (this.enemies[n].getY()+this.enemies[n].getHeight())) &&
        (this.player.getY()+PLAYER_HEIGHT) > this.enemies[n].getY() &&
          this.enemies[n].hasEaten===false){
          this.enemies[n].hasEaten = true;    // flag the enemy to be removed
        return true;
      }
    }
    return false;
  };
  // function to check if player is collecting with any of the tomatos
  playerCollecting = () => {
    for(var n=0; n<this.tomato_bonus.length; n++){
      // by the time we check, we already have all the enemies destroyed removed
      // moment of collision:
      /*console.log(`
          player's position: Top = ${this.player.getX()}; Left = ${this.player.getY()}.
                              width = ${PLAYER_WIDTH}; height = ${PLAYER_HEIGHT}
          tomato's position: Top = ${this.tomato_bonus[n].getX()}; Left = ${this.tomato_bonus[n].getY()}.
                              width = ${TOMATO_WIDTH}; height = ${TOMATO_HEIGHT}
          answerA = ${(this.player.getX() + PLAYER_WIDTH >= this.tomato_bonus[n].getX() + TOMATO_WIDTH)}
          answerB = ${(this.player.getY() + PLAYER_HEIGHT >= this.tomato_bonus[n].getY() + TOMATO_HEIGHT)}
            answerB.1 = ${this.player.getY() + PLAYER_HEIGHT}
            answerB.2 = ${this.tomato_bonus[n].getY() + TOMATO_HEIGHT}
            answerB = ${(this.player.getY() + PLAYER_HEIGHT) >= (this.tomato_bonus[n].getY() + TOMATO_HEIGHT)};
      `);*/
      if((this.tomato_bonus[n].getX() < (this.player.getX()+this.player.getWidth())) &&
        ((this.tomato_bonus[n].getX()+TOMATO_WIDTH) > this.player.getX()) &&
        (this.tomato_bonus[n].getY() < (this.player.getY()+this.player.getHeight())) &&
        (this.tomato_bonus[n].getY()+TOMATO_HEIGHT) > this.player.getY() &&
          this.tomato_bonus[n].hasUsed===false){
          this.audioBoot.playSound("player_collect");   // play sound
          this.totalScore += this.tomato_bonus[n].getScore();
          this.player.collectATomato();
          this.tomato_bonus[n].hasUsed = true;    // flag the enemy to be removed
      }
    }
  };
  // function to check if the enemy is shot or not
  isEnemyShot = (ene) => {
    // go through the bullets and enemies
    for(let n=0; n<this.bullets.length; n++){
      if((ene.getX() < (this.bullets[n].getX()+this.bullets[n].getWidth())) &&
        ((ene.getX()+ENEMYF_WIDTH) > this.bullets[n].getX()) &&
        (ene.getY() < (this.bullets[n].getY()+this.bullets[n].getHeight())) &&
        (ene.getY()+ENEMYF_HEIGHT) > this.bullets[n].getY() &&
        this.bullets[n].hasUsed === false){
          // remove the bullet from the list
          this.bullets[n].hasUsed = true;
          // add to score
          this.totalScore+=ene.getScore();
          return true;
      }
    }
    return false;
  };

  reset(){
    // remove the html
    // remove all the elements
    this.enemies.forEach((enemy) => {
      enemy.shot = true;
      enemy.update(0);
    });
    // remove the bullet
    this.bullets.forEach((element) => {
      element.hasUsed = true;
      element.update(0);
    });
    this.tomato_bonus.forEach((ele) => {
      ele.hasUsed = true;
      ele.removeTomato();
    });

    // reset all the parameters
    this.enemies = [];
    this.bullets = [];
    this.tomato_bonus = [];
    TIME_TOTAL = 0;  
    
    // atop all the music in the audioboot
    // this.audioBoot.stopAll();
    // randomly add background
    // addBackground(this.root);

    this.restartBoard(this.root);
  }

  restartBoard = (root) => {
    // =============== add a wrapper: a board with a line of text and two buttons ===============
    // will be deleted after return.
    let startQ = document.createElement("DIV");
    this.del_node = startQ;
    //console.log(this.del_node);

    startQ.style.position = 'absolute';
    startQ.style.height = "400px";
    startQ.style.width = "1000px";
    startQ.style.top = `${GAME_HEIGHT/2-300}`;
    startQ.style.left = `${GAME_WIDTH/2-500 - 10}`;
    startQ.style.display = "flex";
    startQ.style.flexDirection="column";
    startQ.style.alignItems = "center";
    startQ.style.zIndex = 100;
    //startQ.style.background = "white";
    // append the board to the app root
    this.root.appendChild(startQ);

    // =============== add a text ===============
    let start_ques = document.createElement("DIV");
    start_ques.innerHTML = "Oops... ";
    start_ques.style.color = "white"
    start_ques.style.textAlign = "center";
    start_ques.style.fontSize = "4em";
    start_ques.classList.add("start-ques");
    startQ.appendChild(start_ques);
    // =============== add a text ===============
    let start_intro = document.createElement("DIV");
    start_intro.innerHTML = `<p>You gave them a big meal :D.</p>
                              <p>Do you want to try again?</p>
                            <p>Though the one below is the only option XD.</p>
                            <p>There will be no count down before start because I am lazy :P.</p>`;
    start_intro.style.width = "500px"
    start_intro.style.padding = "10px"
    start_intro.style.color = "black";
    start_intro.style.backgroundColor = "rgba(229, 229, 229, 0.44)";
    start_intro.style.marginTop = "30px";
    start_intro.style.textAlign = "center";
    start_intro.style.fontSize = "1em";
    startQ.appendChild(start_intro);
    // =============== add a buttons ===============
    let startQ_buts = document.createElement("DIV");
    let start_but = document.createElement("BUTTON");
    start_but.classList.add("start-btn");
    start_but.innerHTML = "YES";
    startQ_buts.appendChild(start_but);
    startQ.appendChild(startQ_buts);
    
    // =============== add event listener and return ===============
    let self = this;
    this.del_node = startQ;
    start_but.addEventListener("click", function(){
      self.totalScore = 0;
      // create a new player
      self.player.reset();
      self.continue = true;
      // delete del_node
      self.del_node.remove();
      // restart the game after displaying "Ready!"

      self.gameLoop()});
      
    }
}



