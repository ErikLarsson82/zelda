define('app/Teleport', [
    'app/GameObject'
], function(GameObject) { 

    class Teleport extends GameObject {
        constructor(config) {
            super(config)
            this.name = "teleport" + config.id;
            this.linkSpawnDirection = config.linkSpawnDirection;
            this.destination = config.destination;
            this.color = config.color || "#333333";
        }
    }

    return Teleport
});