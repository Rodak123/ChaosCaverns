class EnemySpawner extends Spawner{
    projectiles;
    player;

    type;

    static Types = {
        Goblin: 'Goblin',
        Zombie: 'Zombie',
        Orc: 'Orc',
        Statue: 'Statue',
        EvilBunny: 'EvilBunny'
    };

    constructor(x, y, type, enemies, projectiles, player) {
        super(x, y, images.spawnRing, enemies, 0.45);
        this.projectiles = projectiles;
        this.player = player;

        this.type = type;
    }

    onSpawn() {
        const enemy = this.getEnemy();
        enemy.setTarget(this.player);
        this.actors.push(enemy);

        super.onSpawn();
    }

    getEnemy(){
        let enemy;
        switch (this.type) {
            case EnemySpawner.Types.Goblin:
                enemy = new EvilBunny(this.projectiles, this.pos.x, this.pos.y);
                break;
            default:
            case EnemySpawner.Types.Zombie:
                enemy = new Zombie(this.projectiles, this.pos.x, this.pos.y);
                break;
            case EnemySpawner.Types.Orc:
                enemy = new Orc(this.projectiles, this.pos.x, this.pos.y);
                break;
            case EnemySpawner.Types.Statue:
                enemy = new Statue(this.projectiles, this.pos.x, this.pos.y);
                break;
            case EnemySpawner.Types.EvilBunny:
                enemy = new EvilBunny(this.projectiles, this.pos.x, this.pos.y);
                break;
        }
        return enemy;
    }

    show() {
        super.show();
        if(this.animation.row === this.animation.rows-2){
            imageMode(CENTER);
            image(this.getEnemy().sprite, this.pos.x, this.pos.y, Cell.size, Cell.size);
        }
    }

}