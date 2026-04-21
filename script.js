var runsound = new Audio("rb.mp3");
var jumpsound = new Audio("jump.mp3");
var deadsound = new Audio("die.mp3");
var backmusic = new Audio("Komiku_-_12_-_Bicycle.mp3");

// Preloading images to stop blinking
var preloadedImages = [];
function preload() {
    for (var i = 1; i <= 10; i++) {
        var rImg = new Image(); rImg.src = "Run (" + i + ").png"; preloadedImages.push(rImg);
        var jImg = new Image(); jImg.src = "Jump (" + i + ").png"; preloadedImages.push(jImg);
        var dImg = new Image(); dImg.src = "Dead (" + i + ").png"; preloadedImages.push(dImg);
    }
}
preload();

var rW = 0;
var rI = 1;
var jW = 0;
var jI = 1;
var bmt = 450;
var x = 0;
var bgW = 0;
var s = 0;
var sW = 0;
var bW = 0;
var gameStarted = false;

function kc(event) {
    var k = event.which;
    if (k == 13 && !gameStarted) { startGame(); }
    if (k == 32 && jW == 0 && gameStarted) {
        clearInterval(rW);
        rW = 0;
        runsound.pause();
        jW = setInterval(jump, 100);
        jumpsound.play();
    }
}

function startGame() {
    gameStarted = true;
    document.getElementById("start").style.visibility = "hidden";
    rW = setInterval(run, 100);
    bgW = setInterval(bg, 100);
    sW = setInterval(score, 100);
    bW = setInterval(n, 100);
    runsound.play();
}

function run() {
    rI = rI + 1;
    if (rI == 11) { rI = 1; }
    document.getElementById("boy").src = "Run (" + rI + ").png";
}

function jump() {
    if (jI <= 5) { bmt = bmt - 40; } 
    else { bmt = bmt + 40; }
    document.getElementById("boy").style.marginTop = bmt + "px";
    
    jI = jI + 1;
    if (jI == 11) {
        jI = 1;
        clearInterval(jW);
        jW = 0;
        if(gameStarted) {
            rW = setInterval(run, 100);
            runsound.play();
        }
    }
    document.getElementById("boy").src = "Jump (" + jI + ").png";
}

function bg() {
    backmusic.play();
    x = x - 20;
    document.getElementById("game").style.backgroundPositionX = x + "px";
}

function score() {
    s = s + 5;
    document.getElementById("score").innerHTML = s;
}

function c() {
    var m = 300;
    for (var i = 0; i < 50; i++) {
        var b = document.createElement("div");
        b.className = "box";
        b.id = "box" + i;
        if (i <= 5) m += 900;
        else if (i <= 10) m += 600;
        else m += 500;
        b.style.marginLeft = m + "px";
        document.getElementById("game").appendChild(b);
    }
}

function n() {
    for (var i = 0; i < 50; i++) {
        var y = document.getElementById("box" + i);
        var currentMargin = parseInt(getComputedStyle(y).marginLeft);
        y.style.marginLeft = (currentMargin - 20) + "px";

        if (currentMargin >= 40 && currentMargin <= 100) {
            if (bmt > 400) {
                gameOver();
            }
        }
    }
}

function gameOver() {
    gameStarted = false;
    clearInterval(rW);
    clearInterval(jW);
    clearInterval(sW);
    clearInterval(bgW);
    clearInterval(bW);
    runsound.pause();
    deadsound.play();
    setInterval(dead, 100);
}

var dI = 1;
function dead() {
    if (dI < 10) {
        dI = dI + 1;
        document.getElementById("boy").src = "Dead (" + dI + ").png";
    } else {
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = s;
    }
}

function reload() {
    location.reload();
}