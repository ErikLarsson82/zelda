define('app/SwordVisual', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class SwordVisual extends GameObject {
        constructor(config) {
            super(config)
            this.direction = config.direction;
            this.timer = 20;
            this.speed = 0.7;
        }
        tick() {
            this.timer--;
            if (this.direction.x < 0)
                this.aabb.x = this.aabb.x - this.speed;
            if (this.direction.x > 0)
                this.aabb.x = this.aabb.x + this.speed;
            if (this.direction.y < 0)
                this.aabb.y = this.aabb.y - this.speed;
            if (this.direction.y > 0)
                this.aabb.y = this.aabb.y + this.speed;
            if (this.timer < 0) this.destroy()
        }
        getDirection() {
            return this.direction;
        }
        draw(context) {
            if (this.direction.x < 0)
                context.drawImage(images.swordeffect_left, this.aabb.x, this.aabb.y);
            if (this.direction.x > 0)
                context.drawImage(images.swordeffect_right, this.aabb.x, this.aabb.y);
            if (this.direction.y < 0)
                context.drawImage(images.swordeffect_up, this.aabb.x, this.aabb.y);
            if (this.direction.y > 0)
                context.drawImage(images.swordeffect_down, this.aabb.x, this.aabb.y);
        }
    }

    return SwordVisual;
});