class AudioInterface{
    #sounds = ["game_background", "game_over", "game_countdown",
                    "meow_end", "meow_start",
                    "player_bullet", "player_collect", "player_hit"];
    #audio_obj = {};

    constructor(root){
        this.root = root;
        // initialize all sounds here
        this.addAudio();
        
    }

    // called by the constructor to create elements
    addAudio(){
        // loop through the music and create audio nodes
        this.#sounds.forEach(ele => {
            // create audio element
            this.#audio_obj[ele] = new Audio(`./sounds/${ele}.mp3`);
        });
        // loop the background after creation
        this.loopBackgound();
    }
    playSound(name_sound){
        this.#audio_obj[name_sound].load();
        this.#audio_obj[name_sound].play();
    }
    stopAll(){
        Object.values(this.#audio_obj).forEach(ele => {
            ele.pause();
            ele.currentTime = 0;
        });
    }
    loopBackgound(){
        // loop the background music
        let bgm = this.#audio_obj["game_background"];
        if (typeof bgm.loop == 'boolean'){
            bgm.loop = true;
        }
        else{
            bgm.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    }
}
