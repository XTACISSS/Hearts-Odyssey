import Phaser from "phaser";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });

    this.selectedButton = null;
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

    // Añadimos los botones
    const startButton = this.addButton(this.cameras.main.width / 2, 280, "startButton", "startButtonSelected");
    const instructionsButton = this.addButton(this.cameras.main.width / 2, 360, "instructionButton", "instructionButtonSelected");

    // Al hacer click en el boton jugar iniciara la escena de GameScene
    // startButton.on("pointerdown", () => {
    //   this.scene.start("GameScene");
    // });

    let selectedButton = startButton;

    // Creamos el efecto para que cambie de textura el boton al pasar el puntero
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

    // Creamos el efecto para que cambie la textura del boton al cambiar con las flechas del teclado
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

    this.input.keyboard.on("keydown-ENTER", () => {
      if (selectedButton === startButton) {
        this.scene.start("GameScene");
      }
    });

    this.changeSceneGame(startButton, selectedButton);
  }

  // Funcion para cambiar la escena dependiendo del boton presionado
  changeSceneGame(startButton, instructionsButton) {
    startButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    instructionsButton.on("pointerdown", () => {

    });
  }

  // Creamos la funcion para añadir los botones
  addButton(x, y, image, selectedImage) {
    const button = this.add.sprite(x, y, image);
    button.selectedImage = selectedImage;
    button.setDisplaySize(240, 150);
    button.setInteractive();
    return button;
  }
}
