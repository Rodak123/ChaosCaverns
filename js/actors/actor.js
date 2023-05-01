class Actor {
    pos;
    dim;

    vel;
    acc;
    maxSpeed;

    dir;

    sprite;

    updateDir;

    constructor(x, y, w, h, sprite) {
        this.pos = createVector(x, y);
        this.dim = createVector(w*Cell.size, h*Cell.size);

        this.vel = createVector();
        this.acc = createVector();

        this.dir = createVector(1, 0);

        this.maxSpeed = 1;

        this.maxSpeed = 0.1;
        this.velDamping = 0.6;

        this.setSprite(sprite);

        this.spriteSize = 16;
        this.spriteScale = 1;

        this.updateDir = true;
    }

    setSprite(sprite){
        this.sprite = sprite;
        if(this.sprite){
            this.spriteScale = this.sprite.width / this.spriteSize;
        }else{
            this.spriteScale = 1;
        }
    }

    update(){
        this.vel.add(this.acc);

        this.acc.mult(0);

        this.vel.mult(this.velDamping);
        this.vel.limit(this.maxSpeed * Cell.size);

        if(this.updateDir){
            this.faceVelocity();
        }

        this.pos.add(this.vel);
    }

    faceVelocity(){
        this.setDir(p5.Vector.fromAngle(this.vel.heading()));
    }

    setDir(dir){
        this.dir.set(dir.x, dir.y);
    }

    collide(grid){
        const left = grid.getCell(0, 0);
        if (left.solid === true){
            if(this.pos.x - this.dim.x * 0.5 < left.x+Cell.size){
                this.pos.x = left.x + Cell.size + this.dim.x * 0.5;
            }
            if(this.pos.y - this.dim.y * 0.5 < left.y+Cell.size){
                this.pos.y = left.y + Cell.size + this.dim.y * 0.5;
            }
        }

        const right = grid.getCell(grid.w-1, grid.h-1);
        if (right.solid === true){
            if(this.pos.x + this.dim.x * 0.5 > right.x){
                this.pos.x = right.x - this.dim.x * 0.5;
            }
            if(this.pos.y + this.dim.y * 0.5 > right.y){
                this.pos.y = right.y - this.dim.y * 0.5;
            }
        }

    }

    show() {
        if(this.sprite){
            imageMode(CENTER);
            image(this.sprite, this.pos.x, this.pos.y, this.dim.x*this.spriteScale, this.dim.y*this.spriteScale);
        }else{
            rectMode(CENTER);
            fill(255);
            stroke(0);
            rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }
}