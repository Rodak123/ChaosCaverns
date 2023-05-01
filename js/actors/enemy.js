class Enemy extends AliveActor{
    moveSpeed;

    target;

    range;

    shootingAnimation;

    constructor(x, y) {
        super(x,  y, 1, 1,
            images.actors[0].idle,
            images.actors[0].walk
        );

        this.shootingAnimation = createSpriteAnimation(images.actors[0].punch, 4, this.walkingAnimation);

        this.animations.push(this.shootingAnimation);

        this.moveSpeed = 0.1 * Cell.size;

        this.target = undefined;

        this.range = width*0.5;

        this.States.shooting = 2;

        this.updateDir = false;
    }

    setTarget(target){
        this.target = target;
    }

    beIdle(){
        if(this.target instanceof Actor){
            this.state = this.States.walking;
        }
        super.beIdle();
    }

    beWalking() {
        const dir = p5.Vector.sub(this.target.pos, this.pos);
        if (dir.mag() <= this.range) {
            this.state = this.States.shooting;
            return;
        }

        dir.setMag(this.moveSpeed);

        const steer = p5.Vector.sub(dir, this.vel);
        this.applyForce(steer);

        this.faceVelocity();

        super.beWalking();
    }

    beShooting(){
        const dir = p5.Vector.sub(this.target.pos, this.pos);
        if (dir.mag() >= this.range) {
            this.state = this.States.walking;
            return;
        }

        this.setDir(dir.normalize());

        this.setSprite(this.shootingAnimation.getSprite());
    }

    update() {
        if(!(this.target instanceof Actor)){
            this.state = this.States.idle;
        }

        super.update();
    }

}