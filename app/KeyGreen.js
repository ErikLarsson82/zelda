define('app/KeyGreen', [
    'app/GameObject',
    'app/images'
], function(GameObject, images) { 

    class KeyGreen extends GameObject {
        constructor(config) {
            super(config)
            this.name = "KeyGreen";
        }
        draw(context) {
            context.drawImage(images.key_green, this.aabb.x, this.aabb.y);
        }
    }

    return KeyGreen
});