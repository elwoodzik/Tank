import Tank from '../components/Tank';

class Menu {

    constructor(game) {
        this.game = game;
    }

    create() {
        this.game.add.map({
            json: '../../jsons/mapa4.json',
            key: 'rpg64'
        }).then((map) => {
            this.game.VAR.map = map;
            //
            this.game.VAR.tank = new Tank(this.game, {
                key: 'tank',
                x: 64 * 2,
                y: 64 * 2
            });
            //
            this.game.setPortView(2560, 2560);
            //
            this.game.add.camera({
                worldWidth: this.game.width,
                worldHeight: this.game.height,
                followed: this.game.VAR.tank
            })
            //
            this.game.sortByIndex();
        })
    }

    update(dt) {

    }
};

export default Menu;