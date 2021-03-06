define('app/Player', [
    'app/GridMover',
    'app/Particle',
    'app/Sword',
    'utils',
    'underscore',
    'app/images'
], function(GridMover, Particle, Sword, utils, _, images) { 

    class Player extends GridMover {
        constructor(config) {
            super(config);
            this.hp = config.hp;
            this.input = config.input;
            this.aabb = config.aabb;
            this.color = config.color || "red";
            this.hurtSpeed = 6;
            this.speed = 4;
            this.invulnerableTimer = 0;
            this.swordTimer = 0;
            this.teleportTimer = 20;
            this.latestDirection = { x: 0, y: 1 }
            this.walkingSpritesheet = images.player_walking_up;
            this.swordScheduled = false;

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
                    this.teleportTimer = 20;
                }
            }
        }
        spawnParticles() {
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
                image: images.player_blood,
                lifetime: 70,
              }
              game.addGameObject(new Particle(particleSettings));
            })
        }
        hurt(direction) {
            this.spawnParticles();
            var normalized = utils.normalizeVector(direction, this.hurtSpeed)
            this.ignoreDynamicCollisions = true;
            this.newMove(normalized, 3)
            this.invulnerableTimer = 30;
            this.hp--;
        }
        addHp(full) {
            if (full) {
                this.hp = 6;
            } else if (this.hp < 6) {
                this.hp++;
            }
        }
        tick() {
            var pad = this.input(0);
            this.walkingSpritesheet.tick(1000/60);
            
            if (pad.buttons[2].pressed && this.swordTimer < 0) {
                this.swordScheduled = true;
            }
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
            var normalizedLatest = utils.normalizeVector(this.latestDirection, game.TILE_SIZE)
            var yOffset = (normalizedLatest.y > 0) ? 0 : game.TILE_SIZE;

            var swordConfig = {
              aabb: {
                x: this.aabb.x + normalizedLatest.x * 2,
                y: this.aabb.y + normalizedLatest.y - yOffset,
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
            this.walkingSpritesheet.pause();

            if (this.swordScheduled) {
                this.spawnSword();
                this.swordTimer = 30;
                this.swordScheduled = false;
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
                this.setNewWalkingSpritesheet(direction);
                this.walkingSpritesheet.play();
                this.newMove(direction, 1);
            }
        }
        setNewWalkingSpritesheet(direction) {
            if (direction.x < 0) {
                this.walkingSpritesheet = images.player_walking_left;
            }
            if (direction.x > 0) {
                this.walkingSpritesheet = images.player_walking_right;
            }
            if (direction.y < 0) {
                this.walkingSpritesheet = images.player_walking_up;
            }
            if (direction.y > 0) {
                this.walkingSpritesheet = images.player_walking_down;
            }
        }
        draw(context) {

            context.save();
            context.translate(this.aabb.x, this.aabb.y - game.TILE_SIZE);
            this.walkingSpritesheet.draw(context);
            context.restore();
        }
    }

    return Player;
});