class EnemySpawner extends Spawner{
    projectiles;
    player;

    constructor(x, y, enemies, projectiles, player) {
        super(x, y, images.spawnRing, enemies);
        this.projectiles = projectiles;
        this.player = player;
    }

    onSpawn() {
        const enemy = this.getEnemy();
        enemy.setTarget(this.player);
        this.actors.push(enemy);
    }

    getEnemy(){
        return new Zombie(this.projectiles, this.pos.x, this.pos.y);
    }

}