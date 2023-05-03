class Collision {

    static actorActor(actor1, actor2){
        return Collision.rectRect(actor1.pos, actor1.dim, actor2.pos, actor2.dim);
    }

    static rectRect(pos1, dim1, pos2, dim2){
        pos1 = p5.Vector.sub(pos1, dim1.copy().mult(0.5));
        pos2 = p5.Vector.sub(pos2, dim2.copy().mult(0.5));
        return pos1.x + dim1.x >= pos2.x &&                 // r1 right edge past r2 left
            pos1.x             <= pos2.x + dim2.x &&        // r1 left edge past r2 right
            pos1.y + dim1.y    >= pos2.y &&                 // r1 top edge past r2 bottom
            pos1.y             <= pos2.y + dim2.y;          // r1 bottom edge past r2 top
    }
}