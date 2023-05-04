class Spawner extends Actor{

    actors;
    animation;

    constructor(x, y, sprites, actors, spawnFrameTime) {
        super(x, y, 1, 1, sprites[0]);

        this.animation = new SpriteAnimation(sprites, 1, spawnFrameTime);
        this.animation.actions[this.animation.rows-1] = () => {this.onSpawn();};

        this.actors = actors;

        this.layer = -10;
    }

    onSpawn(){
        // actors.push( ... );
        this.destroy();
    }

    update(){
        super.update();

        this.animation.update();
    }

    show() {
        this.setSprite(this.animation.getSprite());

        super.show();
    }

}