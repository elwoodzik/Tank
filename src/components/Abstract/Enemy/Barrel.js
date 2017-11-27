import Image from '../../../../lib/Image';

const superUpdate = Image.prototype.update;
//const superDraw = Image.prototype.draw;

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;
        this.create();
    }

    create() {
        this.barrelLength = 35; // zasieg lufy
        this.currentTimeToShot = 150; // obecny czas do wystrzalu
        this.shotTime = 150; // czas potrzebny by wystrzelic
        this.shotTimeAcc = 1; // predkosc ladowania pocisku

        this.body.setAnchor(0.3, 0.5);

        this.setIndex(10);

        //this.createDischarge();

        // this.preAllocateBullets(500);
        // this.preAllocateExplosion(500);
    }

    update(dt) {
        superUpdate.call(this, dt);

        if(!this.isOutOfScreen){
            this.inRange();
            this.reChargeShot();
        }
    }

    inRange() {
        const dx = Math.abs((this.x - this.game.VAR.tank.getCenter().x) * (this.x - this.game.VAR.tank.getCenter().x)) //Math.pow((this.x - this.game.VAR.tank.getCenter().x), 2);
        const dy = Math.abs((this.y - this.game.VAR.tank.getCenter().y) * (this.y - this.game.VAR.tank.getCenter().y))

        if (dx + dy <= 352500) {
            this.rotateByMouse(true, 0.02);
        }
    }

    rotateByMouse(easing, easingSpeed = 0.06) {
        const dx = this.game.VAR.tank.getCenter().x - this.x - this.width * this.body.anchorX;
        const dy = this.game.VAR.tank.getCenter().y - this.y - this.height * this.body.anchorY;

        if (easing) {
            const toAngle = Math.atan2(dy, dx);
            const radDiff = toAngle - this.body.angle;

            if (Math.abs(radDiff) <= 0.1) {
                this.shot();
            }

            if (radDiff > (Math.PI)) {
                this.body.angle += 2 * Math.PI;
            } else if (radDiff < -Math.PI) {
                this.body.angle -= 2 * Math.PI;
            }

            const targetVel = radDiff * easingSpeed;
            this.rotSpeed = this.body.clip(targetVel, this.rotSpeed - 0.01, this.rotSpeed + 0.01);

            this.body.angle += this.rotSpeed;

        } else {
            const disX = Math.abs(dx);
            const disY = Math.abs(dx);

            if (disX > 3 || disY > 3) {
                this.body.angle = Math.atan2(dy, dx)
            }
        }
    }

    shot = () => {
        if (this.currentTimeToShot >= this.shotTime) {
            //this.discharge.use(this);

            const bullet = this.game.ARR.enemyBulletGroup.spawn();

            if (bullet) {
                bullet.move(this);
            }
            this.currentTimeToShot = 0;
        }
    }

    reChargeShot() {
        if (this.currentTimeToShot < this.shotTime) {
            this.currentTimeToShot += this.shotTimeAcc;
        }
    }

    preAllocateBullets(count, ClassName) {
        if (!ClassName) {
            throw "Podaj drugi argument, Trzeba przekazac Classe jaka chce sie utworzyc";
        }

        this.game.ARR.enemyBulletGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const bullet = new ClassName(this.game);

            this.game.ARR.enemyBulletGroup.add(bullet, true);
        }
    }

    preAllocateExplosion(count, ClassName) {
        this.game.ARR.explosionGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const explosion = new ClassName(this.game);

            this.game.ARR.explosionGroup.add(explosion, true);
        }
    }
};

export default Barrel;
