define('app/Flower1', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Flower1 extends GameObject {
        constructor(config) {
            super(config)
            this.name = "Flower1";
        }
        draw(context) {
            context.drawImage(images.flower1, this.aabb.x, this.aabb.y);
        }
    }

    return Flower1
});