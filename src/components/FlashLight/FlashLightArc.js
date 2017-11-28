import Image from '../../../lib/Image';

class FlashLightArc extends Image {

    constructor(game, options) {
        super(game, options);
        console.log(options.translateY);
        console.log(options.translateX);
        this.translateY = options.translateY || 0;
        this.translateX = options.translateX || 0;
    }
    update(dt) {
        
        const a = this.game.VAR.map.getPoint(this.game.VAR.tank.barrel.getCenter().x - this.game.VAR.tank.barrel.marginX - 2, this.game.VAR.tank.barrel.getCenter().y - this.game.VAR.tank.barrel.marginY, this.game.VAR.tank.barrel.getCenter().x + this.game.VAR.tank.barrel.halfWidth - 20 - this.translateX, this.game.VAR.tank.barrel.getCenter().y - this.translateY, this.game.VAR.tank.barrel.body.angle);
        this.x = this.game.VAR.tank.getCenter().x - this.translateX;
        this.y = this.game.VAR.tank.getCenter().y - this.translateY;
        superUpdate.call(this, dt);
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'destination-over';
        superDraw.call(this, dt);
        this.context.globalCompositeOperation = 'source-atop';
    }
};

const superDraw = Image.prototype.draw;
const superUpdate = Image.prototype.update;

export default FlashLightArc;