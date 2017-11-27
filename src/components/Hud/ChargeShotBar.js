import Bar from '../../../lib/Bar';

class ChargeShotBar extends Bar {

    constructor(game, options) {
        super(game, options);
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'source-over';
        superDraw.call(this, dt);
        this.setStatusX(this.game.VAR.tank.barrel.currentTimeToShot);
    }
};

const superDraw = Bar.prototype.draw;
export default ChargeShotBar;