class Player extends AliveActor{
    moveSpeed;

    constructor(x, y) {
        super(x,  y, 1, 1,
            images.actors[0].idle,
            images.actors[0].walk
        );

        this.moveSpeed = 0.1 * Cell.size;
    }

    move(){
        const move = createVector();
        if (keyIsDown(playerControls.up)) {
            move.y -= 1;
        }
        if (keyIsDown(playerControls.down)) {
            move.y += 1;
        }
        if (keyIsDown(playerControls.left)) {
            move.x -= 1;
        }
        if (keyIsDown(playerControls.right)) {
            move.x += 1;
        }
        move.setMag(this.moveSpeed);

        this.applyForce(move);
    }

    update() {
        this.move();

        super.update();
    }

    moveCamera(camera){
        camera.pos.set(width*0.5-this.pos.x, height*0.5-this.pos.y);
    }

}