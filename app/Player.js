define('app/Player', [
    'app/GameObject',
    'underscore'
], function(GameObject, _) { 

    class Movement {
        constructor(originalPos, direction) {
            this.originalPos = _.clone(originalPos);
            this.direction = direction;
        }
        tick(obj, pad) {
            var condition1 = this.direction.x === 1 && obj.aabb.x >= this.originalPos.x + obj.game.TILE_SIZE;
            var condition2 = this.direction.x === -1 && obj.aabb.x <= this.originalPos.x - obj.game.TILE_SIZE;

            var condition3 = this.direction.y === 1 && obj.aabb.y >= this.originalPos.y + obj.game.TILE_SIZE;
            var condition4 = this.direction.y === -1 && obj.aabb.y <= this.originalPos.y - obj.game.TILE_SIZE;
            
            if (condition1 || condition2 || condition3 || condition4) {
                obj.behaviour = new Decision();
            } else {
                obj.aabb.x = obj.aabb.x + this.direction.x;
                obj.aabb.y = obj.aabb.y + this.direction.y;
            }
        }
    }
    class Decision {
        tick(obj, pad) {
            if (
                pad.buttons[12].pressed ||
                pad.buttons[13].pressed ||
                pad.buttons[14].pressed ||
                pad.buttons[15].pressed
            ) {
                var x1 = (pad.buttons[15].pressed) ? 1 : 0;
                var x2 = (pad.buttons[14].pressed) ? -1 : 0;
                var y1 = (pad.buttons[13].pressed) ? 1 : 0;
                var y2 = (pad.buttons[12].pressed) ? -1 : 0;

                var direction = {
                    x: x1 + x2,
                    y: y1 + y2
                }
                obj.behaviour = new Movement(obj.aabb, direction);
                obj.behaviour.tick(obj, pad);

            }
            //if (Math.abs(pad.axes[0]) === 1 || Math.abs(pad.axes[1]) === 1) {
            //}
        }
    }

    class Player extends GameObject {
        constructor(config) {
            super(config)
            this.input = config.input;
            this.aabb = config.aabb;
            this.color = config.color || "red";
            this.behaviour = new Decision();
        }
        tick() {
            var pad = this.input(0);
            //console.log(pad)
            //Remove eventual diagonal d-pad
            if (Math.abs(pad.axes[0]) === 1) pad.axes[1] = 0;
            this.behaviour.tick(this, pad);
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
        }
    }

    return Player;
});