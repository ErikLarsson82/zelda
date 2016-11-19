define('app/Sword', [
    'app/GameObject'
], function(GameObject) { 

    class Sword extends GameObject {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "yellow";
        }
    }

    return Sword;
});