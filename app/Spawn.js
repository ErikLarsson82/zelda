define('app/Spawn', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Spawn extends GameObject {
        constructor(config) {
            super(config)
            this.name = "Spawn";
        }
        draw(context) {
            context.drawImage(images.checkpoint, this.aabb.x, this.aabb.y);
        }
    }

    return Spawn
});