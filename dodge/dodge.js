var C = {
  "game": {
    "width": 320,
    "height": 568
  },
  "bg": {
    "width": 320,
    "height": 568,
    "xspeed": 0,
    "yspeed": 400,
    "file": "assets/background.png"
  },
  "p": {
    "file": "assets/player.png",
    "width": 46,
    "height": 64,
    "frames": 2 ,
    "startx": 160,
    "starty": 500,
    "speed": 5

  },
  "d": {
      "file": "assets/dodger.png",
      "width": 64,
      "height": 64,
      "frames": 13,
      "fps": 10,
      "startx": 160,
      "starty": 25,
      "speed": 20 
  }
}

class Boot {
  preload() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }
  create() {
    this.state.start("Load")
  }
}

class Load {
  preload() {
    console.log("Loading");
    this.load.image("bg",C.bg.file)
    this.load.spritesheet("player",C.p.file,C.p.width,C.p.height,C.p.frames);
    this.load.spritesheet("dodge",C.d.file,C.d.width,C.d.height,C.d.frames);
  }
  
  create() {
    console.log("Loading...");
    this.state.start("Play")
    }
}


class Play {
  create() {
    console.log("Entered Play ");
    
    this.bg = this.add.tileSprite(0,0,C.bg.width,C.bg.height,"bg");
    this.bg.autoScroll(C.bg.xspeed,C.bg.yspeed);
    
    this.player = this.add.sprite(C.p.startx,C.p.starty,"player");
    this.player.anchor.set(0.5,0.5);
    this.player.smoothed = false;
    this.player.scale.set(1);
    this.player.animations.add("anim");
    this.player.animations.play("anim",C.d.fps,true);

    this.dodge = this.add.sprite(C.d.startx,C.d.starty,"dodge");
    this.dodge.anchor.set(0.5,0.5);
    this.dodge.smoothed = false;
    this.dodge.scale.set(1);
    this.dodge.animations.add("anim");
    this.dodge.animations.play("anim",C.d.fps,true);
  
    this.points = 0

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= C.p.speed;
    }
    if (this.cursors.right.isDown) {
      this.player.x += C.p.speed;
    }
    if (this.dodge.y > this.game.height) {
      this.dodge.y = C.d.starty
      let px = (C.d.width * this.dodge.scale.x) / 2;
      let max = C.game.width - px
      this.dodge.x = randInt(px,max);
    }
      this.dodge.y += C.d.speed;
      
    if (checkOverlap(this.dodge, this.player)) {
        this.points += 1;
    }

  }
  render() {
    game.debug.text("points: " + this.points, 4, 16);
  }
  
}

function restart() {
  game.state.start("Boot")
}

function checkOverlap(spriteA, spriteB) {
  
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function randInt(min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var game = new Phaser.Game(C.game.width,C.game.height);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.add("Play",Play);
game.state.start("Boot");

