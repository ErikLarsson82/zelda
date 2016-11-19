define('app/Enemy', [
    'app/GridMover',
    'underscore'
], function(GridMover, _) { 

    class Enemy extends GridMover {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "blue";
            this.speed = 0.1;
        }
        hurt() {
            this.ignoreDynamicCollisions = true;
            var direction = {
                x: 0,
                y: 0
            }
            this.newMove(direction, 5)
        }
        tick() {
            if (!this.movement) {
                this.ignoreDynamicCollisions = false;
                var direction = {
                    x: 0,
                    y: (Math.random() < 0.5) ? this.speed : -this.speed
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