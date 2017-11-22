import AbstractTank from '../../Abstract/Player/Tank';
import Barrel from './Barrel';

class Tank extends AbstractTank {

    constructor(game) {
        super(game, {
            key: 'tank128',
            x: 64 * 6,
            y: 64 * 7
        });

        this.newSettings();

        this.barrel = new Barrel(this.game, {
            key: 'barrel128',
            x: this.x,
            y: this.y,
            marginX: 8,
            marginY: -4
        })
    }

    newSettings() {
        // this.body.setAnchor(0.5, 0.5);
        // this.speed = 0;
        // this.maxSpeed = 120;
        // this.maxBackSpeed = -50;
        // this.acc = 0.5;
        // this.frictale = 2;
    }
};

export default Tank;