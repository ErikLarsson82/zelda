define('app/DoorGreen', [
    'app/Tile',
    'app/images'
], function(Tile, images) { 

    class DoorGreen extends Tile {
        constructor(config) {
            super(config)
            this.name = "DoorGreen";
        }
        draw(context) {
            context.drawImage(images.door_green, this.aabb.x, this.aabb.y);
        }
    }

    return DoorGreen
});