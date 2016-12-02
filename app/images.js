define('app/images', ['SpriteSheet'], function(SpriteSheet) {
  var heart = new Image();
  heart.src = "./assets/images/heart.png";

  var GUI_emptyheart = new Image();
  GUI_emptyheart.src = "./assets/images/GUI_emptyheart.png";

  var GUI_heart = new Image();
  GUI_heart.src = "./assets/images/GUI_heart.png";

  var tile = new Image();
  tile.src = "./assets/images/wall.png";

  var wintile = new Image();
  wintile.src = "./assets/images/winwall.png";

  var key_red = new Image();
  key_red.src = "./assets/images/key_red.png";

  var key_green = new Image();
  key_green.src = "./assets/images/key_green.png";

  var key_blue = new Image();
  key_blue.src = "./assets/images/key_blue.png";

  var door_red = new Image();
  door_red.src = "./assets/images/lock_red.png";

  var door_green = new Image();
  door_green.src = "./assets/images/lock_green.png";

  var door_blue = new Image();
  door_blue.src = "./assets/images/lock_blue.png";

  var enemy1 = new Image();
  enemy1.src = "./assets/images/enemy1.png";

  var swordeffect_up = new Image();
  swordeffect_up.src = "./assets/images/swordeffect_up.png";

  var swordeffect_down = new Image();
  swordeffect_down.src = "./assets/images/swordeffect_down.png";

  var swordeffect_left = new Image();
  swordeffect_left.src = "./assets/images/swordeffect_left.png";

  var swordeffect_right = new Image();
  swordeffect_right.src = "./assets/images/swordeffect_right.png";

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
    door_red: door_red,
    door_green: door_green,
    door_blue: door_blue,
    key_red: key_red,
    key_green: key_green,
    key_blue: key_blue,
    swordeffect_up: swordeffect_up,
    swordeffect_down: swordeffect_down,
    swordeffect_left: swordeffect_left,
    swordeffect_right: swordeffect_right,
    enemy1: enemy1,
    heart: heart,
    GUI_emptyheart: GUI_emptyheart,
    GUI_heart: GUI_heart,
    tile: tile,
    wintile: wintile,
    player_walking_up: player_walking_up,
    player_walking_down: player_walking_down,
    player_walking_left: player_walking_left,
    player_walking_right: player_walking_right,
  }
})