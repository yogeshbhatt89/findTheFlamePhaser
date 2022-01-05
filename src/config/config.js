import Phaser from "phaser";
import StageOneScene from "../scene/StageOneScene";
import StageThreeScene from "../scene/StageThreeScene";
import StageTwoScene from "../scene/StageTwoScene";
import StartScene from "../scene/StartScene";
import WinScene from "../scene/WinScene";
export default {
  type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
  // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 800, // Game width in pixels
  height: 600, // Game height in pixels

  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      // debug: true,
    },
  },
  scene: [StartScene, StageOneScene, StageTwoScene, StageThreeScene, WinScene],
  // scene: [WinScene, StartScene],
};
