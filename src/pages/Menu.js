import Tank1 from '../components/Tanks/Tank1/Tank';
import Tank2 from '../components/Tanks/Tank2/Tank';
import TankEnemy from '../components/Tanks/EnemyTanks/EnemyTank';
import Hud from '../components/Hud/Hud';
import Fog from '../components/Fog';
import FlashLight from '../components/FlashLight/FlashLight';
import FlashLightArc from '../components/FlashLight/FlashLightArc';
import Fire from '../components/Fire';

class Menu {

    constructor(game) {
        this.game = game;
    }

    create(options) {
        this.game.add.map({
            json: '../../jsons/mapaluk2.json',
            key: 'mapaluk'
        }).then((map) => {
            this.game.VAR.map = map;
            this.game.VAR.tank = new Tank1(this.game);

            this.generateFlashLight();
            this.generateFlashLightArc();
            this.preAllocateFire(50, Fire);

            this.createEnemies(options.bots, TankEnemy);
            //       
            this.game.setPortView(2560, 2560);
            //
            this.game.add.camera({
                followed: this.game.VAR.tank
            });
            //
            new Fog(this.game);

            this.game.VAR.hud = new Hud(this.game);

            this.game.sortByIndex();
        })
    }

    update(dt) {

    }

    createEnemies(count, ClassName) {
        this.game.ARR.enemyGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const explosion = new ClassName(this.game);
            this.game.ARR.enemyGroup.add(explosion);
        }
    }

    generateFlashLightArc() {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.game.width;
        ctx.canvas.height = this.game.height;

        const translateY = 250;
        const translateX = 250;
        let radius = 70;
        let alfa = 0.5;

        for (let i = 0; i < 50; i++) {
            ctx.globalAlpha = alfa;
            ctx.beginPath();
            ctx.arc(translateX, translateY, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
            radius += 2.5;
            alfa -= 0.01;
        }

        new FlashLightArc(this.game, {
            key: ctx.canvas,
            x: 0,
            y: 0,
            translateY: translateY,
            translateX: translateX,
        }).setIndex(1);
    }

    generateFlashLight() {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.game.width;
        ctx.canvas.height = this.game.height;
        let y = 300;
        let x = 525
        let yDec = 300;
        let alpha = 0.5;

        for (let i = 0; i < 60; i++) {
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(0, 300);
            ctx.lineTo(x, yDec);
            ctx.lineTo(x, y);

            ctx.fill();
            ctx.closePath();
            y += 5;
            yDec -= 5;
            x += 2.5;

            alpha -= 0.01;
        }

        new FlashLight(this.game, {
            key: ctx.canvas,
            x: 0,
            y: 0,
            translateY: 300
        }).setIndex(1);
    }

    preAllocateFire(count, ClassName) {
        if (!ClassName) {
            throw "Podaj drugi argument, Trzeba przekazac Classe jaka chce sie utworzyc";
        }

        this.game.ARR.fireGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const fire = new ClassName(this.game);

            this.game.ARR.fireGroup.add(fire, true);
        }
    }
};

export default Menu;