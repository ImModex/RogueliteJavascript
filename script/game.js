import { GameManager } from "./gameManager.js";
import { ObjectManager } from "./utility.js";

const objectManager = new ObjectManager();

// Import gamemanager and start game
const gameManager = new GameManager();
gameManager.start();