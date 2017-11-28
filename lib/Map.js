import AssetManager from './AssetManager';
import MapDrawLayers from './MapDrawLayers';

class Map {

    constructor(game, options) {
        if (!options || !options.json || !options.key) {
            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
        }
        this.game = game;
        this.jsonPath = options.json;
        this.image = AssetManager.get(options.key);
        this.used = true;
        this.type = 'map';
        this.zIndex = 1;
    }

    getJson(jsonPath) {
        return fetch(jsonPath)
            .then((map) => {
                return map.json();
            })
            .then((map) => {
                return map;
            })
    }

    generateTwoDimensionalLayers(mapData) {
        const twoDimensionalLayers = [];


        mapData.layers.forEach((layer) => {
            const twoDimensional = [];
            const mapDataLayers = layer.data;
            let k = -1;

            for (let i = 0; i < mapDataLayers.length; i++) {
                if (i % mapData.width === 0) {
                    k++;
                    twoDimensional[k] = [];
                }
                twoDimensional[k].push(mapDataLayers[i]);
            }
            twoDimensionalLayers.push({ layer: twoDimensional })
        })

        return twoDimensionalLayers;
    }

    generateTilesAndEmptyArrays(layers) {
        const tilesLayers = [];

        const mapData = this.getMapData();
        const mapDataTiles = mapData.tilesets[0].tiles || [];

        layers.forEach(layer => {
            const tilesArray = [];
            const emptySpaces = [];

            for (let i = 0; i < layer.layer.length; i++) {
                tilesArray[i] = [];
                for (let j = 0; j < layer.layer[i].length; j++) {

                    const tile = {};
                    tile.row = j;
                    tile.column = i;
                    tile.x = j * mapData.tileheight;
                    tile.y = i * mapData.tilewidth;
                    tile.tileX = ((layer.layer[i][j] - 1) % mapData.tilesets[0].columns) * mapData.tilewidth;
                    tile.tileY = (Math.floor((layer.layer[i][j] - 1) / mapData.tilesets[0].columns)) * mapData.tileheight;
                    tile.type = !mapDataTiles[layer.layer[i][j] - 1] ? 'empty' : mapDataTiles[layer.layer[i][j] - 1].type;
                    tile.id = layer.layer[i][j] - 1;
                    tile.width = mapData.tilewidth;
                    tile.height = mapData.tileheight;

                    if (tile.type === 'empty') {
                        emptySpaces.push(tile)
                    }
                    tilesArray[i].push(tile);
                }
            }
            tilesLayers.push({ tilesLayer: tilesArray, emptySpacesLayer: emptySpaces })
        });

        return tilesLayers;
    }

    generateMapAsImage(mapTilesLayers) {
        this.mapImages = [];
        const mapData = this.getMapData();
        let zIndex = 0;

        mapTilesLayers.forEach((map, index) => {
            zIndex = 2;
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = mapData.tilewidth * mapData.width;
            ctx.canvas.height = mapData.tileheight * mapData.height;

            for (let i = 0; i < map.tilesLayer.length; i++) {
                // 
                for (let j = 0; j < map.tilesLayer[i].length; j++) {
                    // 
                    ctx.drawImage(
                        this.image,
                        map.tilesLayer[i][j].tileX,
                        map.tilesLayer[i][j].tileY,
                        mapData.tilewidth,
                        mapData.tileheight,
                        j * map.tilesLayer[i][j].height,
                        i * map.tilesLayer[i][j].width,
                        mapData.tilewidth,
                        mapData.tileheight
                    );
                }
            }

            if (mapData.layers[index].properties) {
                zIndex = mapData.layers[index].properties['zIndex'] || 2;
            }
            
            this.mapImages.push({ map: ctx.canvas, zIndex: zIndex })
            ctx = null;

        })

        this.mapImages.forEach((image, index, tab) => {
            console.log(image.map)
            new MapDrawLayers(this.game, {
                mapImages: image.map,
                zIndex: image.zIndex,
                index: index,
                tabLength: tab.length
            })
        })
    }

    getPoint(centerX, centerY, width, height, angle) {
        /// get distance from center to point

        const diffX = width - centerX;
        const diffY = height - centerY;
        const dist = Math.sqrt(diffX * diffX + diffY * diffY);
        // const ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
        // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

        /// find angle from pivot to corner
        const ca = Math.atan2(diffY, diffX);

        /// get new angle based on old + current delta angle
        const na = ((ca + angle));

        /// get new x and y and round it off to integer
        const x = (centerX + dist * Math.cos(na) + 0.5) | 0;
        const y = (centerY + dist * Math.sin(na) + 0.5) | 0;

        return { x: x, y: y };
    }

