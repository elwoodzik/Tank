import Image from '../../../lib/Image';

class FlashLightArc extends Image {

    constructor(game, options) {
        super(game, options);
        this.translateY = options.translateY || 0;
        this.translateX = options.translateX || 0;
    }
    update(dt) {
        this.x = this.game.VAR.tank.getCenter().x - this.translateX;
        this.y = this.game.VAR.tank.getCenter().y - this.translateY;
        
        superUpdate.call(this, dt);
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'destination-over';
        this.context.globalAlpha = 0.8;
        superDraw.call(this, dt);
        this.context.globalAlpha = 1;
        this.context.globalCompositeOperation = 'source-atop';
    }
};

const superDraw = Image.prototype.draw;
const superUpdate = Image.prototype.update;

export default FlashLightArc;