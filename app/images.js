define('app/images', ['SpriteSheet'], function(SpriteSheet) {
  var heart = new Image();
  heart.src = "./assets/images/heart.png";

  var player_up = new Image();
  player_up.src = "./assets/images/player_up.png";

  var walkspeed = 200;
  var player_walking_up = SpriteSheet.new(player_up, {
    frames: [walkspeed, walkspeed],
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    restart: true,
    autoPlay: true
  });

  var player_down = new Image();
  player_down.src = "./assets/images/player_down.png";

  var player_walking_down = SpriteSheet.new(player_down, {
    frames: [walkspeed, walkspeed],
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    restart: true,
    autoPlay: true
  });

  var player_left = new Image();
  player_left.src = "./assets/images/player_left.png";

  var player_walking_left = SpriteSheet.new(player_left, {
    frames: [walkspeed, walkspeed],
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    restart: true,
    autoPlay: true
  });

  var player_right = new Image();
  player_right.src = "./assets/images/player_right.png";

  var player_walking_right = SpriteSheet.new(player_right, {
    frames: [walkspeed, walkspeed],
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    restart: true,
    autoPlay: true
  });

  return {
    heart: heart,
    player_walking_up: player_walking_up,
    player_walking_down: player_walking_down,
    player_walking_left: player_walking_left,
    player_walking_right: player_walking_right,
  }
})