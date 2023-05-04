class OrcsLog extends Projectile{

    constructor(origin, dir) {
        super(origin.pos.x, origin.pos.y, 0.35, 0.35, images.projectiles[3], origin, dir, 0.02, 30);

        this.bouncesOffLevel = true;
        this.destroyOnLevel = false;

        this.damage = 2;
    }

}