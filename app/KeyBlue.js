define('app/KeyBlue', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class KeyBlue extends GameObject {
        constructor(config) {
            super(config)
            this.name = "KeyBlue";
        }
        draw(context) {
            context.drawImage(images.key_blue, this.aabb.x, this.aabb.y);
        }
    }

    return KeyBlue
});