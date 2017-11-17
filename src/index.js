import Leya from '../lib/Leya';
import Menu from './Pages/Menu';

class Game {

    constructor() {
        const gameWidth = 1920;
        const gameHeight = 1080;
        const orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
        const scallable = true;
        const mobile = false;

        new Leya(gameWidth, gameHeight, orientation, scallable, mobile, this.preload, this.create);
    }

    preload() {
        return {
            'water': '/images/water.png',
            'ship': '/images/ship.png',
            'coins': '/images/coins.png',
            'tank': '/images/tank.png',
            'barrel': '/images/barrel.png',
            'fireShot': '/images/fireShot.png',
            'bullet': '/images/bullet.png',
            'tileset': '/images/tileset.png',
            'test': '/images/test.png',
            'rpg': '/images/rp.png',
            'rpg64': '/images/rp64.png',
        }
    }

    create(game) {
        game.mouse.initialize();
        game.keyboard.initialize();

        game.state.add('Menu', Menu);
        game.state.start('Menu');
    }
};

export default new Game();