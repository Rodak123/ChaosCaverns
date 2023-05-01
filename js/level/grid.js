class Grid {
    cells;

    pos;
    w; h;
    constructor(x, y, w, h) {
        this.cells = [];
        this.pos = createVector(x, y);
        for (let i = 0; i < w; i++) {
            const col = [];
            for (let j = 0; j < h; j++) {
                col.push(new Cell(x, y, i, j));
            }
            this.cells.push(col);
        }
        this.w = this.cells.length;
        this.h = this.cells[0].length;
    }

    getCell(i, j){
        if(i < 0 || i >= this.w || j < 0 || j >= this.h){
            return null;
        }
        return this.cells[i][j];
    }

    getCellXY(x, y){
        return this.getCell(floor((x - this.pos.x ) / Cell.size), floor((y - this.pos.y) / Cell.size));
    }

    show(){
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                const cell = this.cells[i][j];
                cell.show();
            }
        }
    }

    mousePressed(){

    }

}