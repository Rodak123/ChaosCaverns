class NumberDisplay extends GuiElement{
    numbers;

    value = 0;
    len = 2;

    numSize;

    align = -1;

    numberSpacing = 0.9;

    keepTrack;
    tracking;

    constructor(x, y, w, h, clean=true, value=0, len=2, align=0) {
        super(x, y, w, h);

        this.numbers = clean?images.gui.numbers_clean:images.gui.numbers;
        this.value = value;
        this.len = len;

        this.numSize = w / (this.len*1.5);
        this.align = align * 0.5;
    }

    setTrack(track, val){
        if(track[val] === undefined) return;
        this.keepTrack = track;
        this.tracking = val;
    }

    show(){
        const strVal = this.value.toString();
        push();
        translate(this.pos.x+this.numSize+(this.numSize*this.align), this.pos.y+this.dim.y*0.5);
        imageMode(CENTER);
        for (let i = 0; i < strVal.length; i++) {
            const char = parseInt(strVal.charAt(i).toString());
            const sprite = this.numbers[char];
            image(sprite, this.numSize*this.numberSpacing*i, 0, this.numSize, this.numSize);
        }
        pop();
    }

    update() {
        if(this.keepTrack !== undefined){
            this.setValue(this.keepTrack[this.tracking]);
        }
        super.update();
    }

    setValue(val){
        this.value = constrain(val, 0, pow(10, this.len)-1);
    }

}