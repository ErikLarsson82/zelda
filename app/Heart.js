define('app/Heart', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Heart extends GameObject {
        constructor(config) {
            super(config)
            this.name = "Heart";
        }
        draw(context) {
            context.drawImage(images.heart, this.aabb.x - game.TILE_SIZE / 2, this.aabb.y - game.TILE_SIZE);
        }
    }

    return Heart
});