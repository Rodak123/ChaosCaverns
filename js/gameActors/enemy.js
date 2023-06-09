class Enemy extends AliveActor{
    moveSpeed;

    target;

    range;

    attackAnimation;

    projectiles;

    constructor(projectiles, x, y, sprite, range, moveSpeed, attackSpeed) {
        super(x,  y, 0.85, 0.85,
            images.actors[sprite].idle,
            images.actors[sprite].walk
        );
        this.tag = "enemy";

        this.attackAnimation = new SpriteAnimation(images.actors[sprite].punch, 4, attackSpeed);
        //createSpriteAnimation(images.actors[sprite].punch, 4, this.walkingAnimation);
        this.attackAnimation.enemy = this;
        this.attackAnimation.actions[3] = () => {
            this.attack();
        };

        this.animations.push(this.attackAnimation);

        this.moveSpeed = Cell.size * moveSpeed;
        this.maxSpeed = this.moveSpeed;

        this.target = undefined;

        this.range = Cell.size * range;

        this.updateDir = false;

        this.projectiles = projectiles;

        this.States.attacking = "attacking";
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
            this.state = this.States.attacking;
            this.attackAnimation.reset();
            return;
        }

        dir.setMag(this.moveSpeed);

        const steer = p5.Vector.sub(dir, this.vel);
        this.applyForce(steer);

        this.faceVelocity();

        super.beWalking();
    }

    beAttacking(){
        const dir = p5.Vector.sub(this.target.pos, this.pos);
        if (dir.mag() >= this.range) {
            this.state = this.States.walking;
            return;
        }

        this.setDir(dir.normalize());

        this.setSprite(this.attackAnimation.getSprite());

        if(frameCount % 20 === 0){
            //this.attack();
        }
    }

    attack(){
        if(this.state !== this.States.attacking) return;
        const projectiles = this.getProjectiles();
        for (const projectile of projectiles) {
            this.projectiles.push(projectile);
        }
    }

    getProjectiles(){
        return [new ZombieArm(this, this.dir)];
    }

    update() {
        if(!(this.target instanceof Actor)){
            this.state = this.States.idle;
        }

        super.update();
    }

}