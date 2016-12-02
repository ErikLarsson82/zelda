define('app/KeyRed', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class KeyRed extends GameObject {
        constructor(config) {
            super(config)
            this.name = "KeyRed";
        }
        draw(context) {
            context.drawImage(images.key_red, this.aabb.x, this.aabb.y);
        }
    }

    return KeyRed
});