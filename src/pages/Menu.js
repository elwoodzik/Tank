import Tank1 from '../components/Tanks/Tank1/Tank';
import Tank2 from '../components/Tanks/Tank2/Tank';
import TankEnemy from '../components/Tanks/EnemyTanks/EnemyTank';
import Hud from '../components/Hud/Hud';
let showTank = 0;

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
          
            this.game.VAR.tank = new Tank1(this.game);
            //new Tank2(this.game);
            
            this.createEnemies(15, TankEnemy);
            //       
            this.game.setPortView(2560, 2560);
            //
            this.game.add.camera({
                followed: this.game.VAR.tank
            })
            //
            this.game.sortByIndex();

            this.game.VAR.hud = new Hud(this.game);
        })
    }

    createEnemies(count, ClassName) {
        this.game.ARR.enemyGroup = this.game.add.group();
        for (let i = 0; i < count; i++) {
            const explosion = new ClassName(this.game);

            this.game.ARR.enemyGroup.add(explosion);
        }
    }

    update(dt) {

    }
};

export default Menu;