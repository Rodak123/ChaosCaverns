class Goblin extends Enemy{

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 2, 12, 0.3, 0.3);
    }

    getProjectiles(){
        const projectiles = [];
        projectiles.push(new GoblinCoin(this, this.dir));
        return projectiles;
    }

}