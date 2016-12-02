define('app/WinTile', [
    'app/Tile',
    'app/images'
], function(Tile, images) { 

    class WinTile extends Tile {
        constructor(config) {
            super(config)
            this.color = config.color || "#999999";
        }
        draw(context) {
            super.draw(context);
            context.drawImage(images.wintile, this.aabb.x, this.aabb.y);
        }
    }

    return WinTile
});