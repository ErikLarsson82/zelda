define('app/Spawn', [
    'app/GameObject'
], function(GameObject) { 

    class Spawn extends GameObject {
        constructor(config) {
            super(config)
            this.name = "Spawn";
        }
        draw() {}
    }

    return Spawn
});