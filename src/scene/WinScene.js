import Phaser from "phaser";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }
  preload() {
    this.load.image("winImage", "assets/backgrounds/winImage.png");
  }
  create() {
    this.add.image(0, 0, "winImage").setOrigin(0);
    this.input.on(
      "pointerup",
      function () {
        this.sound.removeByKey("backgroundMusic");
        this.scene.start("StartScene");
      },
      this
    );
  }
}
