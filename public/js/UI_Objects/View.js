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
        super(parameterObject);
        this.titleSprites = null;
        this.spriteArea = null;
    }
    redrawElements(gameState){
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

        // spriteArea :: right side or bottom of menu screen (depending on aspect ratio)
        width  = portrait ? windowWidth : windowWidth*(2/3)
        height = portrait ? windowHeight*(2/3) : windowHeight
        offsetX = portrait ? 0 : windowWidth*(1/3)
        offsetY = portrait ? windowHeight*(1/3) : 0
        params = {width:width, height:height, offsetX:offsetX, offsetY:offsetY}//, color:"red",}
        let spriteArea = new Container(params)
        this.spriteArea = spriteArea;
        this.uiElements.push(spriteArea)
        if (gameState){
            // console.log(gameState.titleIdle, "hey")
            this.titleSprites = this.refreshTitle(gameState);
        }

    }
    jumpToPlayView(){return ["togglePlayView"]}

    makeVertices(num){
        let columns = []
        while (num > 0){
            columns.push(num)
            num -= 1
        }

        let count = 1;
        let grid = []

        for (let column in columns) {
            let k = Math.floor(Math.random() * Math.floor((columns.length-1) - count)) + count;
            let temp = columns[count]
            columns[count] = columns[k]
            columns[k] = temp
            // console.log(rows[count])
            grid.push([columns[count], count]);
            count = count + 1
            }
            // console.log(grid)
            return grid
        }

    refreshTitle(gameState){
        let range;
        // let range = {
        //     1: [random(this.x+(this.x+this.width)*(3/15), this.x+(this.x+this.width)*(7/15)), random( this.y + (this.y + this.height)*(1.5/7) , + (this.y + this.height)*(2/7) )],
        //     2: [random(this.x+(this.x+this.width)*(7/15), this.x+(this.x+this.width)*(9/15) ), random(this.y + (this.y + this.height)*(2/7) ,this.y  + (this.y + this.height)*(2.5/7) )],
        //     3: [random(this.x+(this.x+this.width)*(9/15), this.x+(this.x+this.width)*(11/15)), random(this.y + (this.y + this.height)*(2.5/7) ,this.y  + (this.y + this.height)*(3.5/7) )],
        //     4: [random(this.x+(this.x+this.width)*(11/15), this.x+(this.x+this.width)*(13/15)), random(this.y + (this.y + this.height)*(3.5/7) ,this.y + (this.y + this.height)*(4/7) )],
        //     5: [random( this.x+(this.x+this.width)*(13/15), this.x+(this.x+this.width)*(15/15) ), random(this.y + (this.y + this.height)*(4.5/7) ,this.y  + (this.y + this.height) *(5/7)  )]
        // }
        let grid = this.makeVertices(5)
        let titleSprites = []
        for (var i = 0; i < 5; i++){
            let index = i%5+1;
            // console.log(i,index)
            if (this.row){
                range = {
                    1: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(6/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(10/15)), random( this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(.5/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(1/7) )],
                    2: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(10/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(12/15) ), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(1/7) , this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(1.5/7) )],
                    3: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(12/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(14/15)), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(1.5/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(2/7) )],
                    4: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(13/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(13/15)), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(2/7) ,this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(3/7) )],
                    5: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(14/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(15/15) ), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(3.5/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height) *(4/7)  )]
                    }
            } else {
                range = {
                    1: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(6/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(10/15)), random( this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(3/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(4/7) )],
                    2: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(10/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(12/15) ), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(4/7) , this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(4.5/7) )],
                    3: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(12/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(14/15)), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(4.5/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height)*(5/7) )],
                    4: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(13/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(13/15)), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(5/7) ,this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(5.5/7) )],
                    5: [random(this.spriteArea.x +(this.spriteArea.x+this.spriteArea.width)*(14/15), this.spriteArea.x+(this.spriteArea.x+this.spriteArea.width)*(15/15) ), random(this.spriteArea.y + (this.spriteArea.y + this.spriteArea.height)*(6/7) ,this.spriteArea.y  + (this.spriteArea.y + this.spriteArea.height) *(7/7)  )]
                    }
            }

            let x = range[grid[i][0]][0]//+this.width/2;
            let y = range[grid[i][1]][1]
            titleSprites[i] = new TitleSprite(gameState.titleIdle, gameState.titleWave, gameState.titleChosen, gameState.titlePoint1, gameState.titlePoint2, gameState.titlePoint3, gameState.titlePoint4, x, y, random(.5, .7))
        }
        return titleSprites;
    }

    draw(){
        super.draw();
        if (this.titleSprites.length){
            for (let sprite of this.titleSprites) {
                sprite.show();
                sprite.animate();
            }
        }
    }
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
        // console.log(navBarAmout)
        let width  = portrait ? windowWidth*navBarRatio : windowWidth
        let height = portrait ? windowHeight : windowHeight*navBarRatio/1.7
        let offsetX = portrait ? windowWidth*(1- navBarRatio) : 0
        let params = {width: width, height: height, offsetX: offsetX}//, color:color(71,253,53),}
        let navBar = new Container(params)
        // navBar.setFill(true);//color(71,253,53));
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
