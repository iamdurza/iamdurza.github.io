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
    this.load.image("bg","assets/background.png")
  }
 
  create() {
    console.log("Loading...");
    this.state.start("Play")
    }
}

class Play {
  create() {
    console.log("Entered Play ");
  }
}

var game = new Phaser.Game(320,568);
game.state.add("Boot",Boot);
game.state.add("Load",Load);
game.state.start("Boot");



