// abstract View base-class
class View extends UIElement{
    constructor(parameterObject){
        super(parameterObject)
        // for drawing the UIElements the first time.
        this.redrawElements();
    }
    // abstract method
    redrawElements(state){}
    draw(){
        for (let i = 0; i < this.uiElements.length; i++){
            this.uiElements[i].draw();
        }
    }
}
// menu view on page load
class MenuView extends View{
    constructor(parameterObject){
        super(parameterObject)
    }
    redrawElements(state){
        let portrait = windowWidth < windowHeight;

        this.uiElements = []

        // buttonArea :: left side or top of menu screen (depending on aspect ratio)
        let params = {index:0, len:3}//, color:"blue"}
        let buttonArea = new Container(params)
        this.uiElements.push(buttonArea)

        let width  = buttonArea.width*(2/3)
        let height = buttonArea.height*(2/3)
        let offsetX = portrait ? buttonArea.width*(1/6) : buttonArea.width*(1/3)
        let offsetY = portrait ? buttonArea.height*(1/3) : buttonArea.height*(1/6)
        params = {parent:buttonArea, width: width, height: height, offsetX: offsetX, offsetY: offsetY}//, color: "green"}
        let buttonContainer = new Container(params)
        this.uiElements.push(buttonContainer)

        params = {row: !portrait, parent:buttonContainer, len:2, index: 0}
        let playButtonContainer = new Container(params)
        this.uiElements.push(playButtonContainer)

        params = {row: true, parent:playButtonContainer, mouseClickfunc:this.jumpToPlayView}
        let playButton = new TextBox(params)
        playButton.setString("play")
        playButton.setStroke(false)
        playButton.setFontStyle("monospace")
        playButton.setTextColor(color(71,253,53))
        this.uiElements.push(playButton)

        params = {row: !portrait, parent:buttonContainer, len:2, index: 1}
        let aboutButtonContainer = new Container(params)
        this.uiElements.push(aboutButtonContainer)

        params = {row: true, parent:aboutButtonContainer}
        let aboutButton = new TextBox(params)
        aboutButton.setString("about")
        aboutButton.setStroke(false)
        aboutButton.setFontStyle("monospace")
        aboutButton.setTextColor(color(71,253,53))
        this.uiElements.push(aboutButton)

        // spriteArea :: right side or bottom of menu screen (depending on aspect ratio)
        width  = portrait ? windowWidth : windowWidth*(2/3)
        height = portrait ? windowHeight*(2/3) : windowHeight
        offsetX = portrait ? 0 : windowWidth*(1/3)
        offsetY = portrait ? windowHeight*(1/3) : 0
        params = {width:width, height:height, offsetX:offsetX, offsetY:offsetY}//, color:"red",}
        let spriteArea = new Container(params)
        this.uiElements.push(spriteArea)
    }
    jumpToPlayView(){return ["togglePlayView"]}
}
// play view
class PlayView extends View{
    constructor(parameterObject){
        super(parameterObject)
    }
    redrawElements(state){
        let portrait = windowWidth < windowHeight;

        this.uiElements = []

        // navBar
        let navBarAmout = 1.0
        let playViewAmount = 5.0
        let navBarRatio = navBarAmout/playViewAmount
        console.log(navBarAmout)
        let width  = portrait ? windowWidth*navBarRatio : windowWidth
        let height = portrait ? windowHeight : windowHeight*navBarRatio/1.7
        let offsetX = portrait ? windowWidth*(1- navBarRatio) : 0
        let params = {width: width, height: height, offsetX: offsetX}//, color:"red",}
        let navBar = new Container(params)
        this.uiElements.push(navBar)

        width  = navBar.width*(9/10)
        height = navBar.height*(9/10)
        offsetX = navBar.width*(1/20)
        let offsetY = navBar.height*(1/20)
        params = {parent:navBar, width: width, height: height, offsetX: offsetX, offsetY: offsetY}//, color: "green"}
        let buttonContainer = new Container(params)
        this.uiElements.push(buttonContainer)

        params = {parent:buttonContainer, len:3, index: 0}
        let menuButtonContainer = new Container(params)
        this.uiElements.push(menuButtonContainer)

        params = {row: true, parent:menuButtonContainer, mouseClickfunc:this.jumpToMenuView}
        let menuButton = new TextBox(params)
        menuButton.setString("menu")
        menuButton.setStroke(false)
        menuButton.setFontStyle("monospace")
        menuButton.setTextColor(color(71,253,53))
        this.uiElements.push(menuButton)

        params = {parent:buttonContainer, len:3, index: 1}
        let aboutButtonContainer = new Container(params)
        this.uiElements.push(aboutButtonContainer)

        params = {row: true, parent:aboutButtonContainer}
        let aboutButton = new TextBox(params)
        aboutButton.setString("about")
        aboutButton.setStroke(false)
        aboutButton.setFontStyle("monospace")
        aboutButton.setTextColor(color(71,253,53))
        this.uiElements.push(aboutButton)

        params = {parent:buttonContainer, len:3, index: 2}
        let helpButtonContainer = new Container(params)
        this.uiElements.push(helpButtonContainer)

        params = {row: true, parent:helpButtonContainer}
        let helpButton = new TextBox(params)
        helpButton.setString("help")
        helpButton.setStroke(false)
        helpButton.setFontStyle("monospace")
        helpButton.setTextColor(color(71,253,53))
        this.uiElements.push(helpButton)
    }
    jumpToMenuView(){return ["toggleMenuView"]}
}
