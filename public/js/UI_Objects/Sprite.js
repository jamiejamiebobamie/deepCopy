class Sprite{
    constructor(idle, wave, chosen, point1, point2, point3, point4, x, y, speed){

    }
    animate(){}
    draw(){
        this.animate();
    }
}

class TitleSprite {
    constructor(idle, wave, chosen, point1, point2, point3, point4, x, y, speed){
        this.speed = speed || 1;
        // console.log(this.speed)
        this.animation_idle = idle;
        this.animation_wave = wave;
        this.animation_chosen = chosen;
        this.animation_point1 = point1;
        this.animation_point2 = point2;
        this.animation_point3 = point3;
        this.animation_point4 = point4;
        this.index = 0;
        this.indexWave = 0;
        this.indexChosen = 0;
        this.len_point1 = this.animation_point1
        this.len_point2 = this.animation_point2
        this.len_point3 = this.animation_point3
        this.len_point4 = this.animation_point4
        this.len_idle = this.animation_idle.length
        this.len_wave = this.animation_wave.length
        this.len_chosen = this.animation_chosen.length
        this.x = x;
        this.y = y;
        this.scale = this.y/700
        this.idle = true;
        this.wave = false;
        this.chosen = false;
        this.point = false;
        this.freeze = 0;
        this.speedStored = this.speed;
        this.green = 255
        this.MouseOverX = this.x*this.scale//+(193*this.scale);
        this.MouseOverY = this.y*this.scale//+(250*this.scale);
        this.MouseOverArea = 100*this.scale;
    }

    fromGreenHolo(inp){
        let x = random(0, this.green);
        let y = inp;
        if(inp != x) {
            inp = lerp(y, x, .5)
        } else {
            this.fromGreen(inp)
        }
        return inp
    }

    fromGreenText(inp){
        let x = random(0, 50);
        let y = inp;
        if(inp != x) {
            inp = lerp(y, x, .5)
        } else {
            this.fromGreen(inp)
        }
        return inp
    }

    playIdle(){
        let index = floor(this.index/2) % this.len_idle;
        // console.log(this.animation_idle)
        push();
            scale(this.scale)
            image(this.animation_idle[index],this.x,this.y); //11
        pop();
    }

    playWave(){
        let index = floor(this.indexWave) % this.len_wave
        push();
            scale(this.scale)
            image(this.animation_wave[index],this.x,this.y); //11
            if (index == 5){
                this.speed = this.freeze
                image(this.animation_wave[5],this.x,this.y); //11
            }
            if (this.wave == false){
                    this.speed = 1//this.speedStored
                    image(this.animation_wave[index],this.x,this.y); //11
                if (index == 17){
                    this.speed = this.speedStored
                    this.idle = true
                }
            }
        pop();
    }

    playPoint(){

        push();
        scale(this.scale);
            // if ((mouseX - this.x) > 100){
                let index1 = floor(this.index) % this.len_point1
                image(this.animation_point1[index1],this.x,this.y); //11
                //play point1
            // }
            //  else if ((mouseX - this.x) > 50){
            //      let index2 = floor(this.index) % this.len_point2
            //      image(this.animation_point2[index2],this.x,this.y); //11
            //     //play point2
            // }
            // if ((mouseX - this.x) < -100){
            //     let index4 = floor(this.index) % this.len_point4
            //     image(this.animation_point4[index4],this.x,this.y); //11
            //     //play point4
            // }
            //  else if ((mouseX - this.x) < 0){
            //     let index3 = floor(this.index) % this.len_point3
            //     image(this.animation_point3[index3],this.x,this.y); //11
            //     //play point3
            // }
        pop();

    }

    playChosen(){
        let index = floor(this.indexChosen) % this.len_chosen
        push();
        scale(this.scale);
        this.speed = 2
        image(this.animation_chosen[index],this.x,this.y); //11
        if (index == 86) {
            image(this.animation_chosen[86],this.x,this.y); //11
            this.speed = this.freeze
            }
        pop();
        }

    show(){
        // tint(this.fromGreenHolo(this.green), this.green, this.fromGreenHolo(this.green), this.fromGreenHolo(this.green))
        // tint(255)
        // ellipse(this.MouseOverX, this.MouseOverY, this.MouseOverArea);
        // noTint();
        tint(200, 255, 200, this.fromGreenHolo(this.green))

        if (dist(this.MouseOverX, this.MouseOverY, mouseX, mouseY) > this.MouseOverArea) {
            this.wave = false
        } else {
            this.wave = true;
            this.idle = false;
        }
        if(this.wave == true && mouseIsPressed){
            this.chosen = true;
            this.wave = false;
        }
        if (this.chosen == true){
            // console.log("hello")
            this.playChosen();
        // } else if (this.point == true){
        //     this.playPoint()
        } else if (this.idle == true){
            this.playIdle()
        } else {
            this.playWave();
        }
    }

    animate(){
        if (this.chosen == true){
            this.indexChosen += this.speed;
        } else if (this.idle != true) {
            this.indexWave += this.speed;
        } else {
            this.indexWave = 0;
            this.index += this.speed;
        }
    }

