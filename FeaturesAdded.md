# Features Added (And all the credits of resource) - latest version
* _Basically I decided to work on the functionality of the game..._
* Update player
    - Smooth free movement rather than grid movement by ←↑↓→
        - Removed the lag between first press and consequent presses.
        - It also allows diagonal movement.
        - It may be choppy sometimes but since there is no frame control...let it be :).
    - Add tomatoes for player to shoot
        - Sorry for my art lol, I drew it in pixel art [here](https://www.pixilart.com/draw?ref=home-page)
    - Allow players to pick up tomato from the map and load them
    - Add life for the player
* Update top-down enemy
    - Though the movement was so fast that you can't see their face, their expression is changing every 0.5s
* Added down-top enemy (floating)
    - initial idea was to make a free-floating enemy but it was too hard to do with vanilla js (sad)
* Added score system
    - picking tomato = 500pt
    - shot top-down enemy = 1000pt
    - shot floating enemy = 2000pt
    - Score will increase with time for two types of enemies (because they became faster)
* Add sound effects (Hope it works well on Net)
    - Added an audio interface to take care of all sound effects (hope it works :D).
    - background music:
        - Hibikase by Reol & Giga & Okiku from [here](https://www.youtube.com/watch?v=TkroHwQYpFE)
    - for enemies:
        - The sound effects are from [here](https://www.zapsplat.com/sound-effect-category/cats/page/2/)
        - 0.4% chance of meowing when appearing at the top
        - when collision happens, meow for enjoyment
            - future update: may use pan stereo
    - for player:
        - Added bullet sound effect from [here](https://www.findsounds.com/ISAPI/search.dll?keywords=bullet)
    - for countdown:
        - [here](https://www.zapsplat.com/page/4/?s=timer&post_type=music&sound-effect-category-id)
* Add countdown before game actually start
* Enlarge game playboard
    - used window.width and height
    - updated the data & codes to accomendate.
    - replace the white container by overflowing the app div
    - attempted to make it full-screen failed but I am lazy to fix it ( may come back to this!)
* Increase the difficulty level of the game as time passes by making the enemies go faster.
    - added some numbers related to time_passed to the speed of enemies
* Update wallpapers
    - random 5 wall paper at start
    - pictures retrieved from [here](https://wallpaperset.com/desktop-space-backgrounds)
* Make selectoin panel for restarting the game

# Possible future updates (& current problems)
* Since the window.height and window.width is one-time thing, if your window size changes then it won't update automatically
* maybe full-screen game?
* Since the floating enemy is an png, the right transparent cornor is too extended and will be detected as collision if touched.
* Add levels and phases of game
* Position the score bar to a better place so tomatoes won't show on the score board
* Upload gif wall paper to make it actually looks like space travel
* create score board by writting to csv and store it somewhere
* actually pan the meowing for better experience
* Other functional objects like special tomatoes :D.
* .etc


