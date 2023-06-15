const emptyHeart = new Image();
emptyHeart.src = "./img/health/emptyHearts.png";

const halfRedHeart = new Image();
halfRedHeart.src = "./img/health/halfRedHeart.png";

const redHeart = new Image();
redHeart.src = "./img/health/redHeart.png";

const hpUi = new Image();
hpUi.src = "./img/health/hpUi.png";

export function drawHealthBar(canvas, player) {
    //canvas.drawLayer.drawImage(img, x, y, width, height);
    let currentX = canvas.canvasBoundaries.left + 5;
    let currentY = 5;
    let i = 0;

    canvas.drawLayer.drawImage(hpUi, currentX, currentY, hpUi.width*5, hpUi.height*5);
    currentX += hpUi.width*5 + 20;

    if(player.healthPoints <= 0) return;

    for(; i < Math.floor(player.healthPoints); ++i) {
        console.log(player.healthPoints, currentX);
        // ganze Herzen
        canvas.drawLayer.drawImage(redHeart, currentX, currentY, redHeart.width*5, redHeart.height*5);
        currentX += redHeart.width*5;
    }
    if(i != player.healthPoints) {
        // halbes Herz
        canvas.drawLayer.drawImage(halfRedHeart, currentX, currentY, halfRedHeart.width*5, halfRedHeart.height*5);
        currentX += halfRedHeart.width*5;
        return;
    }
    for(; i < player.maxHealth; ++i) {
        // leere Herzen
        canvas.drawLayer.drawImage(emptyHeart, currentX, currentY, emptyHeart.width*5, emptyHeart.height*5);
        currentX += emptyHeart.width*5;
    }
}