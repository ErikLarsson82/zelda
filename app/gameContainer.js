requirejs.config({
    waitSeconds: '60',
    baseUrl: 'lib',
    paths: {
      'app': '../app',
      'GameLoop': '../node_modules/gameloop-schwein/GameLoop'
    }
});

requirejs([
  'app/game',
  'GameLoop'
], function (game, GameLoop) {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    game.init({ map: "0", teleport: "0"});
    
    var config = {
        callback: function(delta) { game.tick(delta); game.draw(context, canvas); },
        fpsMode: 'screenHz',
        //fps: 60,
        autoStart: true,
        createDebugKeyBoardShortcuts: true
    }

    var gameLoop = new GameLoop(config);
})