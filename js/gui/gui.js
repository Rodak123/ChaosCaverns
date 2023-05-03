class Gui {
    elements;

    margin;

    constructor(mx=0, my=0) {
        this.elements = [];

        this.margin = createVector(mx, my);
    }

    show(){
        for (const element of this.elements) {
            element.show();
        }
    }

    update(){
        for (const element of this.elements) {
            element.update();
        }
    }

    addElement(element){
        element.pos.add(this.margin);
        this.elements.push(element);
    }

}