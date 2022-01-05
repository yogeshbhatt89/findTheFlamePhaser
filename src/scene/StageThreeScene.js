import Phaser from "phaser";
import Flame from "../entity/Flame";
import Ground from "../entity/Ground";
import Player from "../entity/Player";
export default class StageThreeScene extends Phaser.Scene {
  constructor() {
    super("StageThreeScene");
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
    this.load.audio("death", "assets/audio/death.wav");
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
  createSpikes(x, y) {
    this.groundGroupSpikes.create(x, y, "spikes").setScale(0.3);
  }
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
      frameRate: 38,
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

    this.player = new Player(this, 400, 570, "stickman").setScale(0.5);
    this.groupFlames = this.physics.add.group({
      classType: Flame,
      allowGravity: false,
      immovable: true,
    });
    this.createFlames(750, 50);

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
    this.createPlatform(600, 500);
    this.createPlatform(340, 500);
    this.createPlatform(800, 400);
    this.createPlatform(600, 300);
    this.createPlatform(150, 300);
    this.createPlatform(0, 400);
    this.createPlatform(150, 200);
    this.createPlatform(400, 95);
    this.createPlatform(600, 100);
    this.groundGroupSpikes = this.physics.add.group({
      classType: Ground,
      allowGravity: false,
      immovable: true,
    });
    this.createSpikes(700, 500);
    this.createSpikes(500, 500);
    this.createSpikes(430, 500);
    this.createSpikes(250, 500);
    this.createSpikes(700, 300);
    this.createSpikes(475, 300);
    this.createSpikes(230, 120);
    this.createSpikes(500, 100);
    this.createSpikes(400, 300);
    this.createSpikes(330, 300);
    this.createSpikes(250, 300);
    this.createSpikes(700, 150);
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

    this.jumpSound = this.sound.add("jump", { volume: 0.07 });

    this.deathSound = this.sound.add("death", { volume: 0.07 });
  }

  killPlayer(player) {
    const thisScene = this.scene.get("StageThreeScene");

    player.alive = false;

    setTimeout(function () {
      player.alive = true;

      thisScene.registry.destroy();
      thisScene.events.off();
      thisScene.scene.restart();
    }, 200);
  }
  gotFlame() {
    this.scene.start("WinScene");
  }

  update(time, delta) {
    this.player.update(this.cursors, this.jumpSound, this.deathSound);
  }
}
