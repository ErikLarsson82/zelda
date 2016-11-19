define('app/Sword', [
    'app/GameObject'
], function(GameObject) { 

    class Sword extends GameObject {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "yellow";
            this.direction = config.direction;
            this.timer = 20;
        }
        tick() {
            this.timer--;
            if (this.timer < 0) this.destroy()
        }
        getDirection() {
            return this.direction;
        }
    }

    return Sword;
});