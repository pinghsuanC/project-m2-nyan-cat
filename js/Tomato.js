// mainly uses the function from enemy & also random appearance on the screen
// but with slight modification

// for this project just allow bullets to go in y direction
class Tomato{

    constructor(root){

        this.root = root;
        // add a image
        this.width = TOMATO_WIDTH;
        this.height = TOMATO_HEIGHT;

        // x and y
        //this.x = player_x + player_x/2 + this.width/2;
        //this.y = player_y + this.height;
        this.x = undefined;
        this.y = undefined;
        this.destroyed = false; // whether it's out of boundary or not
        this.hasUsed = false;   // whether it's hit the target

        this.speed = 0.7;
        this.score = 500;   // 500 pt for tomato eating!
        // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
        // DOM node in a property.
        this.domElement = document.createElement('img');
        this.domElement.src = './images/player_tomato.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.height = `${this.height}px`;
        this.domElement.style.width = ` ${this.width}px`;
        this.domElement.style.zIndex = 0;
        
        //console.log(this.root);
        this.root.appendChild(this.domElement);
    }

    setX = (input_x) => {
        if(input_x!=undefined){
            this.x = input_x;
            this.domElement.style.left = `${this.x}px`;
        }
        
    }
    setY = (input_y) => {
        if(input_y!=undefined){
            this.y = input_y;
            this.domElement.style.top = ` ${this.y}px`;
        }
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getHeight(){
        return TOMATO_HEIGHT;
    }
    getWidth(){
        return TOMATO_WIDTH;
    }
    getScore(){
        return this.score;
    }

    update = (timeDiff) =>{
        if(this.y<-TOMATO_HEIGHT || this.hasUsed){
            this.domElement.remove();
        }else{
            this.y = this.y - timeDiff * this.speed;
            this.domElement.style.top = ` ${this.y}px`;
        }
        
    }
    removeTomato = () => {
        this.domElement.remove();
    }


}