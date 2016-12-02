define('app/Tile', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Tile extends GameObject {
        constructor(config) {
            super(config)
            this.color = config.color || "#999999";
        }
        draw(context) {
            super.draw(context);
            context.drawImage(images.tile, this.aabb.x, this.aabb.y);
        }
    }

    return Tile
});