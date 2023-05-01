class Cell {
    x; y;
    i; j;

    static size;

    sprite;

    solid;

    constructor(x, y, i, j) {
        this.i = i;
        this.j = j;
        this.sprite = undefined;

        this.x = x + i * Cell.size;
        this.y = y + j * Cell.size;

        this.solid = true;
    }

    setSprite(sprite){
        this.sprite = sprite;
    }

    show(){
        imageMode(CORNER);
        push();
        translate(this.x, this.y);
        if(this.sprite) {
            imageMode(CORNER);
            image(this.sprite, 0, 0, Cell.size, Cell.size);
        }
        /*
        noFill();
        stroke(255, 0, 0);
        rectMode(CORNER);
        rect(0, 0, Cell.size, Cell.size);
        */
        pop();
    }

}