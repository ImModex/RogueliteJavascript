import { gameManager } from "./game.js";

const startButton = document.getElementById('btn-start');
const settingsButton = document.getElementById('btn-settings');
const backButton = document.getElementById('btn-back');

const buttons = [ startButton, settingsButton, backButton ];

const startMenu = document.getElementById('menu');
const settingsMenu = document.getElementById('settings');
const canvasElement = document.getElementById('canvas');

const menus = [ startMenu, settingsMenu, canvasElement ];
let activeMenu = startMenu;

const volumeSlider = document.getElementById('volume');

let paused = true;
let started = false;

window.onkeydown = (event) => {
    if(event.key == 'Escape') {
        switch(activeMenu) {
            case canvasElement:
                togglePause();
                gameManager.togglePause();
                break;
            case startMenu: {
                if(!started) return;
                togglePause();
                gameManager.togglePause();
                break;
            }
            case settingsMenu: {
                if(!started) {
                    hideAllExcept(startMenu);
                    return;
                }
                togglePause();
                gameManager.togglePause();
                break;
            }
        }
    }
}

const hideAllExcept = (exception) => {
    menus.filter(menu => menu !== exception).forEach(menu => {
        menu.style.display = 'none';
    });
    exception.style.display = 'block';
    activeMenu = exception;
}

const togglePause = () => {
    paused = !paused;
    hideAllExcept(paused ? startMenu : canvasElement);
}

startButton.onclick = () => {
    if(!started) {
        gameManager.start();
        started = true;
    } else {
        gameManager.restart();
    }
    togglePause();
}

settingsButton.onclick = () => {
    hideAllExcept(settingsMenu);
}

backButton.onclick = () => {
    hideAllExcept(startMenu);
}

volumeSlider.value = gameManager.soundManager.loadVolume() * 100;
volumeSlider.oninput = (event) => {
    gameManager.soundManager.setVolume(event.target.value / 100);
}

window.addEventListener("playerDeath", () => {
    togglePause();
    gameManager.togglePause();    
});

buttons.forEach(button => {
    button.onmouseover = () => {
        gameManager.soundManager.play("menu_hover");
    }
});

window.onload = () => {
    gameManager.soundManager.play("background_music");
}