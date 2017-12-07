import AbstractTank from '../../Abstract/Player/Tank';
import Barrel from './Barrel';

class Tank extends AbstractTank {

    constructor(game) {
        super(game, {
            key: 'tank32',
            x: 64 * 2,
            y: 64 * 2
        });

        this.newSettings();

        this.barrel = new Barrel(this.game, {
            key: 'barrel32',
            x: this.x,
            y: this.y,
            marginX: 8,
            marginY: 1
        })
    }

    newSettings() {
        // this.speed = 0;
        // this.maxSpeed = 120;
        // this.maxBackSpeed = -50;
        // this.acc = 0.5;
        // this.frictale = 2;
        // this.life = 5500;
        // this.lifeMax = 5500;
    }
};

export default Tank;