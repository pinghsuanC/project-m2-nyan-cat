// Driver class
// Arrange the phase of engine
    // 1. start
    // 2. call gameloop
    // 3. replay or stop

class Driver {

    constructor(root){
        this.root = root;
        this.audioboot = new AudioInterface();;
        this.gameEngine = new Engine(this.root, this.audioboot);
        this.isStart = false;
        this.del_node = undefined;      // place holder for nodes to be deleted later
        this.startBoard(this.root);
    }


    
    // starting board. return true if selected yes
    startBoard = (root) => {
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
        //startQ.style.background = "white";
        // append the board to the app root
        this.root.appendChild(startQ);
    
        // =============== add a text ===============
        let start_ques = document.createElement("DIV");
        start_ques.innerHTML = "I CAN HAZ CHEEZBURGER?!??(extended.ver)";
        start_ques.style.color = "white"
        start_ques.style.textAlign = "center";
        start_ques.style.fontSize = "4em";
        start_ques.classList.add("start-ques");
        startQ.appendChild(start_ques);
        // =============== add a text ===============
        let start_intro = document.createElement("DIV");
        start_intro.innerHTML = `<p>A hamburger was travelling through the space when he encountered a group of hungry nyan cats...</p>
                                    <p>Though he wanted to be friends with them, the cats decided he was too delicious to be friend with...(sad story)</p>
                                    <p>Use [space] to shoot a tomato <img src="./images/player_tomato.png">.</p>
                                    <p>Use ←↑↓→ to contol his movement to avoid cats or pick up tomatoes.</p>
                                    <p>Press START below to start the game!</p>
                                    <p>♥ There will be a countdown before start, get ready ♥</p>`;
        start_intro.style.width = "500px"
        start_intro.style.padding = "10px"
        start_intro.style.color = "black";
        start_intro.style.backgroundColor = "rgba(229, 229, 229, 0.6)";
        start_intro.style.marginTop = "30px";
        start_intro.style.textAlign = "center";
        start_intro.style.fontSize = "1em";
        startQ.appendChild(start_intro);
        // =============== add two buttons ===============
        let startQ_buts = document.createElement("DIV");
        let start_but = document.createElement("BUTTON");
        start_but.classList.add("start-btn");
        start_but.innerHTML = "START";
        startQ_buts.appendChild(start_but);
        startQ.appendChild(startQ_buts);
        
        // =============== add event listener and return ===============
        start_but.addEventListener("click", this.countDown);
    }

    countDown = () => {
        // delete starting page
        this.del_node.remove();
        // =============== add a wrapper for countdown ===============
        let startQ = document.createElement("DIV");
        this.del_node = startQ;

        startQ.style.position = 'absolute';
        startQ.style.height = "400px";
        startQ.style.width = "1000px";
        startQ.style.top = `${GAME_HEIGHT/2-300}`;
        startQ.style.left = `${GAME_WIDTH/2-500 - 10}`;
        startQ.style.display = "flex";
        startQ.style.flexDirection="column";
        startQ.style.alignItems = "center";
        //startQ.style.background = "white";
        // append the board to the app root
        this.root.appendChild(startQ);
        // =============== add a text ===============
        let start_ques = document.createElement("DIV");
        start_ques.innerHTML = "";
        start_ques.style.color = "white"
        start_ques.style.textAlign = "center";
        start_ques.style.fontSize = "4em";
        start_ques.classList.add("start-ques");
        startQ.appendChild(start_ques);

        // do some countdown before the game starts!
        // set interval & take care of scope
        let count = 3;      // countdown from 3
        let txt = `${count}`;
        let self = this;        // the scope thing here is so annoying...
        let int_id = setInterval(function(){
            // display the text
            //this.audioboot.playSound("game_countdown");
            if(count===-1){
                self.gameEngine.addTomatoListener();        // start listening to tomato shooting
                self.startGame();
                self.del_node.remove();
                clearInterval(int_id);
            }
            if(count >= 0){
                self.audioboot.playSound("game_countdown");
            }
            if(count===3){
                self.gameEngine.addPlayer();                // create player
                self.gameEngine.addInfo();                  // add the information top left corner
            }
            start_ques.innerHTML = `${txt}`;
            count--;
            txt = `${count}`;
            // check if it's 0, then next time display start
            if(count===0){
                txt = "Start!";
            }
            
        }, 1000);       // update every 1s

    }

    startGame = () => {
        // delete node and start game!
        this.del_node.remove();     // remove the starting page
        this.audioboot.playSound("game_background");
        this.gameEngine.gameLoop();
    }

}






// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
// display the selection board for starting


// We call the gameLoop method to start the game
//gameEngine.gameLoop();

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
/*const keydownHandler = (event) => {
// event.code contains a string. The string represents which key was press. If the
// key is left, then w e call the moveLeft method of gameEngine.player (where is this method defined?)
if (event.code === 'ArrowLeft') {
gameEngine.player.moveLeft();
}

// If `event.code` is the string that represents a right arrow keypress,
// then move our hamburger to the right
if (event.code === 'ArrowRight') {
gameEngine.player.moveRight();
}
if (event.code === 'ArrowUp') {
gameEngine.player.moveUp();
}
if (event.code === 'ArrowDown') {
gameEngine.player.moveDown();
}
};*/

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
//document.addEventListener('keydown', keydownHandler);
