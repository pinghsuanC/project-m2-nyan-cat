// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 12;
const MAX_ENEMYF = Math.floor(MAX_ENEMIES/2.5);

// the floating enemy width and height
const ENEMYF_WIDTH = 301/5;
const ENEMYF_HEIGHT = 613/5;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

// constants representing the width and height of the tomato
const TOMATO_WIDTH = 18*2;
const TOMATO_HEIGHT = 17*2;
const SCREEN_MAX_TOMATO = 3;

// number of wall papers in the folder
const WALLPAPER_NUM = 5;

// number for sensitivity
const PLAYER_SPEED = 20;
const PLAYER_LIFE = 10;
const PLAYER_MAX_BULLET = 10;

// time elapsed, used to increase difficulty!
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
let TIME_TOTAL = undefined;
let timeoue_ids = [];

// the paths to piactures
let ENEMY_IMG = ["./images/enemy.png", "./images/enemy_eyeClosed.png", "./images/enemy_eyeCloasedSmile.png"];

// this will be the only one during the game
