define('app/EnemyStopperTile', [
    'app/GameObject'
], function(GameObject) { 

    class EnemyStopperTile extends GameObject {
        constructor(config) {
            super(config)
        }
        draw() {}
    }

    return EnemyStopperTile
});