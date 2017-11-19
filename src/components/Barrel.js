import Image from '../../lib/Image';
import Bullet from './Bullet';
import Discharge from './Discharge';
import Explosion from './Explosion';

const superUpdate = Image.prototype.update;
//const superDraw = Image.prototype.draw;

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.barrelLength = 35;

        this.body.setAnchor(0.3, 0.5);

        this.setIndex(10);

        this.createDischarge();

        this.preAllocateBullets(500);
        this.preAllocateExplosion(500);
    }

    update(dt) {
        superUpdate.call(this, dt);

        this.body.rotateByMouse(0, true, 0.02);
        this.game.mouse.trigger(null, false, this.shot, false);
    }

    shot = () => {
        this.game.VAR.discharge.use(this);

        const bullet = this.game.ARR.bulletGroup.spawn();
       
        if (bullet) {
            bullet.move(this);
        }
    }

    createDischarge() {
        this.game.VAR.discharge = new Discharge(this.game, {
            key: 'fireShot32'
        });
    }

    preAllocateBullets(count) {
        this.game.ARR.bulletGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const bullet = new Bullet(this.game, {
                key: 'bullet',
            })

            this.game.ARR.bulletGroup.add(bullet, true);
        }
    }

    preAllocateExplosion(count) {
        this.game.ARR.explosionGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const explosion = new Explosion(this.game, {
                key: 'explo',
                x: 400,
                y: 400
            })

            this.game.ARR.explosionGroup.add(explosion, true);
        }
    }
};

export default Barrel;
