define('app/DoorRed', [
    'app/Tile',
    'app/images'
], function(Tile, images) { 

    class DoorRed extends Tile {
        constructor(config) {
            super(config)
            this.name = "DoorRed";
        }
        draw(context) {
            context.drawImage(images.door_red, this.aabb.x, this.aabb.y);
        }
    }

    return DoorRed
});