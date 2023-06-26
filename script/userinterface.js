const emptyHeart = new Image();
emptyHeart.src = "./img/health/emptyHearts.png";

const halfRedHeart = new Image();
halfRedHeart.src = "./img/health/halfRedHeart.png";

const redHeart = new Image();
redHeart.src = "./img/health/redHeart.png";

const hpUi = new Image();
hpUi.src = "./img/health/hpUi.png";

/*

const myFont = new FontFace('My Font', 'url(./css/font/DungeonFont.ttf)');

myFont.load().then((font) => {
    document.fonts.add(font);
    console.log('Font loaded');
});



*/
export function drawHealthBar(canvas, player) {
    //canvas.drawLayer.drawImage(img, x, y, width, height);
    let currentX = canvas.canvasBoundaries.left + 5;
    let currentY = 5;
    let i = 0;

    canvas.drawLayer.drawImage(hpUi, currentX, currentY, hpUi.width*5, hpUi.height*5);
    currentX += hpUi.width*5 + 20;

    if(player.healthPoints <= 0) return;

    for(; i < Math.floor(player.healthPoints); ++i) {
        // ganze Herzen
        canvas.drawLayer.drawImage(redHeart, currentX, currentY, redHeart.width*5, redHeart.height*5);
        currentX += redHeart.width*5;
    }
    if(i != player.healthPoints) {
        // halbes Herz
        canvas.drawLayer.drawImage(halfRedHeart, currentX, currentY, halfRedHeart.width*5, halfRedHeart.height*5);
        currentX += halfRedHeart.width*5;
        i += 1;
    }
    for(; i < player.maxHealth; ++i) {
        // leere Herzen
        canvas.drawLayer.drawImage(emptyHeart, currentX, currentY, emptyHeart.width*5, emptyHeart.height*5);
        currentX += emptyHeart.width*5;
    }
}

export function drawEnemyHealthbar(canvas, enemy) {
    let offsetX = 40;
    let offsetY = 30;

    let hp = enemy.healthPoints / enemy.maxHealth * 100;

    canvas.drawLayer.lineWidth = 3;
    canvas.drawLayer.strokeStyle = "#333";
    canvas.drawLayer.fillStyle = "green";
    canvas.drawLayer.fillRect(enemy.position.x + offsetX, enemy.position.y - offsetY, hp, 20);
    canvas.drawLayer.strokeRect(enemy.position.x + offsetX, enemy.position.y - offsetY, 100, 20);
}

export function drawWaveCounter(canvas, waveCounter){
    canvas.drawLayer.font = "48px m6x11";
    canvas.drawLayer.strokeStyle = '#23162C';
    canvas.drawLayer.lineWidth = 15;
    
    canvas.drawLayer.fillStyle = '#FFFFFF';
    canvas.drawLayer.strokeText('WAVE : ' + waveCounter, canvas.width - 220, 50)
    canvas.drawLayer.fillText('WAVE : ' + waveCounter ,canvas.width - 220, 50);
}