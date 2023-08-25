import Phaser from "phaser";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";
// import { SceneB } from "./scenes/sceneB";
import { width, height } from "./constants/screen";

const config = {
  type: Phaser.AUTO,
  width,
  height,
  backgroundColor: "#000000",
  parent: "phaser-example",
  scene: [MainMenuScene, GameScene]
};

// eslint-disable-next-line
const game = new Phaser.Game(config);