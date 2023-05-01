const tileset = {};

function loadMyTileset(images) {
    const ground = {};

    ground.flat = getTile(images, 2, 2);
    ground.void = getTile(images, 8, 8);

    ground.dirty = [];
    addGrid(ground.dirty, images, 5, 2, 5, 4);

    tileset.ground = ground;

    const walls = {};

    walls.left = getTile(images, 1, 2);

    walls.right = getTile(images, 3, 2);

    walls.top = getTile(images, 2, 1);

    walls.bottom = getTile(images, 2, 3);

    walls.left_top = getTile(images, 1, 1);
    walls.right_top = getTile(images, 3, 1);
    walls.left_down = getTile(images, 1, 3);
    walls.right_down = getTile(images, 3, 3);

    tileset.walls = walls;
}

function getTile(images, x, y) {
    return images[x + y * images.width];
}

function addTile(arr, images, x, y) {
    arr.push(getTile(images, x, y));
}

function addGrid(arr, images, x, y, w, h){
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            addTile(arr, images, x+i, y+j);
        }
    }
}