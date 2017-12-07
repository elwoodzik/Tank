import Leya from '../lib/Leya';
import Menu from './Pages/Menu';
import Multi from './Pages/Multi';

let options;
let socket;

class Game {

    constructor(_options, _socket) {
        options = _options;
        socket = _socket || false;

        const gameWidth = 1280;
        const gameHeight = 720;
        const orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
        const scallable = true;
        const mobile = false;

        new Leya(gameWidth, gameHeight, orientation, scallable, mobile, this.preload, this.create);
    }

    preload() {
        return {
            'tank': '/images/tank.png',
            'barrel': '/images/barrel.png',
            'fireShot': '/images/fireShot.png',
            'bullet': '/images/bullet.png',
            'rpg': '/images/rp.png',
           'tank32': '/images/tank_32.png',
            'tank_enemy32': '/images/tank_enemy_32.png',
            'barrel32': '/images/barrel_32.png',
            'barrel_enemy32': '/images/barrel_enemy_32.png',
            'fireShot32': '/images/fireShot_32.png',
            'explo': '/images/explo.png',
            'fire': '/images/fire.png',
            'tank_destroy': '/images/tank_destroy.png',
        }
    }

    create(game) {
        const multi = game.add.multiplayer('10.10.97.50:9003');

        game.mouse.initialize();
        game.keyboard.initialize();

        game.state.add('Menu', Menu);
        game.state.add('Multi', Multi);

        if (socket) {
            multi.initializeGameConnetion(socket);
            game.state.start('Menu', { data: options });
        } else {
            game.state.start('Menu', { data: options });
        }



    }
};

export default Game;