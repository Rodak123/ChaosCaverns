class AliveActor extends Actor{
    idleAnimation;
    walkingAnimation;

    animations;

    States = {
        idle: 0,
        walking: 1
    };
    state = this.States.idle;

    maxHealth = 1;
    health = this.maxHealth;

    constructor(x, y, w, h, idleSprites, walkSprites) {
        super(x,  y, w, h);

        this.idleAnimation = new SpriteAnimation(idleSprites, 4, 0.2);
        this.walkingAnimation = new SpriteAnimation(walkSprites, 4, 0.2);

        this.animations = [];

        this.animations.push(this.idleAnimation);
        this.animations.push(this.walkingAnimation);

        this.sprite = this.idleAnimation.getSprite();
    }

    update() {
        super.update();

        this.doAction();

        this.animate();
    }

    beIdle(){
        if(this.vel.mag() > 2){
            this.state = this.States.walking;
            return;
        }
        this.setSprite(this.idleAnimation.getSprite());
    }

    beWalking(){
        if(this.vel.mag() < 1){
            this.state = this.States.idle;
            return;
        }
        this.setSprite(this.walkingAnimation.getSprite());
    }

    doAction(){
        const key = Object.keys(this.States)[this.state];
        const action = "be"+(key.charAt(0).toUpperCase())+key.slice(1);
        if(this[action])
            this[action]();
        else
            console.log(action + " can't be done.");
    }

    animate(){
        const col = this.getDirectionCol();

        for (const animation of this.animations) {
            animation.setCol(col);
            animation.update();
        }
    }

    died(){
        this.destroy();
    }

    takeDamage(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.died();
        }
    }

    heal(heal){
        this.health += heal;
        if(this.health > this.maxHealth){
            const overHeal = this.maxHealth - this.health;
            this.health = this.maxHealth;
            this.overHealed(overHeal);
        }
    }

    overHealed(overHeal){
        //print("OverHealed: " + overHeal);
    }

}