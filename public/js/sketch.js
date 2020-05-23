// the p5.js canvas
let canvas;
// top level ui components.
let views = []
let viewIndex = 0;
let menuButton;
// the return value from functions of nested UIElements.
let returnValueFromViews;
// mousePressed boolean.
let doneOnce = false;
// api returns board and winner variables.
let apiReturnValue = null;
// the gameState is used to keep track of the state of the game.
    // uiElements lose their state each time they are redrawn
    // so require the state to be passed in on re-initializtion.
let gameState = {idle:[],
                wave:[],
                chosen:[],
                font:[],
                titleIdle:[],
                titleWave:[],
                titleChosen:[],
                titlePoint1:[],
                titlePoint2:[],
                titlePoint3:[],
                titlePoint4:[],
                brainTop:null,
                brainMiddle:null,
                brainBottom:null,
                lives:3,
                level:1,
                totalLevels:8,
                }


    let win_jsS = 0;
    // var count = 9;
    // win_jsS = winner(count);
    let living;
    let current;
    let ll; // linkedList
    let alive;
    let begin; //occurs when you've clicked on a hologram
    let end;
    let interv1;
    let myVar2;
    let guess;
    let centerX = 500;
    let centerY = 530;
    var start = false; //occurs when you've clicked on the button for the first time. intend to phase-out.
    let holograms;
    var rM = 100; //radius modifier
    var totalPoints = 41

let anim_idle = [];
let anim_wave = [];
let anim_chosen = [];

let titleIdle = [];
let titleWave = [];
let titleChosen = [];
let titlePoint1 = [];
let titlePoint2 = [];
let titlePoint3 = [];
let titlePoint4 = [];

// OLD
// function winner(num){
//     // Calculating the 'winner' of the Josephus Problem.
//     // Returns the number of people playing, the winner, the winner's number in binary.
//     // The number of people playing gets progressively larger.
//     let range = {
//         9: [3],
//         8: [4,5,6,7,9],
//         7: [10,11,12,13,14],
//         6: [15,16,17,18,19],
//         5: [20,21,22,23,24],
//         4: [25,26,27,28,29],
//         3: [30,31,32,33,34],
//         2: [35,36,37,38,39,40],
//         1: [41]
//     }
//     let n = range[num][Math.floor(Math.random() * range[num].length)];
//     let b = convertToBinary(n);
//     let p = findHighestPow(b);
//     let winner = ((2*(n - p))+1);
//     return ([n, winner, truncateBinary(convertToBinary(winner))]);
// }
//
// function computeWinner(level){
//     let range = {
//         8: [4,5,6,7,9],
//         7: [10,11,12,13,14],
//         6: [15,16,17,18,19],
//         5: [20,21,22,23,24],
//         4: [25,26,27,28,29],
//         3: [30,31,32,33,34],
//         2: [35,36,37,38,39,40],
//         1:
//     }
//
// }

// p5.js built-in method
function preload(){
    idle = loadImage('../sprites/idle150.png')
    wave = loadImage('../sprites/wave150.png')
    chosen = loadImage('../sprites/chosen150.png')
    // font = loadFont('../fonts/VeraMono.ttf');
    titleIdle = loadImage('../sprites_minimized/SpriteSheet_title-idle-58-159.7x167.png')
    titleWave = loadImage('../sprites_minimized/SpriteSheet_title-wave-18-156.833333333x166.png')
    titleChosen = loadImage('../sprites_minimized/SpriteSheet_title-chosen-87-157x167.png')

    gameState.brainTop = loadImage('../imgs/healthBar/brainTop.png');
    gameState.brainMiddle = loadImage('../imgs/healthBar/brainMiddle.png');
    gameState.brainBottom = loadImage('../imgs/healthBar/brainBottom.png');

    // titlePoint1 = loadImage('../sprites/SpriteSheet_title-point1-51-471x500.png')
    // titlePoint2 = loadImage('../sprites/SpriteSheet_title-point2-49-471x500.png')
    // titlePoint3 = loadImage('../sprites/SpriteSheet_title-point3-38-471x500.png')
    // titlePoint4 = loadImage('../sprites/SpriteSheet_title-point4-41-471x500.png')
}
// p5.js built-in method
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    // p5.js built-in method. parents the canvas to the DOM element 'sketch-holder'
    canvas.parent('sketch-holder');
    // p5.js built-in method. sets the framerate. improves performance.
    frameRate(24);
    // cycleViewIcon
    // menuButton = new MenuButton({width:50, height:50, mouseClickfunc: cycleViews})
    // p5.js built-in method. centers the canvas and all drawn objects.
    imageMode(CENTER);

    for (var i = 0; i < 185; i++) {
        let img = idle.get((i*150),0, 150, 119);
        gameState.idle.push(img);
    }

    for (var i = 0; i < 20; i++) {
        let img = wave.get((i*150),0, 150, 119);
        gameState.wave.push(img);
    }

    for (var i = 0; i < 67; i++) {
        let img = chosen.get((i*150),0, 150, 119);
        gameState.chosen.push(img);
    }

    for (var i = 0; i < 58; i++) {
        let img = titleIdle.get((i*157),0, 157, 167);
        gameState.titleIdle.push(img);
    }
    for (var i = 0; i < 18; i++) {
        let img = titleWave.get((i*156.8333),0, 156.8333, 166);
        gameState.titleWave.push(img);
    }
    // titleChosen = loadImage('../sprites_minimized/SpriteSheet_title-chosen-87-157x167.png')

    for (var i = 0; i < 87; i++) {
        let img = titleChosen.get((i*157),0, 157, 167);
        gameState.titleChosen.push(img);
    }
    //
    // for (var i = 0; i < 51; i++) {
    //     let img = titlePoint1.get((i*471),0, 471, 500);
    //     gameState.titlePoint1.push(img);
    // }
    //
    // for (var i = 0; i < 49; i++) {
    //     let img = titlePoint2.get((i*471),0, 471, 500);
    //     gameState.titlePoint2.push(img);
    // }
    //
    // for (var i = 0; i < 38; i++) {
    //     let img = titlePoint3.get((i*471),0, 471, 500);
    //     gameState.titlePoint3.push(img);
    // }
    //
    // for (var i = 0; i < 41; i++) {
    //     let img = titlePoint4.get((i*471),0, 471, 500);
    //     gameState.titlePoint4.push(img);
    // }
    redrawn(gameState);
    myVar2 = undefined;
    end = false;
    begin = false;
    // refreshGame();
}
// redraws the views based on the current dimensions
    // of the screen (width and height) and the current gameState.
