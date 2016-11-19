define('app/game', [
    'underscore',
    'userInput',
    'utils',
    'app/map',
    'app/GameObject',
    'app/GridMover',
    'app/Tile',
    'app/Player',
    'app/Enemy',
], function (
    _,
    userInput,
    utils,
    map,
    GameObject,
    GridMover,
    Tile,
    Player,
    Enemy
) {    
    
    var game = {}

    game.init = function() {
        this.gameObjects = [];
        loadMap();
    }

    game.tick = function(delta) {
        _.each(this.gameObjects, function(gameObject) {
            gameObject.previousPosition.x = gameObject.aabb.x;
            gameObject.previousPosition.y = gameObject.aabb.y;
            gameObject.tick(delta);
        });

        var collisions = game.detectCollisions();

        _.each(collisions, (collision) => {
            game.resovleCollision(collision)
        });
    }
    game.draw = function(context, canvas) {
        context.fillStyle = "white";
        context.fillRect(0,0,canvas.width, canvas.height);

        _.each(this.gameObjects, function(gameObject) {
            gameObject.draw(context);
        });
    }

    game.detectTypes = function(collision, type1, type2, callback) {
        if (collision.obj1 instanceof type1 &&
            collision.obj2 instanceof type2) {
            callback(collision.obj1, collision.obj2);
        } else if (collision.obj1 instanceof type2 &&
                   collision.obj2 instanceof type1) {
            callback(collision.obj2, collision.obj1);
        }
    }

    game.resovleCollision = function(collision) {
        game.detectTypes(collision, Player, Tile, function(player, tile) {
            player.movement = null;
            tile.color = "#ff" + Math.round(Math.random() * 9) + "FFF";
        })

        game.detectTypes(collision, Player, Enemy, function(player, enemy) {
            var knockDirection = game.decideKnockDirection(enemy, player);
            player.hurt(knockDirection);
            enemy.color = "#ff" + Math.round(Math.random() * 9) + "FFF";
        })
    }

    game.decideKnockDirection = function(knocker, knockee) {
        var knockerIsOnGrid = (knocker.aabb.x % game.TILE_SIZE === 0 && knocker.aabb.y % game.TILE_SIZE === 0)
        var knockeeIsOnGrid = (knockee.aabb.x % game.TILE_SIZE === 0 && knockee.aabb.y % game.TILE_SIZE === 0)
        var knockeeTryingToMove = (Math.abs(knockee.getDirection().x) > 0 || Math.abs(knockee.getDirection().y) > 0)

        function invertDirection(dir) {
            return {
                x: dir.x * -1,
                y: dir.y * -1
            }
        }
        if (knockeeIsOnGrid && !knockeeTryingToMove) {
            //this means knocker is moving, use it's direction
            //knocker moves into knockee and pushes him back
            return knocker.getDirection();
        } else {
            //This means that knockee moved and
            //knockee can only be knocked in it's moving direction
            //invert knockees direction
            return invertDirection(knockee.getDirection());
        }
    }

    game.detectCollisions = function() {
        var collisions = [];

        function collisionFilterIgnore(comparator, comparee) {
            var condition1 = (comparator instanceof GridMover &&
                    comparee instanceof GridMover &&
                    (comparator.ignoreDynamicCollisions || comparee.ignoreDynamicCollisions))

            var condition2 = (comparator instanceof Enemy && comparee instanceof Enemy);
            return (condition1 || condition2)
        }

        _.each(this.gameObjects, (comparator) => {
            _.each(this.gameObjects, (comparee) => {

                if (comparator === comparee) return;

                if (utils.isAABBOverlappingAABB(comparator.aabb, comparee.aabb) &&
                    !collisionFilterIgnore(comparator, comparee)) {

                    comparator.aabb.x = comparator.previousPosition.x;
                    comparator.aabb.y = comparator.previousPosition.y;
                    comparee.aabb.x = comparee.previousPosition.x;
                    comparee.aabb.y = comparee.previousPosition.y;

                    collisions.push({
                        obj1: comparator,
                        obj2: comparee
                    });
                }
            })
        });

        return collisions;
    }

    game.addGameObject = function(obj) {
        this.gameObjects.push(obj);
    }.bind(game)
    
    game.TILE_SIZE = 16;

    window.aabb = utils.isAABBOverlappingAABB.bind(utils);
    window.game = game;

    window.addEventListener("keydown", function(e) {
        //console.log(e.keyCode)
        switch(e.keyCode) {
            case 67:
                game.enemy.hurt();
            break;
            case 73:
                game.player.hurt();
            break;
        }
    })

    function loadMap() {

        _.each(map.getMap(), function(row, rowIdx) {
          _.each(row, function(column, colIdx) {
            switch(column) {
              case 1:
                game.tile = new Tile({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.tile)
              break;
              case 2:
                game.player = new Player({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE
                  },
                  game: game,
                  input: userInput.getInput
                })
                game.gameObjects.push(game.player)
              break;
              case 3:
                game.enemy = new Enemy({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.enemy)
              break;
            }
          })
        })
    }

    return game;
});