import Phaser from "phaser";
import Ground from "../entity/Ground";
import Player from "../entity/Player";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }
  preload() {
    this.load.spritesheet("stickman", "assets/spriteSheets/stickman2.png", {
      frameWidth: 66,
      frameHeight: 100,
    });
    this.load.image("borderHorizontal", "assets/sprites/borderHorizontal.png");
    this.load.image("borderVertical", "assets/sprites/borderVertical.png");
    this.load.image("startScene", "assets/backgrounds/menuScreen.png");
    this.load.image("door", "assets/sprites/door.png");
  }
  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("stickman", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "stickman", frame: 3 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idle",
      frames: [{ key: "stickman", frame: 2 }],
      frameRate: 10,
    });
  }
  createBorderVertical(x, y) {
    this.groundGroupVertical.create(x, y, "borderVertical");
  }
  createBorderHorizontal(x, y) {
    this.groundGroupHorizontal.create(x, y, "borderHorizontal");
  }
  create() {
    this.createAnimations();
    // this.cameras.main.setBounds(0, 0, 800, 600);
    this.add.image(27, 0, "startScene").setOrigin(0);

    this.player = new Player(this, 50, 570, "stickman").setScale(0.5);
    // this.player.setCollideWorldBounds(true);
    // 450, 550
    this.door = new Ground(this, 450, 545, "door");
    // this.door.allowGravity(false);
    this.groundGroupVertical = this.physics.add.group({
      classType: Ground,
      allowGravity: false,
      immovable: true,
    });

    this.createBorderVertical(-20, 300);
    this.createBorderVertical(820, 300);
    this.groundGroupHorizontal = this.physics.add.group({
      classType: Ground,
      allowGravity: false,
      immovable: true,
    });

    this.createBorderHorizontal(400, -30);
    this.createBorderHorizontal(400, 620);

    this.physics.add.collider(this.player, this.groundGroupHorizontal);
    this.physics.add.collider(this.player, this.groundGroupVertical);
    this.physics.add.collider(this.door, this.groundGroupHorizontal);
    this.physics.add.collider(
      this.player,
      this.door,
      function () {
        this.scene.start("StageOneScene");
      },
      null,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {
    this.player.update(this.cursors);
  }
}
