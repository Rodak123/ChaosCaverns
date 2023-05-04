class GoblinCoin extends Projectile{

    constructor(origin, dir) {
        super(origin.pos.x, origin.pos.y, 0.5, 0.5, images.projectiles[2], origin, dir, 0.4, 20);

        this.bouncesOffLevel = false;
        this.destroyOnLevel = true;
    }

}