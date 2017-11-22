import Tank1 from '../components/Tanks/Tank1/Tank';
import Tank2 from '../components/Tanks/Tank2/Tank';
import TankEnemy from '../components/Tanks/EnemyTanks/EnemyTank';
import Hud from '../components/Hud/Hud';

class Menu {

    constructor(game) {
        this.game = game;
    }

    create() {
        this.game.add.map({
            json: '../../jsons/mapa3.json',
            key: 'rpg'
        }).then((map) => {
            this.game.VAR.map = map;
            //
            // this.game.VAR.tank = new Tank1(this.game);
            this.game.VAR.tank = new Tank1(this.game);
            new Tank2(this.game);
            const enemy = new TankEnemy(this.game);
            //
            this.game.setPortView(2560, 2560);
            //
            this.game.add.camera({
                followed: enemy
            })
            //
            this.game.sortByIndex();

            this.game.VAR.hud = new Hud(this.game);
        })
    }

    update(dt) {

    }
};

export default Menu;