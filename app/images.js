define('app/images', ['SpriteSheet'], function(SpriteSheet) {
  var heart = new Image();
  heart.src = "./assets/images/heart.png";

  /*var player_side = new Image();
  player_side.src = "./assets/images/player_side.png";

  var player_walking = SpriteSheet.new(player_side, {
    frames: [90, 90, 90, 90, 90, 90],
    x: 0,
    y: 0,
    width: 64,
    height: 128,
    restart: true,
  });*/

  return {
    heart: heart,
  }
})