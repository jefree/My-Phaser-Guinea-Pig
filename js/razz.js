var Razz = function(game) {
  this.game = game;
  
  this.BODY_WIDTH = 25;
  this.BODY_HEIGHT = 61;

  this.LOOK_RIGHT_OFFSET_X = 25;
  this.LOOK_LEFT_OFFSET_X = 12;

  this.SPEED_X = 70;
};

Razz.prototype.onFloor = function() {
  return this.razz.body.touching.down || this.razz.body.onFloor()
}

Razz.prototype.on_up_down = function() {

  if (this.onFloor()){
    this.razz.body.velocity.y = -200;
    this.jump = true;
  }
}

Razz.prototype.create_cursors = function() {
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.cursors.up.onDown.add(this.on_up_down, this);
};

Razz.prototype.preload = function() {
  this.game.load.atlasJSONArray('razz', 'assets/img/chars/razz.png', 'assets/img/chars/razz.json');
};

Razz.prototype.create = function(level) {

  this.level = level;

  this.razz = game.add.sprite(0, 0, 'razz');
  this.razz.position.y = this.game.height - (this.level.map.tileHeight + this.razz.height);

  this.game.physics.enable(this.razz);

  this.razz.body.setSize(this.BODY_WIDTH, this.BODY_HEIGHT, this.LOOK_RIGHT_OFFSET_X, 0);
  this.razz.body.collideWorldBounds = true;

  this.razz.animations.add('right', ['right1.png', 'right2.png', 'right3.png', 'right4.png'], 8);
  this.razz.animations.add('left', ['left1.png', 'left2.png', 'left3.png', 'left4.png'], 8);

  this.razz.animations.add('jright', ['jright1.png', 'jright2.png', 'jright3.png'], 3);
  this.razz.animations.add('jleft', ['jleft1.png', 'jleft2.png', 'jleft3.png'], 3);

  this.razz.animations.add('pright', ['pright1.png', 'pright2.png', 'pright3.png', 'pright4.png'], 8);
  this.razz.animations.add('pleft', ['pleft1.png', 'pleft2.png', 'pleft3.png', 'pleft4.png'], 8);

  this.create_cursors();

};

Razz.prototype.update = function() {
  this.game.physics.arcade.collide(this.razz, this.level);

  if (this.onFloor()) {
    this.razz.body.velocity.x = 0
  }

  if (this.cursors.right.isDown) {
    this.razz.body.velocity.x = this.SPEED_X;
    this.razz.body.offset.x = this.LOOK_RIGHT_OFFSET_X;

    if (this.onFloor()) {
      this.razz.animations.play('right');
    }

  } 
  else if (this.cursors.left.isDown) {
    this.razz.body.velocity.x = -this.SPEED_X;
    this.razz.body.offset.x = this.LOOK_LEFT_OFFSET_X;

    if (this.onFloor()) {
      this.razz.animations.play('left');
    }

  }
  else {
    if (this.razz.animations.getAnimation('right').isPlaying) {
      this.razz.animations.stop('right');
    }
  }

  if (this.jump) {
    
    if (this.cursors.left.isDown) {
      this.razz.animations.play('jleft');
    }
    else if (this.cursors.right.isDown) {
      this.razz.animations.play('jright');
    }

    this.jump = false;
  }
};
