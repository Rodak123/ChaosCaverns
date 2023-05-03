class GuiElement {

    pos;
    dim;

    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.dim = createVector(w, h);
    }

    show(){
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }

    update(){

    }

}