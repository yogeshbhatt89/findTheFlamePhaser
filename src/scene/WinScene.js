import Phaser from "phaser";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }
  preload() {
    this.load.image("winImage", "assets/backgrounds/winImage.jpg");
  }
  create() {
    this.add.image(0, 0, "winImage").setOrigin(0);
  }
}
