class EvilBunny extends Enemy{

    clockwise = true;
    miss = false;

    constructor(projectiles, x, y) {
        super(projectiles, x, y, 8, 8, 0.06, 0.2);

    }

    getProjectiles(){
        const projectiles = [];
        const attackDir = this.dir.copy();
        if(this.miss){
            attackDir.rotate(radians(30));
        }
        this.miss = !this.miss;
        this.clockwise = !this.clockwise;
        const rocks = 6;
        const rotOff = TWO_PI / rocks;

        for (let i = 0; i < rocks; i++) {
            projectiles.push(new Bone(this, attackDir, this.clockwise?1:-1));
            attackDir.rotate(rotOff);
        }
        return projectiles;
    }

}