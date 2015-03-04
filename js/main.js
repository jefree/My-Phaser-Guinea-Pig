var game = new Phaser.Game(780, 455, Phaser.CANVAS, 'canvas', {preload: preload, create: create, update: update});
var razz = new Razz(game);

function preload() {
  game.load.atlasJSONHash('maptiles', 'assets/img/tiles/maptiles.png', 'assets/img/tiles/maptiles.json')
  game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);

  razz.preload();
}

var layer, signals;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  var map = game.add.tilemap('map');
  map.addTilesetImage('maptiles','maptiles');

  map.setCollisionBetween(1, 6);

  layer = map.createLayer('Capa de Patrones 1');
  layer.resizeWorld();

  signals = game.add.group();

  razz.create(layer, signals);

  game.camera.follow(razz.razz);
  game.physics.arcade.gravity.y = 300;

  game.input.onDown.add(function() {

    var worldX = Math.floor(game.input.worldX / 65) * 65;
    var worldY = Math.floor(game.input.worldY / 65) * 65;

    var signal = game.add.sprite(worldX, worldY, 'maptiles', 5);
    game.physics.arcade.enable(signal);
    signal.body.allowGravity = false;

    signals.add(signal);

  }, this);
 
}

function update() {

  razz.update();

}
