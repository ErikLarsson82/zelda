define('app/Player', [
    'app/GridMover',
    'app/Sword',
    'utils',
    'underscore'
], function(GridMover, Sword, utils, _) { 

    class Player extends GridMover {
        constructor(config) {
            super(config);
            this.hp = 6;
            this.input = config.input;
            this.aabb = config.aabb;
            this.color = config.color || "red";
            this.hurtSpeed = 2;
            this.speed = 1.4;
            this.invulnerableTimer = 0;
            this.swordTimer = 0;
            this.teleportTimer = 100;
            this.latestDirection = { x: 0, y: 1 }

            if (config.initialMove) {
                this.initialMove = function() {
                    var direction = { x: 0, y: 0 }
                    if (config.initialMove === 0)
                        direction = { x: 0, y: -this.speed }
                    if (config.initialMove === 1)
                        direction = { x: this.speed, y: 0 }
                    if (config.initialMove === 2)
                        direction = { x: 0, y: this.speed }
                    if (config.initialMove === 3)
                        direction = { x: -this.speed, y: 0 }
                    this.newMove(direction, 1);
                    this.teleportTimer = 100;
                }
            }
        }
        hurt(direction) {
            var normalized = utils.normalizeVector(direction, 1)
            this.ignoreDynamicCollisions = true;
            this.newMove(normalized, 4)
            this.invulnerableTimer = 70;
            this.hp--;
        }
        tick() {
            var pad = this.input(0);

            this.invulnerableTimer--;
            this.teleportTimer--;
            this.swordTimer--;

            if (this.initialMove) {
                this.initialMove();
                this.initialMove = null;
            }

            if (this.invulnerableTimer < 0 && this.swordTimer < 0) {
                this.ignoreDynamicCollisions = false;
                
                this.makeDecision(pad);
                super.tick();
            } else {
                super.tick();
            }
            var direction = this.getDirection();
            if (direction.x !== 0 || direction.y !== 0)
                this.latestDirection = direction;

        }
        collideWithTeleport() {
            return (this.teleportTimer < 0);
        }
        spawnSword() {
            var heightMultiplication = (Math.abs(this.latestDirection.y) > 0) ? 2 : 1;
            var heightAddition = (this.latestDirection.y < 0) ? -game.TILE_SIZE : 0;
            var normalizedLatest = utils.normalizeVector(this.latestDirection, game.TILE_SIZE)
            var swordConfig = {
              aabb: {
                x: this.aabb.x + normalizedLatest.x * 2,
                y: this.aabb.y + normalizedLatest.y + heightAddition,// heightMultiplication,
                width: game.TILE_SIZE * 2,
                height: game.TILE_SIZE * heightMultiplication,
              },
              direction: {
                x: this.latestDirection.x,
                y: this.latestDirection.y
              },
              game: game
            }
            game.addGameObject(new Sword(swordConfig))
        }
        makeDecision(pad) {
            if (this.movement !== null) return;

            if (pad.buttons[2].pressed && this.swordTimer < 0) {
                this.spawnSword();
                this.swordTimer = 20;
                return;
            }

            if (
                pad.buttons[12].pressed ||
                pad.buttons[13].pressed ||
                pad.buttons[14].pressed ||
                pad.buttons[15].pressed
            ) {
                var x1 = (pad.buttons[15].pressed) ? this.speed : 0;
                var x2 = (pad.buttons[14].pressed) ? -this.speed : 0;
                var y1 = (pad.buttons[13].pressed) ? this.speed : 0;
                var y2 = (pad.buttons[12].pressed) ? -this.speed : 0;

                //Remove eventual diagonal d-pad
                if (Math.abs(x1) || Math.abs(x2)) {
                    y1 = 0;
                    y2 = 0;
                }

                var direction = {
                    x: x1 + x2,
                    y: y1 + y2
                }
                if (direction.x === 0 && direction.y === 0) return;
                this.newMove(direction, 1);
            }
        }
        draw(context) {

            context.fillStyle = (this.invulnerableTimer < 0) ? this.color : "black";
            context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
        }
    }

    return Player;
});