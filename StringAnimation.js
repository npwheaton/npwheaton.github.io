 export default class StringAnimation{
    #elem;
    #mastercopy;
    #counter;
    constructor(elem, intervaltimer, stoptime){
        this.#elem = elem;
        this.intervalTimer =intervaltimer;
        this.stoptime = stoptime;
        this.#mastercopy = this.#elem.textContent;
        this.#counter = 0;
        this.currentAnimation = this.randomizeText;
        
        
    }
    randomizeText(){
        let randText = '';
        let randlength = (this.#mastercopy.length>0 ? this.#mastercopy.length : 2);
        for(let i = 0; i<randlength; i++){
            let randInt = Math.floor(Math.random()*192);
            if(randInt<33){
                randInt+=33;
            }
            else if(randInt>126 && randInt<159){
                randInt+=(159-126);
            }
            let stringPiece = String.fromCharCode(randInt);
            randText+=stringPiece;
        }
        this.#elem.textContent = randText;
        
    }
    typewriterText(){
        this.#elem.textContent = this.#mastercopy.slice(0, this.#counter) + "|";
        if(this.#counter<this.#mastercopy.length){
            this.#counter++;
        }
    }
    setAnimation(type){
        switch(type){
            case  "randomize":
            this.currentAnimation = this.randomizeText;
            break;

            case "typewriter":
                this.currentAnimation = this.typewriterText;
                break;
            
            default:
                this.currentAnimation = this.randomizeText;
                break;
        }
    }
    startAnimation(){
        const interval = setInterval(this.currentAnimation.bind(this), this.intervalTimer);
        setTimeout((function(){
            clearInterval(interval);
            this.#elem.textContent = this.#mastercopy;
            this.#counter = 0;
        }).bind(this), this.stoptime);
    }
}

//this could go in main.js when its on a server and StringAnimation can be exported




//console.log(window.screen.width);


