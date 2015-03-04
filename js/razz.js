var Razz = function(game) {
  this.game = game;
  
  this.BODY_WIDTH = 25;
  this.BODY_HEIGHT = 61;

  this.LOOK_RIGHT_OFFSET_X = 25;
  this.LOOK_LEFT_OFFSET_X = 12;

  this.SPEED_X = 120;
};

Razz.prototype.preload = function() {
  this.game.load.atlasJSONArray('razz', 'assets/img/chars/razz.png', 'assets/img/chars/razz.json');
};

Razz.prototype.create = function(level, signals) {

  this.level = level;
  this.signals = signals;

  this.razz = game.add.sprite(0, 0, 'razz', 'right1.png');
  this.razz.y = this.game.height - (this.level.map.tileHeight + this.razz.height);
  //this.razz.x = 750;

  this.game.physics.enable(this.razz);

  this.razz.body.setSize(this.BODY_WIDTH, this.BODY_HEIGHT, this.LOOK_RIGHT_OFFSET_X, 0);
  this.razz.body.collideWorldBounds = true;

  this.razz.body.velocity.x = this.SPEED_X;

  this.razz.animations.add('right', ['right1.png', 'right2.png', 'right3.png', 'right4.png'], 8);
  this.razz.animations.add('left', ['left1.png', 'left2.png', 'left3.png', 'left4.png'], 8);

  this.razz.animations.add('jright', ['jright1.png', 'jright2.png', 'jright3.png'], 3);
  this.razz.animations.add('jleft', ['jleft1.png', 'jleft2.png', 'jleft3.png'], 3);

  this.razz.animations.add('pright', ['pright1.png', 'pright2.png', 'pright3.png', 'pright4.png'], 8);
  this.razz.animations.add('pleft', ['pleft1.png', 'pleft2.png', 'pleft3.png', 'pleft4.png'], 8);

  this.razz.play('right', null, true);

};

Razz.prototype.update = function() {  

  this.razz.body.velocity.x = this.SPEED_X;
  this.game.physics.arcade.collide(this.razz, this.level);

  this.game.physics.arcade.overlap(this.razz, this.signals, function(razz, signal) {

    this.signals.remove(signal, true);

    this.jump();
  }, null, this);
};

Razz.prototype.jump = function() {
  this.razz.body.velocity.y = -300;  
}
