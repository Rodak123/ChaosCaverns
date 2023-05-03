class Player extends AliveActor{
    moveSpeed;
    dashSpeed;

    projectiles;

    inDash = false;

    maxDashes = 3;
    dashes = this.maxDashes;

    dashed = 0;
    dashLength;

    dashCooldown = 0.25;
    dashTime = 0;

    dashRecharge = 1.5;
    dashRechargeTime = 0;

    dashOrb;
    dashOrbAngle = 0;
    dashOrbAngleSpeed = HALF_PI;

    constructor(projectiles, x, y) {
        super(x,  y, 0.7, 0.7,
            images.actors[0].idle,
            images.actors[0].walk
        );
        this.dashOrb = images.gui.icons[4];

        this.tag = "player";

        this.moveSpeed = Cell.size * 0.1;
        this.dashSpeed = Cell.size * 1;

        this.maxSpeed = this.moveSpeed;

        this.dashLength = Cell.size * 2;

        this.projectiles = projectiles;

        this.maxHealth = 99;
        this.health = 20;
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

        if(keyIsDown(playerControls.dash)) {
            this.startDash();
        }
    }

    startDash(){
        if(this.dashes <= 0 || this.dashTime > 0) return;

        this.inDash = true;
        this.dashed = 0;

        this.dashes--;
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

        if(this.dashes < this.maxDashes){
            this.dashRechargeTime += Time.deltaTime;
            if(this.dashRechargeTime >= this.dashRecharge){
                this.dashRechargeTime = 0;
                this.dashes++;
            }
        }

        const prevPos = this.pos.copy();

        super.update();

        if(this.inDash){
            this.dashed += p5.Vector.sub(this.pos, prevPos).mag();
        }

        this.dashOrbAngle += this.dashOrbAngleSpeed * Time.deltaTime;
    }

    attack(actors){

    }

    died() {
        print("Im dead");
    }

    takeDamage(damage){
        if(this.inDash) return;
        super.takeDamage(damage);
    }

    show(){
        super.show();

        push();
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        for (let i = 0; i < this.dashes; i++) {
            const angleOff = map(i, 0, this.maxDashes, 0, TWO_PI);
            const angle = angleOff+this.dashOrbAngle;
            const dist = Cell.size*0.8;
            push()
            translate(
                cos(angle) * dist,
                sin(angle) * dist,
            )
            image(this.dashOrb, 0, 0, Cell.size, Cell.size);
            pop();
        }
        pop();
    }

}