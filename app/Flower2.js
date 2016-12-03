define('app/Flower2', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Flower2 extends GameObject {
        constructor(config) {
            super(config)
            this.name = "Flower2";
        }
        draw(context) {
            context.drawImage(images.flower2, this.aabb.x, this.aabb.y);
        }
    }

    return Flower2
});