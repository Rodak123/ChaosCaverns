class Projectile extends Actor{
    sprites;

    origin;

    lifespan;

    bouncesOffLevel;
    destroyOnLevel;

    constructor(x, y, w, h, sprites, origin, dir, speed, lifespan) {
        super(x, y, w, h);

        this.sprites = sprites;

        this.bouncesOffLevel = true;
        this.destroyOnLevel = false;

        this.origin = origin;

        this.maxSpeed = speed * Cell.size;

        this.vel = dir.setMag(this.maxSpeed).copy();

        this.velDamping = 1;

        this.lifespan = lifespan;
    }

    update() {
        this.lifespan -= Time.deltaTime;
        if(this.lifespan <= 0){
            this.destroy();
        }

        super.update();

        this.animate();
    }

    animate(){
        const col = this.getDirectionCol();

        this.setSprite(this.sprites[col]);
    }

    collidedLevel(edge) {
        if(this.destroyOnLevel){
            this.destroy();
        }
        super.collidedLevel(edge);
    }

}