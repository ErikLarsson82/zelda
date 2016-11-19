define('app/GridMover', [
    'app/GameObject',
    'underscore'
], function(GameObject, _) { 

    class Movement {
        constructor(startPosition, direction, tiles) {
            this.startPosition = _.clone(startPosition);
            this.direction = direction;
            this.tiles = tiles;
        }
        tick(obj) {
            var condition1 = this.direction.x > 0 && obj.aabb.x >= this.startPosition.x + (obj.game.TILE_SIZE * this.tiles);
            var condition2 = this.direction.x < 0 && obj.aabb.x <= this.startPosition.x - (obj.game.TILE_SIZE * this.tiles);
            var condition3 = this.direction.y > 0 && obj.aabb.y >= this.startPosition.y + (obj.game.TILE_SIZE * this.tiles);
            var condition4 = this.direction.y < 0 && obj.aabb.y <= this.startPosition.y - (obj.game.TILE_SIZE * this.tiles);
            
            if (condition1 || condition2 || condition3 || condition4) {
                function align(pos, startPosition, direction, tiles) {
                    if (direction === 0) return pos;
                    return (direction > 0) ?
                        startPosition + (obj.game.TILE_SIZE * tiles) :
                        startPosition - (obj.game.TILE_SIZE * tiles);
                }
                obj.aabb.x = align(obj.aabb.x, this.startPosition.x, this.direction.x, this.tiles)
                obj.aabb.y = align(obj.aabb.y, this.startPosition.y, this.direction.y, this.tiles)
                
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
        newMove(direction, tiles) {
            var startPosition;
            if (this.movement) {
                //There is already a movement, that means this move starts
                //off the grid. Retrieve the start position from the current
                //movement
                startPosition = this.movement.startPosition;
            } else {
                //New fresh move, the gameobject is on the grid
                startPosition = _.clone(this.aabb)
            }
            this.movement = new Movement(startPosition, direction, tiles)
        }
        getDirection() {
            if (this.movement) {
                return this.movement.direction;
            } else {
                return {
                    x: 0,
                    y: 0
                }
            }
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