// this is super not-performant. i'm recreating ALL the views instead of just
    // the current...
function redrawn(gameState){
    views = [];
    let menuScreen = new MenuView()
    menuScreen.redrawElements(gameState);
    views.push(menuScreen)

    let playScreen = new PlayView()
    playScreen.redrawElements(gameState);
    views.push(playScreen)
}
// p5.js built-in method
function windowResized() {
    // p5.js built-in method
    resizeCanvas(windowWidth, windowHeight);
    redrawn(gameState);
}

// p5.js built-in method
function draw(){
    background(0);
    drawRecursive(views[viewIndex])
}
function mouseOver(){hiColor = "blue"}

// recursive functions allow uiElements to be nested.
function drawRecursive(uiElement){
    if (uiElement.uiElements) {
        for (let i = 0; i < uiElement.uiElements.length; i++){
            drawRecursive(uiElement.uiElements[i])
        }
    }
    if (uiElement.draw){
        uiElement.draw();
    }
}
// p5.js built-in method. called repeatedly as mouse click is held down.
function mousePressed() {
    // the built-in p5.js function mouseClicked() does not work on mobile.
    // must use mousePressed() for all mouse events.
    // mousePressed() is called repeatedly each frame,
    // 'doneOnce' controls which events are called repeatedly (drag events)
    // and which are called once (click events).
    returnValueFromViews = clickRecursive(views[viewIndex]) || returnValueFromViews
    if (returnValueFromViews){ setTopLevelVariables(returnValueFromViews) }
    if (!doneOnce){
        doneOnce = true;
    }
}
// recursive functions allow uiElements to be nested.
function clickRecursive(uiElement){
    if (uiElement.uiElements) {
        for (let i = 0; i < uiElement.uiElements.length; i++){
            clickRecursive(uiElement.uiElements[i])
        }
    }
    if (uiElement.testForClick){
        if (uiElement.testForClick()){
            if (uiElement.performClickFunctionality){
                returnValueFromViews = uiElement.performClickFunctionality()
                return returnValueFromViews
            }
        }
    }
}
// p5.js built-in method. called when mouse click is release.
function mouseReleased() {
    returnValueFromViews = clickReleasedRecursive(views[viewIndex]) || returnValueFromViews
    if (returnValueFromViews){
        setTopLevelVariables(returnValueFromViews);
        redrawn(gameState);
    }

    // 'doneOnce' is reset with mouseReleased() function.
    doneOnce = false;
}
// recursive functions allow uiElements to be nested.
function clickReleasedRecursive(uiElement){
    if (uiElement.uiElements) {
        for (let i = 0; i < uiElement.uiElements.length; i++){
            clickReleasedRecursive(uiElement.uiElements[i])
        }
    }
    if (uiElement.isDragging){
        uiElement.isDragging = false;
        returnValueFromViews = uiElement.performDragFunctionality();
        return returnValueFromViews
    }
}
// sets the top level variables.
    // all game logic and state is managed and stored in this file.
    // nested UIElements send an array of string command(s)
    // to this method to change the app's state based on user interacting with
    // them
function setTopLevelVariables(returnValueFromViews){
        // returnValueFromViews is an array of commands.
    while (returnValueFromViews.length > 0){
        // some buttons return multiple commands that are iterated through
            // from back to front.
        command = returnValueFromViews.pop()
        // console.log(command)
        switch (command) {
            case "togglePlayView":
                viewIndex = 1
                break;
            case "toggleMenuView":
                viewIndex = 0
                break;
            default:
            break;
        }
    }
}
function resetGameState(){
    // let saveDifficulty = gameState.aiDifficulty;
    // let saveFont = gameState.fontStyle;
    // let saveImage = gameState.loadedImage;
    // gameState = {    boardArray: ["!","!","!","!","!","!","!","!","!"],
    //                        turn: 'x',
    //                        aiDifficulty: saveDifficulty, // slider range: 43 to 143
    //                        winner: null,
    //                        fontStyle:saveFont,
    //                        loadedImage:saveImage
    //                    }
}
// the menu button's function.
    // changes the view index, resets the parameter object,
    // and redraws the board.
// function cycleViews(){
//     if (view_i < views.length-1){
//         view_i++;
//     } else {
//         view_i = 0;
//     }
//     views[view_i].redrawElements(gameState);
//     resetGameState();
//     redrawn(gameState);
// }
