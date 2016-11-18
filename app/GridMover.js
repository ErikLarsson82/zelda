define('app/GridMover', [
    'app/GameObject',
    'underscore'
], function(GameObject, _) { 

    class Movement {
        constructor(originalPos, direction) {
            this.originalPos = _.clone(originalPos);
            this.direction = direction;
        }
        tick(obj) {
            var condition1 = this.direction.x > 0 && Math.round(obj.aabb.x) >= this.originalPos.x + obj.game.TILE_SIZE;
            var condition2 = this.direction.x < 0 && Math.round(obj.aabb.x) <= this.originalPos.x - obj.game.TILE_SIZE;

            var condition3 = this.direction.y > 0 && Math.round(obj.aabb.y) >= this.originalPos.y + obj.game.TILE_SIZE;
            var condition4 = this.direction.y < 0 && Math.round(obj.aabb.y) <= this.originalPos.y - obj.game.TILE_SIZE;
            
            if (condition1 || condition2 || condition3 || condition4) {
                return null;
            } else {
                obj.aabb.x = obj.aabb.x + this.direction.x;
                obj.aabb.y = obj.aabb.y + this.direction.y;
                return this;
            }
        }
    }

    class GridMover extends GameObject {
        constructor(config) {
            super(config)
            this.movement = null;
        }
        newMove(direction) {
            this.movement = new Movement(_.clone(this.aabb), direction)
        }
        tick() {
            if (this.movement) {
                this.movement = this.movement.tick(this);
            }
            super.tick();
        }
        draw(context) {
            super.draw(context)
        }
    }

    return GridMover;
});