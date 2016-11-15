
class GameObject {
    constructor(config) {
        this.game = config.game;
        this.aabb = config.aabb;
        this.color = config.color || "#444444";
    }
    tick() {}
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
    }
}

define('app/GameObject', [], function() { return GameObject })