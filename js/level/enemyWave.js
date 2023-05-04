class EnemyWave {

    spawning;
    spawnTo;

    constructor(spawning, spawnTo) {
        this.spawning = spawning;
        this.spawnTo = spawnTo;
    }

    spawn(){
        for (let i = 0; i < this.spawning.length; i++) {
            this.spawnTo.push(this.spawning[i]);
        }
    }

}