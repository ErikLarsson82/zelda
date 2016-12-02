define('app/Sword', [
    'app/GameObject',
    'app/SwordVisual',
    'app/images'
], function(GameObject, SwordVisual, images) { 

    class Sword extends GameObject {
        constructor(config) {
            super(config)
            this.aabb = config.aabb;
            this.color = config.color || "yellow";
            this.direction = config.direction;
            this.timer = 20;
            game.addGameObject(new SwordVisual(config));
        }
        tick() {
            this.timer--;
            if (this.timer < 0) this.destroy()
        }
        getDirection() {
            return this.direction;
        }
        draw(context) {}
    }

    return Sword;
});