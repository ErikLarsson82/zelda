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
            context.drawImage(images.heart, this.aabb.x, this.aabb.y);
        }
    }

    return Heart
});