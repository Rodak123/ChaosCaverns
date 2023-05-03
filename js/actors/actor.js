class Actor {
    tag = "actor";

    pos;
    dim;

    vel;
    acc;

    maxSpeed = 10;
    velDamping = 0.6;

    dir;

    sprite;

    updateDir = true;
    collidesLevel = true;
    bouncesOffLevel = false;

    spriteSize = 16;
    spriteScale = 1;

    toDestroy = false;
    drawHitBox = false;

    constructor(x, y, w, h, sprite) {
        this.pos = createVector(x, y);
        this.dim = createVector(w*Cell.size, h*Cell.size);

        this.vel = createVector();
        this.acc = createVector();

        this.dir = createVector(1, 0);

        this.maxSpeed = 0.1 * Cell.size;

        this.setSprite(sprite);

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
        this.vel.limit(this.maxSpeed);

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

    collideGrid(grid){
        if(this.collidesLevel === false) return;

        const left = grid.getCell(0, 0);
        if (left.solid === true){
            if(this.pos.x - this.dim.x * 0.5 < left.x+Cell.size){
                this.pos.x = left.x + Cell.size + this.dim.x * 0.5;
                this.collidedLevel('x');
            }
            if(this.pos.y - this.dim.y * 0.5 < left.y+Cell.size){
                this.pos.y = left.y + Cell.size + this.dim.y * 0.5;
                this.collidedLevel('y');
            }
        }

        const right = grid.getCell(grid.w-1, grid.h-1);
        if (right.solid === true){
            if(this.pos.x + this.dim.x * 0.5 > right.x){
                this.pos.x = right.x - this.dim.x * 0.5;
                this.collidedLevel('x');
            }
            if(this.pos.y + this.dim.y * 0.5 > right.y){
                this.pos.y = right.y - this.dim.y * 0.5;
                this.collidedLevel('y');
            }
        }

    }

    collideActors(me, actors){
        for (let i = 0; i < actors.length; i++) {
            if(i === me) continue;
            const actor = actors[i];
            if(Collision.actorActor(this, actor)){
                this.collidedActor(actor);
            }
        }
    }

    collidedActor(actor){
        //print("Collided: " + actor);
    }

    collidedLevel(edge){
        if(this.bouncesOffLevel){
            if(edge === 'x'){
                this.vel.x *= -1;
            }else if(edge === 'y'){
                this.vel.y *= -1;
            }
        }
    }

    show() {
        if(this.sprite){
            imageMode(CENTER);
            image(this.sprite, this.pos.x, this.pos.y, Cell.size*this.spriteScale, Cell.size*this.spriteScale);
        }else{
            rectMode(CENTER);
            fill(255);
            stroke(0);
            rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
        }
        if(this.drawHitBox || settings.drawHitBoxes){
            this.showHitBox();
        }
    }

    showHitBox(){
        rectMode(CENTER);
        noFill();
        stroke(0, 255, 0);
        rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    destroy(){
        this.toDestroy = true;
    }

    getDirectionCol(){
        let col = round((this.dir.heading()+PI)/HALF_PI)%4;
        if (col === 0) col = 3;
        else if (col === 3) col = 0;
        return col;
    }
}