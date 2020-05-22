class Container extends UIElement{
    constructor(parameterObject) {
        super(parameterObject);
        this.hasStroke = false;
        this.hasFill = false;
    }
    testForClick(){
        if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height){
            return true;
        }
    }
    performClickFunctionality(){
        if (this.mouseClickfunc){
            return this.mouseClickfunc()
        }
    }
    setStroke(bool){
        this.hasStroke = bool
    }
    setFill(bool){
        this.hasFill = bool
    }
    draw() {
        this.hasStroke ? stroke(45) : noStroke();
        this.hasFill ? fill(this.color) : noFill();
        this.color ? fill(this.color) : noFill();
        rect(this.x,this.y,this.width,this.height)
        for (let i = 0; i < this.uiElements.length; i++){
            if (this.uiElements[i].draw){
                this.uiElements[i].draw();
            }
        }
    }
}

class ImageContainer extends Container{
    constructor(paramsObject){
        super(paramsObject)
        this.loadedImg = undefined
        this.imageWidth = undefined
        this.imageHeight = undefined
        this.imageX = this.parent ? this.parent.x + this.parent.width/2 : windowWidth/2
        this.imageY = this.parent ? this.parent.y + this.parent.height/2 : windowHeight/2

        this.offsetX = 0;
        this.offsetY = 0;
    }
    // images can exceed the bounds of their container
    setImageProps(loadedImg,imageWidth,imageHeight){
        this.loadedImg = loadedImg
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
    }
    setImageOffsets(offsetX,offsetY){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    // needs to be called every frame.
    redrawImage() { image(this.loadedImg, this.imageX+this.offsetX, this.imageY+this.offsetY, this.imageWidth, this.imageHeight); }
    draw() {
        if (this.loadedImg){
            this.redrawImage()
        }
    }
}

class TextBox extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.text = undefined
        this.textColor = undefined;
        // this.row determines the orientation of the font.
        // use the orientation of the parent container for aligning
            // normally-oriented text, vertically.
        this.textSize = this.row ? this.width / 10 : this.height / 20
        if (this.textSize * 2.5 > this.height && this.row){this.textSize = this.width / 20}
        textSize(this.textSize);
        // alignement options cannot be set after instantiation.
            // subclass to change the alignment:
            // ( horizAlign: LEFT, CENTER, or RIGHT,
            //   vertAlign:  TOP, BOTTOM, CENTER, or BASELINE )
        this.align = [CENTER,CENTER]
        textAlign(this.align[0],this.align[1]);
        this.fontStyle = undefined

    }
    // call this after instantiating the object to set the text
    setString(s) { this.text = s }
    // call this after instantiating the object to set the text color
    setTextColor(color) { this.textColor = color }
    setFontStyle(fontStyle){this.fontStyle=fontStyle}
    // p5.js built-in methods
    mouseOut(){}
    drawRotatedTextBox(){
        push();
            super.draw()
            translate(this.x,this.y)
            rotate(radians(90))
            if (this.text){
                if (this.textColor){
                    fill(this.textColor)
                }
                if (this.fontStyle){
                    textFont(this.fontStyle)
                }
                text(this.text, 0, -this.width, this.height, this.width)
            }
        pop();
    }
    drawNormalTextBox(){
        super.draw()
        if (this.text){
            if (this.textColor){
                fill(this.textColor)
            }
            if (this.fontStyle){
                textFont(this.fontStyle)
            }
            text(this.text, this.x, this.y, this.width, this.height)
        }
    }
    draw() {
        this.row ? this.drawNormalTextBox() : this.drawRotatedTextBox()
    }
}

// this is the menu button is drawn in the main draw function in sketch.js
class MenuButton extends Container{
    constructor(parameterObject){
        super(parameterObject)
        this.icon = new cycleViewIcon({parent:this})
    }
    draw(){
        super.draw();
        this.icon.draw()
    }
}
// spawned in the play view when the parameterObject.winner is set to anything except null
class ReplayWindow extends TextBox{
    constructor(parameterObject){
        super(parameterObject)
        this.message = undefined;
        this.context = undefined
        this.doOnce = true;
    }
    displayContent(){
        let replayScreenParams = {row:true, width:parent.width/1.5, color: 'white', height:parent.height/1.5, offsetX: parent.width/6, offsetY: parent.height/6}
        let replayScreen = new Container(replayScreenParams)
        replayScreen.setStroke(true)
        this.context.push(replayScreen)

        let gameOverMessageParams = {row:true, height:replayScreen.height*2/3, parent:replayScreen}
        let gameOverMessage = new TextBox(gameOverMessageParams)
        gameOverMessage.setString(this.message)
        gameOverMessage.setTextColor(30)
        this.context.push(gameOverMessage)

        let buttonsRowParams = {row:true, len:3, index:2, parent: replayScreen}
        let buttonRow = new Container(buttonsRowParams)
        this.context.push(buttonRow)

        let replayButtonContainerParams;
        let replayButtonContainer;
        for (let i =0; i < 2; i++){
            replayButtonContainerParams = {row:this.row, len:2, index:i, parent: buttonRow}
            replayButtonContainer = new Container(replayButtonContainerParams)
            this.context.push(replayButtonContainer)
        }

        let playAgainButtonContainer = this.context[this.context.length-2]
        let exitButtonContainer = this.context[this.context.length-1]

        let playAgainButtonParams = {row: true, offsetX: playAgainButtonContainer.width/6, offsetY: playAgainButtonContainer.height/4, width:playAgainButtonContainer.width/1.5, height:playAgainButtonContainer.height/2, parent:playAgainButtonContainer, mouseClickfunc:this.playAgain}
        let playAgainButton = new TextBox(playAgainButtonParams)
        playAgainButton.setString("play again")
        playAgainButton.setTextColor(30)
        playAgainButton.setStroke(true)
        this.context.push(playAgainButton)

        let exitButtonParams = {row: true, offsetX: exitButtonContainer.width/6, offsetY: exitButtonContainer.height/4, width:exitButtonContainer.width/1.5, height:exitButtonContainer.height/2, parent:exitButtonContainer, mouseClickfunc:this.exit}
        let exitButton = new TextBox(exitButtonParams)
        exitButton.setString("exit")
        exitButton.setTextColor(30)
        exitButton.setStroke(true)
        this.context.push(exitButton)
    }
    setContext(context){
        this.context = context
    }
    setMessage(parameterObject){
        let message;
        switch(parameterObject.winner){
            case 1:
            message = "you won";
            break;
            case 0:
            message = "the a.i. won";
            break;
            case -1:
            message = "tie";
            break;
            default:
            message = "wtf";
            break;
        }
        this.message = message;
    }
    playAgain(){
        return ["replay"]
    }
    exit(){
        return ["exit"]
    }
    draw(){
        super.draw();
        if (this.doOnce && this.context){
            this.displayContent()
            this.doOnce = false;
        }
    }
}
