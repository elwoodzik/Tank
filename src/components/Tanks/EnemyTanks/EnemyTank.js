import AbstractTank from '../../Abstract/Enemy/Tank';
import Barrel from './EnemyBarrel';

class Tank extends AbstractTank {

    constructor(game, options) {
        super(game, {
            key: 'tank_enemy32',
            x: 32 * game.rand(6, 50),
            y: 32 * game.rand(6, 50)
        });

        this.newSettings();

        this.barrel = new Barrel(this.game, {
            key: 'barrel_enemy32',
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