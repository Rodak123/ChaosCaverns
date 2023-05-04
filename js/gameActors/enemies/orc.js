class Orc extends Enemy{

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 5, 8, 0.08, 1);

    }

    getProjectiles(){
        const projectiles = [];
        const attackDir = this.dir.copy();
        const deviate = radians(30);

        projectiles.push(new OrcsLog(this, attackDir.copy().rotate(deviate)));
        projectiles.push(new OrcsLog(this, attackDir.copy().rotate(deviate * -1)));

        return projectiles;
    }

}