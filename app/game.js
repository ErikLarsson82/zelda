define('app/game', [
    'underscore',
    'userInput',
    'utils',
    'app/map',
    'app/GameObject',
    'app/GridMover',
    'app/Tile',
    'app/Player',
    'app/Sword',
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
    Sword,
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
            game.resolveCollision(collision)
        });

        this.gameObjects = _.filter(this.gameObjects, (obj) => {
            return (!obj.markedForRemoval)
        })
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

    game.alignDynamicWithStatic = function(dynamic, static) {
        if (dynamic.aabb.x > dynamic.previousPosition.x) {
            dynamic.aabb.x = static.aabb.x - dynamic.aabb.width;
        } else if (dynamic.aabb.x < dynamic.previousPosition.x) {
            dynamic.aabb.x = static.aabb.x + static.aabb.width;
        }
        if (dynamic.aabb.y > dynamic.previousPosition.y) {
            dynamic.aabb.y = static.aabb.y - dynamic.aabb.height;
        } else if (dynamic.aabb.y < dynamic.previousPosition.y) {
            dynamic.aabb.y = static.aabb.y + static.aabb.height;
        }
    }

    game.resolveCollision = function(collision) {
        game.detectTypes(collision, Player, Tile, function(player, tile) {
            game.alignDynamicWithStatic(player, tile);
            player.movement = null;
        })

        game.detectTypes(collision, Enemy, Tile, function(enemy, tile) {
            game.alignDynamicWithStatic(enemy, tile);
            enemy.movement = null;
        })

        game.detectTypes(collision, Player, Enemy, function(player, enemy) {
            var knockDirection = game.decideKnockDirection(enemy, player);
            player.hurt(knockDirection);
        })

        game.detectTypes(collision, Sword, Enemy, function(sword, enemy) {
            var knockDirection = game.decideKnockDirection(sword, enemy);
            enemy.hurt(knockDirection);
            sword.destroy();
        })
    }

    game.decideKnockDirection = function(knocker, knockee) {
        var nooneIsMoving = (
            knocker.aabb.x === knocker.previousPosition.x &&
            knocker.aabb.y === knocker.previousPosition.y &&
            knockee.aabb.x === knockee.previousPosition.x &&
            knockee.aabb.y === knockee.previousPosition.y
        )
        if (nooneIsMoving) {
            return {
                x: knocker.getDirection().x,
                y: knocker.getDirection().y
            }
        }
        var knockerIsOnGrid = (knocker.aabb.x % game.TILE_SIZE === 0 && knocker.aabb.y % game.TILE_SIZE === 0)
        var knockeeIsOnGrid = (knockee.aabb.x % game.TILE_SIZE === 0 && knockee.aabb.y % game.TILE_SIZE === 0)
        var knockeeTryingToMove = knockee instanceof GridMover && (knockee.aabb.x !== knockee.previousPosition.x || knockee.aabb.y !== knockee.previousPosition.y)

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
            var isOneOfTheGridMoversIgnoring = (comparator instanceof GridMover &&
                    comparee instanceof GridMover &&
                    (comparator.ignoreDynamicCollisions || comparee.ignoreDynamicCollisions))

            var isAnyoneMarkedForRemoval = (comparator.markedForRemoval || comparee.markedForRemoval);

            var list = [
                [Enemy, Enemy],
                [Sword, Player],
                [Sword, Tile]
            ];
            var existsInFilterList = (_.filter(list, (pair) => {
                return ((comparator instanceof pair[0] && comparee instanceof pair[1]) ||
                        (comparator instanceof pair[1] && comparee instanceof pair[0]))
            }).length >= 1)

            return (isOneOfTheGridMoversIgnoring || isAnyoneMarkedForRemoval || existsInFilterList)
        }

        function alreadyCollided(obj1, obj2) {
            return (_.filter(collisions, (pair) => {
                return ((pair.obj1 === obj1 && pair.obj2 === obj2) ||
                        (pair.obj1 === obj2 && pair.obj2 === obj1))
            }).length >= 1);
        }

        _.each(this.gameObjects, (comparator) => {
            _.each(this.gameObjects, (comparee) => {

                if (comparator === comparee) return;

                if (utils.isAABBOverlappingAABB(comparator.aabb, comparee.aabb) &&
                    !collisionFilterIgnore(comparator, comparee) &&
                    !alreadyCollided(comparator, comparee)) {

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
              case 4:
                game.sword = new Sword({
                  aabb: {
                    x: colIdx * game.TILE_SIZE,
                    y: rowIdx * game.TILE_SIZE,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.sword)
              break;
            }
          })
        })
    }

    return game;
});