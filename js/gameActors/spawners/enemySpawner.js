class EnemySpawner extends Spawner{
    projectiles;
    player;

    constructor(x, y, enemies, projectiles, player) {
        super(x, y, images.spawnRing, enemies, 0.45);
        this.projectiles = projectiles;
        this.player = player;
    }

    onSpawn() {
        const enemy = this.getEnemy();
        enemy.setTarget(this.player);
        this.actors.push(enemy);

        super.onSpawn();
    }

    getEnemy(){
        return new EvilBunny(this.projectiles, this.pos.x, this.pos.y);
    }

    show() {
        super.show();
        if(this.animation.row === this.animation.rows-2){
            imageMode(CENTER);
            image(this.getEnemy().sprite, this.pos.x, this.pos.y, Cell.size, Cell.size);
        }
    }

}