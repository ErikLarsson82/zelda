define('app/Player', [
    'app/GridMover',
    'underscore'
], function(GridMover, _) { 

    class Player extends GridMover {
        constructor(config) {
            super(config)
            this.input = config.input;
            this.aabb = config.aabb;
            this.color = config.color || "red";
        }
        tick() {
            var pad = this.input(0);
            
            //Remove eventual diagonal d-pad
            if (Math.abs(pad.axes[0]) === 1) pad.axes[1] = 0;

            this.makeDecision(pad);
            super.tick();
        }
        makeDecision(pad) {
            if (
                (
                    pad.buttons[12].pressed ||
                    pad.buttons[13].pressed ||
                    pad.buttons[14].pressed ||
                    pad.buttons[15].pressed
                ) && this.movement === null
            ) {
                var x1 = (pad.buttons[15].pressed) ? 1 : 0;
                var x2 = (pad.buttons[14].pressed) ? -1 : 0;
                var y1 = (pad.buttons[13].pressed) ? 1 : 0;
                var y2 = (pad.buttons[12].pressed) ? -1 : 0;

                var direction = {
                    x: x1 + x2,
                    y: y1 + y2
                }
                this.newMove(direction);
            }
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
        }
    }

    return Player;
});