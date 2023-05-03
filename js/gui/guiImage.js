class GuiImage extends GuiElement{
    sprite;

    constructor(x, y, w, h, sprite) {
        super(x, y, w, h);

        this.sprite = sprite;
    }

    show(){
        if(this.sprite === undefined){
            super.show();
            return;
        }
        imageMode(CORNER);
        image(this.sprite, this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }

}