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

        this.body.rotateByMouse(0, true, 0.02);

        this.game.mouse.trigger(null, false, this.shot, true);

        this.reChargeShot();
    }

    shot = () => {
        if (this.currentTimeToShot >= this.shotTime) {
            this.discharge.use(this);

            const bullet = this.game.ARR.bulletGroup.spawn();

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

        this.game.ARR.bulletGroup = this.game.add.group();

        for (let i = 0; i < count; i++) {
            const bullet = new ClassName(this.game);

            this.game.ARR.bulletGroup.add(bullet, true);
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
