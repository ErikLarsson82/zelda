define('app/Player', [
    'app/GridMover',
    'app/Sword',
    'utils',
    'underscore'
], function(GridMover, Sword, utils, _) { 

    class Player extends GridMover {
        constructor(config) {
            super(config)
            this.input = config.input;
            this.aabb = config.aabb;
            this.color = config.color || "red";
            this.hurtSpeed = 2;
            this.invulnerableTimer = 0;
            this.swordTimer = 0;
            this.latestDirection = { x: 0, y: 1 }
        }
        hurt(direction) {
            var normalized = utils.normalizeVector(direction, 1)
            this.ignoreDynamicCollisions = true;
            this.newMove(normalized, 4)
            this.invulnerableTimer = 70;
        }
        tick() {
            var pad = this.input(0);

            this.invulnerableTimer--;
            this.swordTimer--;

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
        spawnSword() {
            var swordConfig = {
              aabb: {
                x: this.aabb.x + (game.TILE_SIZE * 2 * this.latestDirection.x),
                y: this.aabb.y + (game.TILE_SIZE * 2 * this.latestDirection.y),
                width: game.TILE_SIZE * 2,
                height: game.TILE_SIZE * 2,
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
                var speed = 1.4
                var x1 = (pad.buttons[15].pressed) ? speed : 0;
                var x2 = (pad.buttons[14].pressed) ? -speed : 0;
                var y1 = (pad.buttons[13].pressed) ? speed : 0;
                var y2 = (pad.buttons[12].pressed) ? -speed : 0;

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