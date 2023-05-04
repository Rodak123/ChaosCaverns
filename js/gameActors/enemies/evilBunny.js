class Bunny extends Enemy{

    miss = true;

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 7, 8, 0.06, 0.3);

    }

    getProjectiles(){
        const projectiles = [];
        const attackDir = this.dir.copy();
        if(this.miss){
            attackDir.rotate(radians(30));
        }
        this.miss = !this.miss;
        const rocks = 6;
        const rotOff = TWO_PI / rocks;

        for (let i = 0; i < rocks; i++) {
            projectiles.push(new Rock(this, attackDir));
            attackDir.rotate(rotOff);
        }
        return projectiles;
    }

}