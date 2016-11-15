define('app/Player', [
    'app/GameObject',
    'userInput'
], function(GameObject, userInput) { 

    class Player extends GameObject {
        constructor(config) {
            super(config)
            this.game = config.game;
            this.aabb = config.aabb;
            this.color = config.color || "red";
        }
        tick() {
            const pad = userInput.getInput(0);
            if (pad.buttons[2].pressed) { // z
                this.aabb.x = 10;
            }
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
        }
    }

    return Player;
});