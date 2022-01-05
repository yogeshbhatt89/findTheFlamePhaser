import Phaser from "phaser";
import Flame from "../entity/Flame";
import Ground from "../entity/Ground";
import Player from "../entity/Player";
export default class StageOneScene extends Phaser.Scene {
  constructor() {
    super("StageOneScene");
  }

  preload() {
    // this.load.image("background", "assets/backgrounds/background.png");
    this.load.spritesheet("stickman", "assets/spriteSheets/stickman2.png", {
      frameWidth: 66,
      frameHeight: 100,
    });
    this.load.spritesheet("flame", "assets/spriteSheets/flame.png", {
      frameWidth: 150,
      frameHeight: 200,
    });
    this.load.image("borderHorizontal", "assets/sprites/borderHorizontal.png");
    this.load.image("borderVertical", "assets/sprites/borderVertical.png");
    this.load.image("spikes", "assets/sprites/spikes.png");
    this.load.image("platform", "assets/sprites/platform.png");

    this.load.audio("jump", "assets/audio/jump.wav");
    // this.load.audio("death", "assets/audio/death.wav");
    // this.load.audio("backgroundMusic", "assets/audio/backgroundMusic.mp3");
  }

  createBorderVertical(x, y) {
    this.groundGroupVertical.create(x, y, "borderVertical");
  }
  createBorderHorizontal(x, y) {
    this.groundGroupHorizontal.create(x, y, "borderHorizontal");
  }
  createPlatform(x, y) {
    this.groundGroupPlatform.create(x, y, "platform").setScale(0.55);
  }
  // createSpikes(x, y) {
  //   this.groundGroupSpikes.create(x, y, "spikes").setScale(0.3);
  // }
  createFlames(x, y) {
    this.groupFlames.create(x, y, "flame").setScale(0.3);
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
    this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNumbers("stickman", { start: 3, end: 7 }),
      frameRate: 45,
      repeat: -1,
    });
    this.anims.create({
      key: "flame",
      frames: this.anims.generateFrameNumbers("flame", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: 5000,
    });
  }
  create() {
    this.createAnimations();

    // this.add.image(-160, 0, "background").setOrigin(0).setScale(0.5);
    this.player = new Player(this, 50, 568, "stickman").setScale(0.5);
    this.groupFlames = this.physics.add.group({
      classType: Flame,
      allowGravity: false,
      immovable: true,
    });
    this.createFlames(50, 50);

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
    this.groundGroupPlatform = this.physics.add.group({
      classType: Ground,
      allowGravity: false,
      immovable: true,
    });
    this.createPlatform(200, 550);
    this.createPlatform(450, 500);
    this.createPlatform(800, 400);
    this.createPlatform(600, 300);
    this.createPlatform(150, 300);
    // this.createPlatform(0, 400);
    this.createPlatform(150, 180);
    // this.createPlatform(600, 200);
    // this.createPlatform(500, 500);
    this.groundGroupSpikes = this.physics.add.group({
      classType: Ground,
      allowGravity: false,
      immovable: true,
    });
    // this.createSpikes(700, 500);
    // this.createSpikes(500, 500);
    // this.createSpikes(430, 500);
    // this.createSpikes(250, 500);
    // this.createSpikes(700, 300);
    // this.createSpikes(500, 300);
    // this.createSpikes(400, 300);
    // this.createSpikes(330, 300);
    // this.createSpikes(250, 300);
    // this.createSpikes(700, 150);
    this.physics.add.collider(this.player, this.groundGroupHorizontal);
    this.physics.add.collider(this.player, this.groundGroupVertical);
    this.physics.add.collider(this.player, this.groundGroupPlatform);

    this.physics.add.collider(
      this.groundGroupSpikes,
      this.player,
      this.killPlayer,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.groupFlames,
      this.gotFlame,
      null,
      this
    );
    // using keyboard arrows Creating  cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    this.jumpSound = this.sound.add("jump");

    // this.deathSound = this.sound.add("death");
    // this.backgroundMusic = this.sound.add("backgroundMusic", 0.5, true);
    // this.backgroundMusic.play();
  }

  gotFlame() {
    this.scene.start("StageTwoScene");
  }

  update(time, delta) {
    this.player.update(this.cursors, this.jumpSound);
  }
}
