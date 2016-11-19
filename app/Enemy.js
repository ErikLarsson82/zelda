define('app/Enemy', [
    'app/GridMover',
    'utils',
    'underscore'
], function(GridMover, utils, _) { 

    class Enemy extends GridMover {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "blue";
            this.hurtSpeed = 2;
            this.speed = 0.1;
        }
        hurt(direction) {
            this.ignoreDynamicCollisions = true;
            var normalized = utils.normalizeVector(direction, 7)
            this.newMove(normalized, 3)
        }
        tick() {
            if (!this.movement) {
                this.ignoreDynamicCollisions = false;
                var direction = {
                    x: 0,
                    y: -0.1 //(Math.random() < 0.5) ? this.speed : -this.speed
                }
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