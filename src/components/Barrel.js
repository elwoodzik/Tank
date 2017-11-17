import Image from '../../lib/Image';
import Bullet from './Bullet';
import Discharge from './Discharge';

const superUpdate = Image.prototype.update;
//const superDraw = Image.prototype.draw;

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.create();
    }

    create() {
        this.speed = 2550;

        this.barrelLength = 70;

        this.body.setAnchor(0.5, 0.3);

        this.setIndex(10);

        this.createDischarge();

        this.preAllocateBullets(10);
    }

    update(dt) {
        superUpdate.call(this, dt);

        this.body.rotateByMouse(90, true, 0.02);
        this.game.mouse.trigger(null, false, this.shot, false);
    }

    shot = () => {
        this.game.VAR.discharge.use(this);

        const bullet = this.game.ARR.bulletGroup.spawn();

        if (bullet) {
            bullet.lifeTime = 17;
            const angle = this.body.angle + bullet.toAngle;
            bullet.body.angle = angle;
            bullet.x = this.x + this.halfWidth - 7 + Math.cos(angle) * this.barrelLength;
            bullet.y = this.y + this.halfHeight * this.body.anchorY + 14 + Math.sin(angle) * this.barrelLength;

            bullet.body.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
           
        }
    }

    createDischarge() {
        this.game.VAR.discharge = new Discharge(this.game, {
            key: 'fireShot'
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
};

export default Barrel;
