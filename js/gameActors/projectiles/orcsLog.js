class ZombieArm extends Projectile{

    constructor(origin, dir) {
        super(origin.pos.x, origin.pos.y, 0.5, 0.5, images.projectiles[0], origin, dir, 0.2, 10);

        this.bouncesOffLevel = false;
        this.destroyOnLevel = false;

        this.velDamping = 0.975;
    }

}