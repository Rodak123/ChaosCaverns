class Collision {

    static actorActor(actor1, actor2){
        return Collision.rectRect(actor1.pos, actor1.dim, actor2.pos, actor2.dim);
    }

    static rectRect(pos1, dim1, pos2, dim2){
        return pos1.x + dim1.x * 0.5 >= pos2.x - dim2.x * 0.5 &&
            pos1.x - dim1.x * 0.5 <= pos2.x + dim2.x  * 0.5 &&
            pos1.y + dim1.y * 0.5 >= pos2.y - dim2 * 0.5 &&
            pos1.y - dim1.y * 0.5 <= pos2.y + dim2.y  * 0.5;
    }
}