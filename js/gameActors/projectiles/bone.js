class Bone extends Projectile{

    rotDir;
    rotSpeed
    rotOrigin;

    angle;

    radius;

    constructor(origin, dir, rotDir) {
        super(origin.pos.x, origin.pos.y, 0.3, 0.3, images.projectiles[1], origin, dir, 0.15, 15);

        this.angle = dir.heading();
        this.radius = 0;
        this.rotSpeed = 1;

        this.expandSpeed = this.vel.mag();

        this.rotDir = rotDir;
        this.rotOrigin = this.pos.copy();

        this.bouncesOffLevel = false;
        this.destroyOnLevel = true;

        this.damage = 1;
    }

    update() {
        super.update();

        this.angle += this.rotDir * this.rotSpeed * Time.deltaTime;
        this.radius += this.expandSpeed;

        this.pos.set(
            this.rotOrigin.x + cos(this.angle) * this.radius,
            this.rotOrigin.y + sin(this.angle) * this.radius
        );
    }

}