    // draw(dt) {
    //     if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
    //         this.context.save();
    //         this.context.globalAlpha = this.objAlfa;
    //     }

    //     this.mapImages.forEach((image) => {
    //         this.context.drawImage(
    //             image.map,
    //             this.game.camera.xScroll || 0,
    //             this.game.camera.yScroll || 0,
    //             this.game.width,
    //             this.game.height,
    //             0,
    //             0,
    //             this.game.width,
    //             this.game.height,
    //         )
    //     })


    //     if (this.objAlfa !== 1) {
    //         this.context.restore();
    //     }
    // }

    getPosition(sprite) {
        const mapData = this.getMapData();
        const row = Math.floor(sprite.x / mapData.tilewidth);
        const column = Math.floor(sprite.y / mapData.tileheight);
        return this.getTile(row, column);
    }

    getNextPosition(skeleton) {
        const mapData = this.getMapData();
        //
        const sk = Object.keys(skeleton).map((key) => {
            const rowMiddle = Math.floor(skeleton[key].x / mapData.tilewidth);
            const columnMiddle = Math.floor(skeleton[key].y / mapData.tileheight);
            return this.getTile(rowMiddle, columnMiddle);
        })
        for (let j = 0; j < sk.length; j++) {
            for (let i = 0; i < sk[j].length; i++) {
                if (!sk[j][i]) {
                    return false;
                }
                else if (sk[j][i].type === 'solid') {
                    return false;
                }
            }
        }
        return true;
    }

    getTile(row, column) {
        const tiles = this.mapTilesLayers.map((map) => {
            if (map.tilesLayer[column] && map.tilesLayer[column][row]) {
                return map.tilesLayer[column][row];
            } else {
                return false;
            }
        })

        return tiles;
    }

    replaceGrid() {

    }

    getImageMap() {
        return this.imageMap;
    }

    getMapData() {
        return this.mapData;
    }

    setMapData(map) {
        this.mapData = map;
    }

    // for (let j = 0; j < this.mapData.layers[0].data[i].length; j++) {
    //     console.log(arr[i][j])
    //     // let tile = {};
    //     // tile.x = ((arr[i][j] - 1) % 13) * 72;
    //     // tile.y = (Math.floor((arr[i][j] - 1) / 13)) * 72;

    //     // if (this.tiles[arr[i][j] - 1]) {
    //     //     tile.type = !this.tiles[arr[i][j] - 1].type ? 'empty' : this.tiles[arr[i][j] - 1].type;
    //     // } else {
    //     //     tile.type = 'empty';
    //     // }
    //     // this.tilesMap[i].push(tile);
    // }

    // generate() {
    //     let ctx = document.createElement("canvas").getContext("2d");
    //     console.log(this.mapData)
    //     ctx.canvas.width = this.mapData.width * this.mapData.tilewidth;
    //     ctx.canvas.height = this.mapData.height * this.mapData.tileheight;

    //     for (let i = 0; i < this.tilesMap.length; i++) {
    //         // 
    //         for (let j = 0; j < this.tilesMap[i].length; j++) {
    //             // 
    //             ctx.drawImage(
    //                 this.image,
    //                 this.tilesMap[i][j].x,
    //                 this.tilesMap[i][j].y,
    //                 this.w,
    //                 this.h,
    //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
    //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
    //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
    //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
    //             );
    //         }
    //     }

    //     // this.cloneText = ctx.canvas;
    //     // ctx = null;
    // }

    // generate() {
    //     let ctx = document.createElement("canvas").getContext("2d");
    //     ctx.canvas.width = this.tilesMap[0].length * 70;
    //     ctx.canvas.height = this.tilesMap.length * 70;

    //     for (let i = 0; i < this.tilesMap.length; i++) {
    //         // 
    //         for (let j = 0; j < this.tilesMap[i].length; j++) {
    //             // 
    //             ctx.drawImage(
    //                 this.image,
    //                 this.tilesMap[i][j].x,
    //                 this.tilesMap[i][j].y,
    //                 this.w,
    //                 this.h,
    //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
    //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
    //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
    //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
    //             );
    //         }
    //     }

    //     this.imageMap = new Image();
    //     this.imageMap.src = ctx.canvas.toDataURL("image/png");

    //     ctx = null;
    // }
}


export default Map;