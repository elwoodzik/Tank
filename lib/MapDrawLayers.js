import _ObjectSettings from './_ObjectSettings';

class MapDrawLayers extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);
        this.game = game;
        this.mapImages = options.mapImages;
        this.zIndex = options.zIndex;
        this.type = 'layers';
        this.static = true;
       
    }

    draw(dt) {

        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }
        
        this.context.drawImage(
            this.mapImages,
            this.game.camera.xScroll || 0,
            this.game.camera.yScroll || 0,
            this.game.width,
            this.game.height,
            0,
            0,
            this.game.width,
            this.game.height,
        )

        if (this.objAlfa !== 1) {
            this.context.restore();
        }
    }
};

export default MapDrawLayers;