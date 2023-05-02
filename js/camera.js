class Camera {
    pos;

    toFollow;
    followSpeed = 0.3;
    followSnapDist = 2;

    constructor() {
        this.pos = createVector();
    }

    setFollow(toFollow){
        this.toFollow = toFollow;
        const target = this.getTargetPos();
        this.pos.set(target.x, target.y);
    }

    getTargetPos(){
        if(this.toFollow === undefined) return this.pos;
        return createVector(width*0.5-this.toFollow.x, height*0.5-this.toFollow.y);
    }

    follow(){
        const target = this.getTargetPos();
        if(p5.Vector.dist(target, this.pos) <= this.followSnapDist){
            this.pos.set(target.x, target.y);
        }else{
            const pos = p5.Vector.lerp(this.pos, target, this.followSpeed);
            this.pos.set(pos.x, pos.y);
        }
    }

    update(){
        if(this.toFollow !== undefined){
            this.follow();
        }
    }

    translate(){
        translate(this.pos.x, this.pos.y);
    }

}