class Rock extends Projectile{

    constructor(origin, dir) {
        super(origin.pos.x, origin.pos.y, 0.3, 0.3, images.projectiles[4], origin, dir, 0.15, 15);

        this.bouncesOffLevel = false;
        this.destroyOnLevel = true;

        this.damage = 1;
    }

}