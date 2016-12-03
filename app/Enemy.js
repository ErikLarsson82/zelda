define('app/Enemy', [
    'app/GridMover',
    'app/Particle',
    'app/Heart',
    'app/images',
    'SpriteSheet',
    'utils',
    'underscore'
], function(GridMover, Particle, Heart, images, SpriteSheet, utils, _) { 

    class Enemy extends GridMover {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "blue";
            this.hurtSpeed = 2;
            this.speed = 1;
            this.hp = 2;
            this.spriteSheet = SpriteSheet.new(images.enemy1, {
                frames: [200, 200],
                x: 0,
                y: 0,
                width: 64,
                height: 64,
                restart: true,
                autoPlay: true
              });
        }
        spawnBlood() {
            _.each(new Array(10), () => {
              var particleSettings = {
                aabb: {
                  x: this.aabb.x + game.TILE_SIZE,
                  y: this.aabb.y + game.TILE_SIZE,
                },
                velocity: {
                  x: (Math.random() - 0.5) * 4,
                  y: (Math.random() - 0.5) * 4,
                },
                image: images.enemy_blood,
                lifetime: 70,
              }
              game.addGameObject(new Particle(particleSettings));
            })
        }
        hurt(direction) {
            this.hp--;
            this.spawnBlood();
            if (this.hp > 0) {
                this.ignoreDynamicCollisions = true;
                var normalized = utils.normalizeVector(direction, 7)
                this.newMove(normalized, 3)
            } else {
                this.destroy();
                if (Math.random() > 0.33) return;
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
            this.spriteSheet.tick(1000/60);
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
            context.save();
            context.translate(this.aabb.x, this.aabb.y);
            this.spriteSheet.draw(context);
            context.restore();
        }
    }

    return Enemy;
});