define('app/Tile', [
    'app/GameObject'
], function(GameObject) { 

    class Tile extends GameObject {
        constructor(config) {
            super(config)
            this.color = config.color || "#999999";
        }
    }

    return Tile
});