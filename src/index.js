import Leya from '../lib/Leya';
import Menu from './Pages/Menu';

let options;
let socket; 

class Game {

    constructor(_options, _socket) {
        options = _options;
        socket = _socket;

        const gameWidth = 1280;
        const gameHeight = 720;
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
            'tank32': '/images/tank_32.png',
            'tank_enemy32': '/images/tank_enemy_32.png',
            'barrel32': '/images/barrel_32.png',
            'barrel_enemy32': '/images/barrel_enemy_32.png',
            'fireShot32': '/images/fireShot_32.png',
            'explo': '/images/explo.png',
            'barrel128': '/images/barrel128.png',
            'tank128': '/images/tank128.png',
            'mapa2': '/images/rp2.png',
            'mapaluk': '/images/rp4.png',
            'fire': '/images/fire.png',
            'tank_destroy': '/images/tank_destroy.png',
        }
    }

    create(game) {
        const multi = game.add.multiplayer('10.10.97.50:9003');

        if(sokcet){
            multi.initializeGameConnetion(socket);
        }

        game.mouse.initialize();
        game.keyboard.initialize();

        game.state.add('Menu', Menu);
        game.state.start('Menu', { data: options });
    }
};

export default Game;