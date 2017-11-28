import Image from '../../../lib/Image';

class FlashLight extends Image {

    constructor(game, options) {
        super(game, options);
        this.translateY = options.translateY || 0;
        this.static = true;
    }

    update(dt) {
        const a = this.game.VAR.map.getPoint(this.game.VAR.tank.barrel.getCenter().x - this.game.VAR.tank.barrel.marginX - 2, this.game.VAR.tank.barrel.getCenter().y - this.game.VAR.tank.barrel.marginY, this.game.VAR.tank.barrel.getCenter().x + this.game.VAR.tank.barrel.halfWidth - 20, this.game.VAR.tank.barrel.getCenter().y - this.translateY, this.game.VAR.tank.barrel.body.angle);
        this.x = a.x;
        this.y = a.y;
        this.body.angle = this.game.VAR.tank.barrel.body.angle;
        superUpdate.call(this, dt);
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'destination-over';
        this.context.globalAlpha = 0.6;
        superDraw.call(this, dt);
        this.context.globalAlpha = 1;
        this.context.globalCompositeOperation = 'source-atop';
    }
};

const superDraw = Image.prototype.draw;
const superUpdate = Image.prototype.update;

export default FlashLight;