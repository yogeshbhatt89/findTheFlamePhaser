import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.alive = true;

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
  }
  // movement for left and right
  updateMovement(cursors, deathSound) {
    // Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-270);
      if (this.body.touching.down) {
        this.play("run", true);
      }
    }

    // Move right
    else if (cursors.right.isDown) {
      if (this.body.touching.down) {
        this.play("run", true);
      }
      this.setVelocityX(270);
    }
    // movement animation
    else if (this.alive === false) {
      this.play("dead", true);
      deathSound.play();
    }
    // Neutral (no movement)
    else {
      this.play("idle");
      this.setVelocityX(0);
    }
  }
  // movement for jump
  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-400);

      jumpSound.play();
    }
  }
  // when player is in air
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("jump");
    }
  }
 
  // Check which controller button is being pushed and execute movement & animation
  update(cursors, jumpSound, deathSound) {
    // << INSERT CODE HERE >>
    this.updateMovement(cursors, deathSound);
    this.updateJump(cursors, jumpSound);
  }
}
