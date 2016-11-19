
class GameObject {
    constructor(config) {
        this.game = config.game;
        this.aabb = config.aabb;
        this.markedForRemoval = false;
        this.ignoreDynamicCollisions = false;
        this.previousPosition = { x: config.aabb.x, y: config.aabb.y }
        this.color = config.color || "#444444";
    }
    tick() {}
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.aabb.x, this.aabb.y, this.aabb.width, this.aabb.height);
    }
    destroy() {
        this.markedForRemoval = true;
    }
}

define('app/GameObject', [], function() { return GameObject })