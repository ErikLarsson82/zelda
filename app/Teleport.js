define('app/Teleport', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class Teleport extends GameObject {
        constructor(config) {
            super(config)
            this.name = "teleport" + config.id;
            this.linkSpawnDirection = config.linkSpawnDirection;
            this.destination = config.destination;
            this.color = config.color || "#333333";
        }
        draw(context) {
            context.drawImage(images.caveentrance, this.aabb.x, this.aabb.y);
        }
    }

    return Teleport
});