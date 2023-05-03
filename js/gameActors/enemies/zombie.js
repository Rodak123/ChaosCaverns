class Zombie extends Enemy{

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 3);
    }

    getProjectiles(){
        const projectiles = [];
        const dir = this.dir.copy();
        projectiles.push(new ZombieArm(this, dir));
        for (let i = 0; i < 7; i++) {
            dir.rotate(QUARTER_PI);
            projectiles.push(new ZombieArm(this, dir));
        }
        return projectiles;
    }

}