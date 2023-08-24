import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    // Cargar recursos necesarios para el menú (botones, fondo, etc.)
    this.load.image("background", "assets/sprites/menu/bg.png");
    this.load.image("logo", "assets/sprites/menu/logo.png");
    this.load.image("startButton", "assets/sprites/menu/ButtonPlay.png");
    this.load.image("startButtonSelected", "assets/sprites/menu/ButtonPlaySelected.png");
    this.load.image("instructionButton", "assets/sprites/menu/Buttoninst.png");
    this.load.image("instructionButtonSelected", "assets/sprites/menu/ButtonInstSelect.png");
    // this.load.image('startButton', 'ruta-del-botón.png');
  }

  create() {
    // Agregar elementos visuales al menú (fondo, botones, texto, etc.)
    const background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "background");
    background.setDisplaySize(800, 600);

    // eslint-disable-next-line no-unused-vars
    const logo = this.add.image(this.cameras.main.width / 2, 150, "logo");

    const startButton = this.addButton(this.cameras.main.width / 2, 300, "startButton", "startButtonSelected");
    const instructionsButton = this.addButton(this.cameras.main.width / 2, 360, "instructionButton", "instructionButtonSelected");

    let selectedButton = startButton;

    startButton.on("pointerover", function () {
      if (selectedButton !== startButton) {
        startButton.setTexture("startButtonSelected");
        instructionsButton.setTexture("instructionButton");
        selectedButton = startButton;
      }
    });

    instructionsButton.on("pointerover", function () {
      if (selectedButton !== instructionsButton) {
        instructionsButton.setTexture("instructionButtonSelected");
        startButton.setTexture("startButton");
        selectedButton = instructionsButton;
      }
    });

    this.input.keyboard.on("keydown", function (event) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        if (selectedButton === startButton) {
          selectedButton.setTexture("startButton");
          selectedButton = instructionsButton;
          instructionsButton.setTexture("instructionButtonSelected");
        } else {
          selectedButton.setTexture("instructionButton");
          selectedButton = startButton;
          startButton.setTexture("startButtonSelected");
        }
      }
    });
  }

  addButton(x, y, image, selectedImage) {
    const button = this.add.sprite(x, y, image);
    button.selectedImage = selectedImage;
    button.setDisplaySize(240, 150);
    button.setInteractive();
    return button;
  }
}
