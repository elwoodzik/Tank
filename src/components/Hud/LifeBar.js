import Bar from '../../../lib/Bar';

class LifeBar extends Bar {

    constructor(game, options) {
        super(game, {
            min: game.VAR.tank.life,
            max: game.VAR.tank.lifeMax,
            width: 150,
            height: 25,
            x: 200,
            y: 680,
            static: true,
            fill: 'green',
            stroke: 'white'
        });

        this.setIndex(100);
    }

    draw(dt) {
        superDraw.call(this, dt);
        this.setStatusX(this.game.VAR.tank.life);
    }
};

const superDraw = Bar.prototype.draw;
export default LifeBar;