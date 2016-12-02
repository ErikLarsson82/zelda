define('app/DoorBlue', [
    'app/Tile',
    'app/images'
], function(Tile, images) { 

    class DoorBlue extends Tile {
        constructor(config) {
            super(config)
            this.name = "DoorBlue";
        }
        draw(context) {
            context.drawImage(images.door_blue, this.aabb.x, this.aabb.y);
        }
    }

    return DoorBlue
});