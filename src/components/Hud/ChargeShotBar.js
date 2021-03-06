import Bar from '../../../lib/Bar';

class ChargeShotBar extends Bar {

    constructor(game, options) {
        super(game, {
            min: game.VAR.tank.barrel.currentTimeToShot,
            max: game.VAR.tank.barrel.shotTime,
            width: 150,
            height: 25,
            x: game.width - 200,
            y: 680,
            static: true,
            fill: 'red',
            stroke: 'white'
        });

        this.setIndex(100);
    }

    draw(dt) {
        this.context.globalCompositeOperation = 'source-atop';
        superDraw.call(this, dt);
        this.setStatusX(this.game.VAR.tank.barrel.currentTimeToShot);
    }
};

const superDraw = Bar.prototype.draw;
export default ChargeShotBar;