import AbstractTank from '../../Abstract/Tank';
import Barrel from './Barrel';

class Tank extends AbstractTank {

    constructor(game) {
        super(game, {
            key: 'tank32',
            x: 64 * 6,
            y: 64 * 6
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
    }
};

export default Tank;