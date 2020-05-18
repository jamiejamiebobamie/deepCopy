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
let gameState = {}
// p5.js built-in method
function preload(){
    // gameState.loadedImage = loadImage('../imgs/brain_base.png');
    // gameState.fontStyle = loadFont('fonts/Quicksand-Bold.otf');
    // textFont(gameState.fontStyle)
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
    redrawn(gameState);
}
// redraws the views based on the current dimensions
    // of the screen (width and height) and the current gameState.
function redrawn(gameState){
    views = [];
    let menuScreen = new MenuView()
    views.push(menuScreen)
    let playScreen = new PlayView()
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
    if (returnValueFromViews){setTopLevelVariables(returnValueFromViews);}
    redrawn(gameState);
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
        console.log(command)
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
