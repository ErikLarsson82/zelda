define('app/game', [
    'underscore',
    'userInput',
    'utils',
    'app/map',
    'app/GameObject',
    'app/GridMover',
    'app/Tile',
    'app/Teleport',
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
    Teleport,
    Player,
    Sword,
    Enemy
) {    
    
    var game = {}

    game.init = function(destination) {
        this.gameObjects = [];
        loadMap(destination);

        var tele = this.findGameObject("teleport" + destination.teleport)
        
        if (!tele) {
            console.warn('Problem with destination! Trying ', destination)
            return;
        }
        
        var verticalOffset = (tele.linkSpawnDirection === 2) ? this.TILE_SIZE : 0;
        var horizontalOffset = 0;
        if (tele.linkSpawnDirection === 3)
            horizontalOffset = -this.TILE_SIZE;
        if (tele.linkSpawnDirection === 1)
            horizontalOffset = this.TILE_SIZE;
        this.player = new Player({
          aabb: {
            x: tele.aabb.x + horizontalOffset,
            y: tele.aabb.y + verticalOffset,
            width: this.TILE_SIZE * 2,
            height: this.TILE_SIZE
          },
          game: this,
          initialMove: tele.linkSpawnDirection,
          input: userInput.getInput
        })
        this.gameObjects.push(this.player)
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

        context.save();
        context.translate(-game.TILE_SIZE * 2, game.TILE_SIZE * 2);

        _.each(this.gameObjects, function(gameObject) {
            gameObject.draw(context);
        });
        context.restore();

        context.fillStyle = "black";
        context.fillRect(0,0,canvas.width, game.TILE_SIZE * 4);        
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

        game.detectTypes(collision, Player, Teleport, function(player, teleport) {
            if (player.collideWithTeleport()) {
                game.init(teleport.destination);
            }
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
        } else if (knockerIsOnGrid) {
            // If the knocker is on the grid, the knockee can both be moving away
            // or towards the knocker, but will still be the one moving - and always away from the knocker
            var diffVector;
            if (Math.abs(knockee.getDirection().x) > 0) {
                if (knocker.aabb.x > knockee.aabb.x) {
                    diffVector = {
                        x: -1,
                        y: 0
                    }
                } else {
                    diffVector = {
                        x: 1,
                        y: 0
                    }
                }
            } else {
                if (knocker.aabb.y > knockee.aabb.y) {
                    diffVector = {
                        x: 0,
                        y: -1
                    }
                } else {
                    diffVector = {
                        x: 0,
                        y: 1
                    }
                }
            }
            return diffVector;
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

    game.findGameObject = function(name) {
        return _.find(this.gameObjects, function(obj) {
            return obj.name === name;
        })
    }.bind(game)
    
    game.TILE_SIZE = 32;

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

    function loadMap(destination) {

        _.each(map.getMap(destination.map), function(row, rowIdx) {
          _.each(row, function(column, colIdx) {
            if (!column) return;
            switch(column.type) {
              case "Tile":
                game.tile = new Tile({
                  aabb: {
                    x: colIdx * game.TILE_SIZE * 2,
                    y: rowIdx * game.TILE_SIZE * 2,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.tile)
              break;
              case "Enemy":
                game.enemy = new Enemy({
                  aabb: {
                    x: colIdx * game.TILE_SIZE * 2,
                    y: rowIdx * game.TILE_SIZE * 2,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.enemy)
              break;
              case "Sword":
                game.sword = new Sword({
                  aabb: {
                    x: colIdx * game.TILE_SIZE * 2,
                    y: rowIdx * game.TILE_SIZE * 2,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  game: game
                })
                game.gameObjects.push(game.sword)
              break;
              case "Teleport":
                var teleport = new Teleport({
                  aabb: {
                    x: colIdx * game.TILE_SIZE * 2,
                    y: rowIdx * game.TILE_SIZE * 2,
                    width: game.TILE_SIZE * 2,
                    height: game.TILE_SIZE * 2
                  },
                  id: column.id,
                  linkSpawnDirection: column.direction,
                  destination: column.destination,
                  game: game
                })
                game.gameObjects.push(teleport)
              break;
            }
          })
        })
    }

    return game;
});