    draw(){
        this.animate();
    }

}
class SpectatorSprite {
    constructor(idle, point1, point2, point3, point4, x, y, speed){
        this.speed = speed;
        this.animation_idle = idle;
        this.animation_point1 = point1;
        this.animation_point2 = point2;
        this.animation_point3 = point3;
        this.animation_point4 = point4;
        this.index = 0;
        this.indexPoint = 0;
        this.len_idle = this.animation_idle.length
        this.len_point1 = this.animation_point1.length
        this.len_point2 = this.animation_point2.length
        this.len_point3 = this.animation_point3.length
        this.len_point4 = this.animation_point4.length
        this.x = x;
        this.y = y;
        this.idle = true;
        this.point = false;
    }

playIdle(){
    let index = floor(this.index) % this.len_idle
    image(this.animation_idle[index],this.x,this.y);

}

playPoint(){

}

show(){
    this.playIdle()
}

animate(){
    this.index += this.speed;
        }
}

class HologramSprite {
    constructor(idle, wave, chosen, x, y, rotation, speed, n){
        this.speed = speed;
        this.animation_idle = idle;
        this.animation_wave = wave;
        this.animation_chosen = chosen;
        this.rotation = rotation;
        this.index = 0;
        this.indexChosen = 0;
        this.len_idle = this.animation_idle.length
        this.len_wave = this.animation_wave.length
        this.len_chosen = this.animation_chosen.length
        this.x = x;
        this.y = y;
        this.n = n +1;
        this.idle = true;
        this.wave = false;
        this.chosen = false;
        this.out = false;
        this.begin = false;
        this.change = false;
        this.freeze = 0;
        this.speedStored = this.speed;
        this.k = 55; // constant to add to this.n's x
        this.l = 60; // constant to add to this.n's y
        this.green = 255
        this.winner = false;
    }

fromGreenHolo(inp){
    let x = random(0, this.green);
    let y = inp;
    if(inp != x) {
        inp = lerp(y, x, .5)
    } else {
        this.fromGreen(inp)
    }
    return inp
} //attempting to make a recursive function that calls itself each time the target number is reached

fromGreenText(inp){
    let x = random(0, 50);
    let y = inp;
    if(inp != x) {
        inp = lerp(y, x, .5)
    } else {
        this.fromGreen(inp)
    }
    return inp
} //attempting to make a recursive function that calls itself each time the target number is reached

setIndex(){
    if (this.change == true){
    this.index = 0;
    this.change = false;
}}

playIdle(){
    textSize(25);
    let index = floor(this.index) % this.len_idle
    if (this.winner != true){
        // textSize(25);
        fill(0, this.fromGreenText(this.green), 0, this.fromGreenText(this.green));
        text(this.n,this.x+this.k,this.y+this.l)
        image(this.animation_idle[index],this.x,this.y);
    } else {
        image(this.animation_idle[index],this.x,this.y);
        // textSize(70);
        fill(0, 255, 0, this.fromGreenHolo(this.green));
        // text(this.n,this.x+this.k+this.k,this.y+this.l+this.l)
        // text(this.n,500,500)
        text(this.n,this.x+this.k,this.y+this.l)
    }

    // image(this.animation_idle[index],this.x,this.y);
}

playWave(){
    let z = 65;
    let index = floor(this.index) % this.len_wave
    textSize(55);
    fill('#39FF14');
    text(this.n,this.x+this.k,this.y+100)
    if (this.wave == true && index < 11){
        this.speed = 1
        image(this.animation_wave[index],this.x,this.y); //11
        if (index == 10){
            this.speed = this.freeze
            image(this.animation_wave[10],this.x,this.y); //11
        }
    }
    if (this.wave == false){
            this.speed = 1//this.speedStored
            image(this.animation_wave[index],this.x,this.y); //11
        if (index == 19){
            this.speed = this.speedStored
            this.idle = true
        }
    }
}

playChosen(){
    let z = 65;
    let index = floor(this.indexChosen) % this.len_chosen
    // console.log(index)
    textSize(25);
    fill('#39FF14');
    text(this.n,this.x+this.k,this.y+this.l)
    this.speed = 1;
    image(this.animation_chosen[index],this.x,this.y); //11
    if (index == 66){
        // this.begin = true;
        this.speed = this.freeze;
        image(this.animation_chosen[66],this.x,this.y); //11
    }}

show(){
if(this.out == false){
    tint(this.fromGreenHolo(this.green), this.green, this.fromGreenHolo(this.green), this.fromGreenHolo(this.green))
    if (dist(this.x+80, this.y+70, mouseX, mouseY) > 25) {
        this.wave = false
    } else {
        this.wave = true;
        this.idle = false;
    }
    if(this.wave == true && mouseIsPressed){
        this.chosen = true;
        this.begin = true;
        this.wave = false;
        this.idle = true;
    }
    if (this.idle == true && this.winner != true){
        this.playIdle();
    } else if (this.idle == false && this.chosen == false && this.begin == false){
        this.playWave();
    } else if (this.winner == true) {
        textSize(55);
        fill('#39FF14');
        this.wave = true;
        this.playWave();
    } else {
        this.playIdle()
    }
} else {
    tint(this.green, this.fromGreenHolo(this.green), this.fromGreenHolo(this.green), this.fromGreenHolo(this.green))
    this.playChosen();
}
}
    animate(){
        if (this.out == true){
            this.indexChosen += this.speed;
        } else {
            this.index += this.speed;
        }
}

draw(){
    this.animate();
}

}
