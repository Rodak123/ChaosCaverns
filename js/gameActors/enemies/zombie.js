class Zombie extends Enemy{

    attackDir;

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 3);

        this.attackDir = createVector(1, 0);
    }

    getProjectiles(){
        const projectiles = [];
        projectiles.push(new ZombieArm(this, this.attackDir));
        this.attackDir.rotate(QUARTER_PI * 1.1);
        return projectiles;
    }

}