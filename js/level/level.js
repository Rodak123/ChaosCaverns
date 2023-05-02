class Level {
    grid;

    constructor() {

        const w = 30;
        const h = 30;
        const center = createVector(
            -Cell.size * w * 0.5,
            -Cell.size * h * 0.5
        );
        this.grid = new Grid(center.x, center.y, w, h);

        this.generate();
    }

    generate(){
        for (let i = 0; i < this.grid.w; i++) {
            for (let j = 0; j < this.grid.h; j++) {
                let sprite = null;
                if (i === 0 && j === 0) {
                    sprite = tileset.walls.left_top;
                } else if (i === this.grid.w-1 && j === 0) {
                    sprite = tileset.walls.right_top;
                } else if (i === 0 && j === this.grid.h-1) {
                    sprite = tileset.walls.left_down;
                } else if (i === this.grid.w - 1 && j === this.grid.h - 1) {
                    sprite = tileset.walls.right_down;
                } else if (i === 0) {
                    sprite = tileset.walls.left;
                } else if (i === this.grid.w -1){
                    sprite = tileset.walls.right;
                } else if (j === 0){
                    sprite = tileset.walls.top;
                } else if (j === this.grid.h -1){
                    sprite = tileset.walls.bottom;
                }else{
                    sprite = tileset.ground.flat;
                    if(random(1) < 0.1){
                        sprite = random(tileset.ground.dirty);
                    }
                    this.grid.cells[i][j].solid = false;
                }
                this.grid.cells[i][j].setSprite(sprite);
            }
        }
    }

    collide(actors){
        for (let i = 0; i < actors.length; i++) {
            const actor = actors[i];
            actor.collide(this.grid);
        }
    }

    show(){
        this.grid.show();
    }

}