define('app/Enemy', [
    'app/GridMover',
    'app/Heart',
    'utils',
    'underscore'
], function(GridMover, Heart, utils, _) { 

    class Enemy extends GridMover {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "blue";
            this.hurtSpeed = 2;
            this.speed = 1;
            this.hp = 2;
        }
        hurt(direction) {
            this.hp--;
            if (this.hp > 0) {
                this.ignoreDynamicCollisions = true;
                var normalized = utils.normalizeVector(direction, 7)
                this.newMove(normalized, 3)
            } else {
                this.destroy();
                var heart = new Heart({
                  aabb: {
                    x: this.aabb.x,
                    y: this.aabb.y,
                    width: this.game.TILE_SIZE,
                    height: this.game.TILE_SIZE
                  },
                  game: this.game
                })
                this.game.gameObjects.push(heart);
            }
        }
        tick() {
            if (!this.movement) {
                this.ignoreDynamicCollisions = false;
                var direction;
                function legalMove(pos) {
                    return !game.detectTile(pos);
                }
                var up = {
                    possible: legalMove({
                        x: this.aabb.x,
                        y: this.aabb.y - game.TILE_SIZE * 2
                    }),
                    direction: {
                        x: 0,
                        y: -this.speed
                    }
                };
                var down = {
                    possible: legalMove({
                        x: this.aabb.x,
                        y: this.aabb.y + game.TILE_SIZE * 2
                    }),
                    direction: {
                        x: 0,
                        y: this.speed
                    }
                };
                var left = {
                    possible: legalMove({
                        x: this.aabb.x - game.TILE_SIZE * 2,
                        y: this.aabb.y
                    }),
                    direction: {
                        x: this.speed,
                        y: 0
                    }
                };
                var right = {
                    possible: legalMove({
                        x: this.aabb.x + game.TILE_SIZE * 2,
                        y: this.aabb.y
                    }),
                    direction: {
                        x: -this.speed,
                        y: 0
                    }
                };
                var options = [];
                if (up.possible) options.push(up.direction);
                if (down.possible) options.push(down.direction);
                if (left.possible) options.push(left.direction);
                if (right.possible) options.push(right.direction);
                var direction = {
                    x: 0, y: 0
                }
                if (options.length > 0) {
                    direction = options[Math.floor(Math.random() * options.length)];
                };
                this.newMove(direction, 1);   
            }
            super.tick();
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
        }
    }

    return Enemy;
});