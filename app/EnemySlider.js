define('app/EnemySlider', [
    'app/GridMover',
    'app/Particle',
    'app/Heart',
    'app/images',
    'SpriteSheet',
    'utils',
    'underscore'
], function(GridMover, Particle, Heart, images, SpriteSheet, utils, _) { 

    class EnemySlider extends GridMover {
        constructor(config) {
            super(config)
            this.horizontal = config.horizontal;
            this.oneway = true;
            this.aabb = config.aabb;
            this.color = config.color || "blue";
            this.hurtSpeed = 2;
            this.speed = 1;
            this.hp = 2;
            this.spriteSheet = SpriteSheet.new(images.enemy2, {
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
                if (this.horizontal) {
                    if (this.oneway) {
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
                        if (up.possible) {
                            this.newMove(up.direction, 1);   
                        } else {
                            this.oneway = false;
                        }
                    } else {
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
                        if (down.possible) {
                            this.newMove(down.direction, 1);   
                        } else {
                            this.oneway = true;
                        }
                    }   
                } else {
                    if (this.oneway) {
                        var left = {
                            possible: legalMove({
                                x: this.aabb.x - game.TILE_SIZE * 2,
                                y: this.aabb.y
                            }),
                            direction: {
                                x: -this.speed,
                                y: 0
                            }
                        };
                        if (left.possible) {
                            this.newMove(left.direction, 1);   
                        } else {
                            this.oneway = false;
                        }
                    } else {
                        var right = {
                            possible: legalMove({
                                x: this.aabb.x + game.TILE_SIZE * 2,
                                y: this.aabb.y
                            }),
                            direction: {
                                x: this.speed,
                                y: 0
                            }
                        };
                        if (right.possible) {
                            this.newMove(right.direction, 1);   
                        } else {
                            this.oneway = true;
                        }
                    }   
                }
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

    return EnemySlider;
});