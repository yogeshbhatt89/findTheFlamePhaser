import Phaser from "phaser";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }
  preload() {
    this.load.spritesheet("winscene", "assets/spriteSheets/winscene.png", {
      frameWidth: 800,
      frameHeight: 600,
    });
  }

  create() {
    this.anims.create({
      key: "winscene",
      frames: this.anims.generateFrameNumbers("winscene", {
        start: 0,
        end: 14,
      }),
      frameRate: 13,
      repeat: 0,
    });
    this.bgImage = this.add.sprite(400, 300, "winscene");

    this.input.on(
      "pointerup",
      function () {
        this.sound.removeByKey("backgroundMusic");
        this.scene.start("StartScene");
      },
      this
    );
    this.bgImage.anims.play("winscene");

    let style = { font: "bold 23px Arial", fill: "#black" };
    this.add.text(
      10,
      550,
      "Thank you for saving this world! To replay the game click anywhere.",
      style
    );
  }
  update() {}
}
