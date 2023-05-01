class Camera {
    pos;

    constructor() {
        this.pos = createVector();
    }

    translate(){
        translate(this.pos.x, this.pos.y);
    }

}