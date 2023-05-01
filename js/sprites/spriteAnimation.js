class SpriteAnimation {
    spriteSheet;

    animInterval;
    animTime;

    row;
    col;

    cols;
    rows;

    playing;

    constructor(spriteSheet, cols, animInterval) {
        this.spriteSheet = spriteSheet;

        this.animInterval = animInterval;

        this.cols = cols;
        this.rows = this.spriteSheet.length / this.cols;

        this.col = 0;
        this.reset();

        this.playing = true;
    }

    getSprite(){
        this.row = this.row%this.rows;
        return this.spriteSheet[this.col + this.row * this.cols];
    }

    update(){
        if(this.playing)
            this.animTime += Time.deltaTime;

        if(this.animTime >= this.animInterval){
            this.animTime = 0;
            this.row++;
        }
    }

    reset(){
        this.row = 0;
        this.animTime = 0;
    }

    setCol(col){
        this.col = col % this.cols;
    }

}

function createSpriteAnimation(spriteSheet, cols, animation) {
    return new SpriteAnimation(spriteSheet, cols, animation.animInterval);
}