
function splitTileset(tileset, w, h) {
    const tiles = [];
    for (let j = 0; j < tileset.height; j+=h) {
        for (let i = 0; i < tileset.width; i+=w) {
            tiles.push(tileset.get(i, j, w, h));
        }
    }
    tiles.width = tileset.width / w;
    tiles.height = tileset.height / h;
    return tiles;
}