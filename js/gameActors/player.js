class Player extends AliveActor{
    moveSpeed;
    dashSpeed;

    projectiles;

    inDash = false;

    dashed = 0;
    dashLength;

    dashCooldown = 1.5;
    dashTime = 0;

    constructor(projectiles, x, y) {
        super(x,  y, 0.7, 0.7,
            images.actors[0].idle,
            images.actors[0].walk
        );

        this.moveSpeed = Cell.size * 0.2;
        this.dashSpeed = Cell.size * 1;

        this.maxSpeed = this.moveSpeed;

        this.dashLength = Cell.size * 2;

        this.projectiles = projectiles;
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

        if(keyIsDown(playerControls.dash) && this.dashTime <= 0) {
            this.startDash();
        }
    }

    startDash(){
        this.inDash = true;
        this.dashed = 0;
    }

    dash(){
        const dash = this.dir.copy();
        dash.setMag(this.dashSpeed);
        this.applyForce(dash);

        this.endDash();
    }

    endDash(){
        if(this.dashed < this.dashLength) return;

        this.inDash = false;
        this.dashTime = this.dashCooldown;
    }

    update() {
        this.maxSpeed = this.inDash?this.dashSpeed:this.moveSpeed*1.5;

        if(this.inDash){
            this.dash();
        }else {
            this.dashTime -= Time.deltaTime;
            this.move();
        }

        const prevPos = this.pos.copy();

        super.update();

        if(this.inDash){
            this.dashed += p5.Vector.sub(this.pos, prevPos).mag();
        }
    }

}