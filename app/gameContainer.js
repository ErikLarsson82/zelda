requirejs.config({
    waitSeconds: '60',
    baseUrl: 'lib',
    paths: {
      'app': '../app',
      'GameLoop': '../node_modules/gameloop-schwein/GameLoop',
      'SpriteSheet': '../node_modules/spritesheet-canvas/SpriteSheet'
    }
});

requirejs([
  'app/game',
  'GameLoop'
], function (game, GameLoop) {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');


    const gameMusic = new Audio('assets/sounds/music1.ogg')
    gameMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    const victoryMusic = new Audio('assets/sounds/music1.ogg')
    victoryMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    const foundkey = new Audio('assets/sounds/foundkey.ogg')
    const hit = new Audio('assets/sounds/hit.ogg')
    const miss = new Audio('assets/sounds/miss.ogg')
    const opendoor = new Audio('assets/sounds/opendoor.ogg')
    const takedamage = new Audio('assets/sounds/takedamage.ogg')

    const sfxs = {
      gameMusic: gameMusic,
      victoryMusic: victoryMusic,
      foundkey: foundkey,
      hit: hit,
      miss: miss,
      opendoor: opendoor,
      takedamage: takedamage
    }

    var muted = false;
    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 77) { // M - mute
        muted = !muted
        if (muted) {
          gameMusic.pause()
          victoryMusic.pause();
        } else {
          gameMusic.play()
        }
      }
    })
    function playSound(soundString, shouldPause, reset) {
      if (reset) {
        sfxs[soundString].currentTime = 0;
      }
      if (!muted) {
        if (shouldPause) {
          sfxs[soundString].pause()
        } else {
          sfxs[soundString].play()
        }
      }
    }

    game.init();
    game.setSound(playSound);
    
    var config = {
        callback: function(delta) { game.tick(delta); game.draw(context, canvas); },
        fpsMode: 'fixed',
        fps: 60,
        autoStart: true,
        createDebugKeyBoardShortcuts: true
    }

    var gameLoop = new GameLoop(config);
})