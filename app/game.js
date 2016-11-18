define('app/game', [
    'underscore',
    'userInput',
    'utils',
    'app/map',
    'app/GameObject',
    'app/Player'
], function (
    _,
    userInput,
    utils,
    map,
    GameObject,
    Player
) {    
    
    var game = {}

    game.init = function() {
        this.gameObjects = [];
        loadMap();
    }
    game.tick = function(delta) {
        _.each(this.gameObjects, function(gameObject) {
            gameObject.tick(delta);
        });
    }
    game.draw = function(context, canvas) {
        context.fillStyle = "white";
        context.fillRect(0,0,canvas.width, canvas.height);

        _.each(this.gameObjects, function(gameObject) {
            gameObject.draw(context);
        });
    }

    game.addGameObject = function(obj) {
        this.gameObjects.push(obj);
    }.bind(game)
    
    game.TILE_SIZE = 16;

    function loadMap() {

        _.each(map.getMap(), function(row, rowIdx) {
          _.each(row, function(column, colIdx) {
            switch(column) {
              case 1:
                var tile = new GameObject({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(tile)
              break;
              case 2:
                var tile = new Player({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE
                  },
                  game: game,
                  input: userInput.getInput
                })
                game.gameObjects.push(tile)
              break;
            }
          })
        })
    }

    return game;
});