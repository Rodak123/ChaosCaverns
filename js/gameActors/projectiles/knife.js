class Knife extends Projectile{

    constructor(origin, dir) {
        super(origin.pos.x, origin.pos.y, 0.5, 0.5, images.projectiles[5], origin, dir, 0.8, 999);

        this.bouncesOffLevel = false;
        this.destroyOnLevel = true;
    }

}