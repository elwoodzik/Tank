import ChargeShotBar from './ChargeShotBar';
import LifeBar from './LifeBar';
class Hud {

    constructor(game) {
        this.game = game;
        this.create();
    }

    create() {
        new ChargeShotBar(this.game);
        new LifeBar(this.game);

        this.game.VAR.enemiesText = this.game.add.text({
            text: this.game.ARR.enemyGroup.entities.length,
            static: true,
            color: 'white',
            y: 50,
            x: 50
        }).setIndex(100);

    }
};

export default Hud;