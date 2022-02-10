//class construction
class MatchColors {
    constructor(totalTime, dots) {
        this.dotsArray = dots;
        this.totalTime = totalTime;
        this.timeElapsed = totalTime;
        this.timer = document.getElementById('time-elapsed');
        this.ticker = document.getElementById('flips');
    }
    //If new game will resset all dots, counter and flips
    startGame() {
        this.dotToCheck = null;
        this.totalClicks = 0;
        this.timeElapsed = this.totalTime;
        this.matchedDots = [];
        this.busy = true;
    //Timeout is set to have a bit time to mix all dots, start the timer and delay 
        setTimeout(()=>{
            this.mixDots();
            this.counting = this.startCounter();
            this.busy = false;
        },500);
        this.hideDots();
        this.timer.innerText = this.timeElapsed;
        this.ticker.innerText = this.totalClicks;
    }
    //Removes classes 'hide matched' from dots, so the coloured dots will be coverd by question-mark dot    
    hideDots() {
        this.dotsArray.forEach(dot => {
            dot.classList.remove('hide');
            dot.classList.remove('matched');
        });
    }
    showDot(dot) {
        if(this.canShowDot(dot)){
            //It count the click and it shows the color behind question mark
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            dot.classList.add('hide');

            if(this.dotToCheck)
                this.checkForDotMatch(dot);
            else
                this.dotToCheck = dot;
        }
    }
    //Get the the first and second dot type and check them and run the coresponding method, if they are match or not
    checkForDotMatch(dot) {
        if(this.getDotType(dot) === this.getDotType(this.dotToCheck))
            this.dotMatch(dot, this.dotToCheck);
        else
            this.dotMisMatch(dot, this.dotToCheck);

        this.dotToCheck = null;
    }
    //If coloured dots are matched then they will be visible all time until all coloured dots are matched
    dotMatch(dot1, dot2) {
        this.matchedDots.push(dot1);
        this.matchedDots.push(dot2);
        dot1.classList.add('matched');
        dot2.classList.add('matched');
        if(this.matchedDots.length === this.dotsArray.length)
            this.goodJob();
    }
    //If dots does not match they will be hided again
    dotMisMatch(dot1, dot2) {
        this.busy = true;
        setTimeout(() => {
          dot1.classList.remove('hide'); 
          dot2.classList.remove('hide'); 
          this.busy = false;
        }, 1000);
    }
    // It will get src location as a string to do the match 
    getDotType(dot) {
        return dot.getElementsByClassName('color-name')[0].src;
    }
    //It start counting in seconds the time that passes until game is finnished
    startCounter() {
        return setInterval(() => {
           this.timeElapsed++;
           this.timer.innerText = this.timeElapsed; 
        }, 1000);
    }
    // Good Job message will appear when finnished game and counter will be resseted
    goodJob() {
        clearInterval(this.counting);
        document.getElementById('good-job').classList.add('display');
    }
    //Mix the coloured dots every new game
    mixDots() {
        //Fisher–Yates shuffle algorithm https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
        for(let i = this.dotsArray.length -1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.dotsArray[randomIndex].style.order = i;
            this.dotsArray[i].style.order = randomIndex;
        }
    }
    canShowDot(dot) {
       
        //Rules that apply in order to see the coloured dot
        //In order to dot to be shown it must not wait to be checked, must not be matched already and this.busy must be false
        return !this.busy && !this.matchedDots.includes(dot) && dot !== this.dotToCheck;
    }
}
