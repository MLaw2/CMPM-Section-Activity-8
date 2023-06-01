class title extends Phaser.Scene {
   constructor() {
      super('title');
   }

   preload() {
    this.load.path = "./assets/";
    this.load.image("rolypoly", "rolypoly.png");
    this.load.image("snail", "snail.png");
    this.load.image("fairy", "fairy.png");
   }

   create() {
    
    let rolypoly = this.add.image(this.game.config.width/2, this.game.config.height/2, "rolypoly").setScale(0.3).setAlpha(0);
    this.tweens.add({
        targets: rolypoly,
        duration: 1000,
        alpha: 1,
    });
    this.tweens.add({
        targets:rolypoly,
        duration: 700,
        yoyo: true,
        repeat: -1,
        angle: 30
    })
    this.tweens.add({
        targets: rolypoly,
        duration: 5000,
        x: -150
    })
    this.add.text(50, 50, "Title Screen! Go little buddy go").setFontSize(50);
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x150019);
    let darkrectangle = this.graphics.fillRect(this.game.config.width/2, 400, 300, 100); //topleft x, topleft y, width, height
    this.add.text(this.game.config.width/2, 800, "Test").setFontSize(50).setOrigin(0);
    
    this.time.delayedCall(800, () => {
        this.input.on('pointerdown', () => {
            this.scene.start('transition', {"level":0});
        });
    });
   }
}

class transition extends Phaser.Scene{
   nextLvl = 0;
   init(data) {
      this.nextLvl = data.level + 1;
   }

   constructor(){
        super("transition");
    }

   create() {
      let x = this.game.config.width / 2;
      let y = this.game.config.height / 2;

      let msg;
      switch (this.nextLvl) {
         case 1:
            msg = "Watch out for slugs!";
            break;
         case 2:
            msg = "Watch out for snails!";
            break;
         case 3:
            msg = "This is the last level!";
            break;
         default:
            console.log("Ruh roh, Raggy");
      }
      this.add.text(x, y, msg).setOrigin(0.5);

      this.input.on('pointerdown', () => this.scene.start(`level${this.nextLvl}`));
   }
}

class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }
    create(){
        this.add.text(400, 400, "level1 - imagine a roly poly or something");
        this.add.text(400, 500, "press left to fail, press right to move on");
        let s = 1;
        this.input.keyboard.on("keydown-LEFT", ()=>{
            this.scene.start('failure', { "level" : s });
        })
        this.input.keyboard.on("keydown-RIGHT",()=>{
            this.scene.start('transition', {"level":s})
        })
    }
}

class level2 extends Phaser.Scene{
    constructor(){
        super('level2');
    }
    create(){
        this.add.text(400, 400, "level2 - imagine a fairy or something");
        this.add.text(400, 500, "press left to fail, press right to move on");
        let s = 2;
        this.input.keyboard.on("keydown-LEFT", ()=>{
            this.scene.start('failure', { "level" : s });
        })
        this.input.keyboard.on("keydown-RIGHT",()=>{
            this.scene.start('transition', {"level":s})
        })
    }
}

class level3 extends Phaser.Scene{
    constructor(){
        super('level3');
    }
    create(){
        this.add.text(400, 400, "level3 - a horde of roly polies and faries approach your castle!");
        this.add.text(400, 500, "press left to fail, press right to move on");
        let s = 3;
        this.input.keyboard.on("keydown-LEFT", ()=>{
            this.scene.start('failure', { "level" : s });
        })
        this.input.keyboard.on("keydown-RIGHT",()=>{
            // this.scene.start('transition', {"level":s})
            this.scene.start("victory");
        })
    }
}

class victory extends Phaser.Scene{
    constructor(){
        super('victory');
    }
    create(){
        this.add.text(400, 400, "yipeee");
        this.time.delayedCall(800, () => {
            this.input.on('pointerdown', () => {
                this.scene.start('title');
            });
        });
    }
}

class failure extends Phaser.Scene{
   lvl = 0;
   init(data) {
      this.lvl = data.level;
   }
    constructor(){
        super('failure');
    }
    create(){
        this.add.text(400, 400, "try again");
        this.input.on('pointerdown', () => this.scene.start(`level${this.lvl}`));
    }
}

let config={
    scale:{
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    backgroundColor: 0x999999,
    scene: [title, transition, level1, level2, level3, victory, failure],
    title: "Roly Poly Storyboard",
}

let game = new Phaser.Game(config);