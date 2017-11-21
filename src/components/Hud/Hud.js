import ChargeShotBar from './ChargeShotBar';

class Hud {

    constructor(game) {
        this.game = game;
        this.create();
    }

    create() {
        new ChargeShotBar(this.game, {
            min: this.game.VAR.tank.barrel.currentTimeToShot,
            max: this.game.VAR.tank.barrel.shotTime,
            width: 150,
            height: 25,
            x: this.game.width - 200,
            y: 680,
            static: true,
            fill: 'red'
        });
    }
};

export default Hud;