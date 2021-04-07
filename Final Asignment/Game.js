class Game {
    constructor () {
        this.canvas = Null;
        this.init();
    }
    init () {
        this.canvas = document.createElement('canvas');
        this.canvas.width = game_width;
        this.canvas.height = game_height;
        
    }
}