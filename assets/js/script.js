// When page is loaded it will run the function ready
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay'));
    let dots = Array.from(document.getElementsByClassName('dot'));
    let game = new MatchColors(0, dots);
//When click on 'Click to start!' overlay-text should dissapear
    overlays.forEach(overlay => {
       overlay.addEventListener('click', () => {
           overlay.classList.remove('display'); 
           game.startGame();
       });
    });
//When click on dots, they will be shown.
    dots.forEach(dot =>{
        dot.addEventListener('click', () => {
            game.showDot(dot);
        });
    });
}
//It waits for the page to load before loading the code
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}